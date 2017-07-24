// Copyright 2016 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"fmt"
	"strings"
	"time"

	"github.com/Unknwon/com"
	"github.com/go-xorm/xorm"
	log "gopkg.in/clog.v1"
	"gopkg.in/ini.v1"

	"github.com/gogits/git-module"

	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/process"
	"github.com/cabernety/boxlinker-git/modules/setting"
	"github.com/cabernety/boxlinker-git/modules/sync"
)

var MirrorQueue = sync.NewUniqueQueue(setting.Repository.MirrorQueueLength)

// Mirror represents mirror information of a repository.
type Mirror struct {
	ID          int64 `xorm:"pk autoincr"`
	RepoID      int64
	Repo        *Repository `xorm:"-"`
	Interval    int         // Hour.
	EnablePrune bool        `xorm:"NOT NULL DEFAULT true"`

	Updated        time.Time `xorm:"-"`
	UpdatedUnix    int64
	NextUpdate     time.Time `xorm:"-"`
	NextUpdateUnix int64

	address string `xorm:"-"`
}

func (m *Mirror) BeforeInsert() {
	m.UpdatedUnix = time.Now().Unix()
	m.NextUpdateUnix = m.NextUpdate.Unix()
}

func (m *Mirror) BeforeUpdate() {
	m.UpdatedUnix = time.Now().Unix()
	m.NextUpdateUnix = m.NextUpdate.Unix()
}

func (m *Mirror) AfterSet(colName string, _ xorm.Cell) {
	var err error
	switch colName {
	case "repo_id":
		m.Repo, err = GetRepositoryByID(m.RepoID)
		if err != nil {
			log.Error(3, "GetRepositoryByID [%d]: %v", m.ID, err)
		}
	case "updated_unix":
		m.Updated = time.Unix(m.UpdatedUnix, 0).Local()
	case "next_update_unix":
		m.NextUpdate = time.Unix(m.NextUpdateUnix, 0).Local()
	}
}

// ScheduleNextUpdate calculates and sets next update time.
func (m *Mirror) ScheduleNextUpdate() {
	m.NextUpdate = time.Now().Add(time.Duration(m.Interval) * time.Hour)
}

func (m *Mirror) readAddress() {
	if len(m.address) > 0 {
		return
	}

	cfg, err := ini.Load(m.Repo.GitConfigPath())
	if err != nil {
		log.Error(2, "Load: %v", err)
		return
	}
	m.address = cfg.Section("remote \"origin\"").Key("url").Value()
}

// HandleCloneUserCredentials replaces user credentials from HTTP/HTTPS URL
// with placeholder <credentials>.
// It will fail for any other forms of clone addresses.
func HandleCloneUserCredentials(url string, mosaics bool) string {
	i := strings.Index(url, "@")
	if i == -1 {
		return url
	}
	start := strings.Index(url, "://")
	if start == -1 {
		return url
	}
	if mosaics {
		return url[:start+3] + "<credentials>" + url[i:]
	}
	return url[:start+3] + url[i+1:]
}

// Address returns mirror address from Git repository config without credentials.
func (m *Mirror) Address() string {
	m.readAddress()
	return HandleCloneUserCredentials(m.address, false)
}

// MosaicsAddress returns mirror address from Git repository config with credentials under mosaics.
func (m *Mirror) MosaicsAddress() string {
	m.readAddress()
	return HandleCloneUserCredentials(m.address, true)
}

// FullAddress returns mirror address from Git repository config.
func (m *Mirror) FullAddress() string {
	m.readAddress()
	return m.address
}

// SaveAddress writes new address to Git repository config.
func (m *Mirror) SaveAddress(addr string) error {
	configPath := m.Repo.GitConfigPath()
	cfg, err := ini.Load(configPath)
	if err != nil {
		return fmt.Errorf("Load: %v", err)
	}

	cfg.Section("remote \"origin\"").Key("url").SetValue(addr)
	return cfg.SaveToIndent(configPath, "\t")
}

// runSync returns true if sync finished without error.
func (m *Mirror) runSync() bool {
	repoPath := m.Repo.RepoPath()
	wikiPath := m.Repo.WikiPath()
	timeout := time.Duration(setting.Git.Timeout.Mirror) * time.Second

	// Do a fast-fail testing against on repository URL to ensure it is accessible under
	// good condition to prevent long blocking on URL resolution without syncing anything.
	if !git.IsRepoURLAccessible(git.NetworkOptions{
		URL:     m.FullAddress(),
		Timeout: 10 * time.Second,
	}) {
		desc := fmt.Sprintf("Source URL of mirror repository '%s' is not accessible: %s", m.Repo.FullName(), m.MosaicsAddress())
		if err := CreateRepositoryNotice(desc); err != nil {
			log.Error(2, "CreateRepositoryNotice: %v", err)
		}
		return false
	}

	gitArgs := []string{"remote", "update"}
	if m.EnablePrune {
		gitArgs = append(gitArgs, "--prune")
	}
	if _, stderr, err := process.ExecDir(
		timeout, repoPath, fmt.Sprintf("Mirror.runSync: %s", repoPath),
		"git", gitArgs...); err != nil {
		desc := fmt.Sprintf("Fail to update mirror repository '%s': %s", repoPath, stderr)
		log.Error(2, desc)
		if err = CreateRepositoryNotice(desc); err != nil {
			log.Error(2, "CreateRepositoryNotice: %v", err)
		}
		return false
	}

	if err := m.Repo.UpdateSize(); err != nil {
		log.Error(2, "UpdateSize [repo_id: %d]: %v", m.Repo.ID, err)
	}

	if m.Repo.HasWiki() {
		if _, stderr, err := process.ExecDir(
			timeout, wikiPath, fmt.Sprintf("Mirror.runSync: %s", wikiPath),
			"git", "remote", "update", "--prune"); err != nil {
			desc := fmt.Sprintf("Fail to update mirror wiki repository '%s': %s", wikiPath, stderr)
			log.Error(2, desc)
			if err = CreateRepositoryNotice(desc); err != nil {
				log.Error(2, "CreateRepositoryNotice: %v", err)
			}
			return false
		}
	}

	return true
}

func getMirrorByRepoID(e Engine, repoID int64) (*Mirror, error) {
	m := &Mirror{RepoID: repoID}
	has, err := e.Get(m)
	if err != nil {
		return nil, err
	} else if !has {
		return nil, errors.MirrorNotExist{repoID}
	}
	return m, nil
}

// GetMirrorByRepoID returns mirror information of a repository.
func GetMirrorByRepoID(repoID int64) (*Mirror, error) {
	return getMirrorByRepoID(x, repoID)
}

func updateMirror(e Engine, m *Mirror) error {
	_, err := e.Id(m.ID).AllCols().Update(m)
	return err
}

func UpdateMirror(m *Mirror) error {
	return updateMirror(x, m)
}

func DeleteMirrorByRepoID(repoID int64) error {
	_, err := x.Delete(&Mirror{RepoID: repoID})
	return err
}

// MirrorUpdate checks and updates mirror repositories.
func MirrorUpdate() {
	if taskStatusTable.IsRunning(_MIRROR_UPDATE) {
		return
	}
	taskStatusTable.Start(_MIRROR_UPDATE)
	defer taskStatusTable.Stop(_MIRROR_UPDATE)

	log.Trace("Doing: MirrorUpdate")

	if err := x.Where("next_update_unix<=?", time.Now().Unix()).Iterate(new(Mirror), func(idx int, bean interface{}) error {
		m := bean.(*Mirror)
		if m.Repo == nil {
			log.Error(2, "Disconnected mirror repository found: %d", m.ID)
			return nil
		}

		MirrorQueue.Add(m.RepoID)
		return nil
	}); err != nil {
		log.Error(2, "MirrorUpdate: %v", err)
	}
}

// SyncMirrors checks and syncs mirrors.
// TODO: sync more mirrors at same time.
func SyncMirrors() {
	// Start listening on new sync requests.
	for repoID := range MirrorQueue.Queue() {
		log.Trace("SyncMirrors [repo_id: %v]", repoID)
		MirrorQueue.Remove(repoID)

		m, err := GetMirrorByRepoID(com.StrTo(repoID).MustInt64())
		if err != nil {
			log.Error(2, "GetMirrorByRepoID [%s]: %v", m.RepoID, err)
			continue
		}

		if !m.runSync() {
			continue
		}

		m.ScheduleNextUpdate()
		if err = UpdateMirror(m); err != nil {
			log.Error(2, "UpdateMirror [%s]: %v", m.RepoID, err)
			continue
		}

		// Update repository last updated time
		if _, err = x.Exec("UPDATE repository SET updated_unix = ? WHERE id = ?", time.Now().Unix(), m.RepoID); err != nil {
			log.Error(2, "Update repository 'updated_unix' [%s]: %v", m.RepoID, err)
		}
	}
}

func InitSyncMirrors() {
	go SyncMirrors()
}
