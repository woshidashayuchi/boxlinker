package building

import (
	"errors"
	"time"
	"fmt"
	"database/sql/driver"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"strings"
)

var ErrDuplicateBuild = errors.New("重复的构建")

const uniqueBuildConstraint = "unique_build"

type Build struct {
	ID string `db:"id"`
	// Autogenerated sequence id.
	Seq int64 `db:"seq"`
	Repository string `db:"repository"`
	Branch string `db:"branch"`
	Sha string `db:"sha"`
	State BuildState `db:"state"`
	CreatedAt *time.Time `db:"created_at"`
	StartedAt *time.Time `db:"started_at"`
	CompletedAt *time.Time `db:"completed_at"`
}

type BuildState int

const (
	StatePending BuildState = iota
	StateBuilding
	StateFailed
	StateSucceeded
)

func (s BuildState) String() string {
	switch s {
	case StatePending:
		return "pending"
	case StateBuilding:
		return "building"
	case StateFailed:
		return "failed"
	case StateSucceeded:
		return "succeeded"
	default:
		panic(fmt.Sprintf("未知的构建状态: %v", s))
	}
}

func (s *BuildState) Scan(src interface{}) error {
	if v, ok := src.([]byte); ok {
		switch string(v) {
		case "pending":
			*s = StatePending
		case "building":
			*s = StateBuilding
		case "failed":
			*s = StateFailed
		case "succeeded":
			*s = StateSucceeded
		default:
			return fmt.Errorf("未知的构建状态: %v", string(v))
		}
	}
	return nil
}

func (s BuildState) Value() (driver.Value, error) {
	return driver.Value(s.String()), nil
}

func buildsCreate(tx *sqlx.Tx, b *Build) error {
	const createBuildSql = `INSERT INTO builds (repository, branch, sha, state) VALUES (:repository, :branch, :sha, :state) RETURNING id`
	err := insert(tx, createBuildSql, b, &b.ID)
	if err, ok := err.(*pq.Error); ok {
		if err.Constraint == uniqueBuildConstraint {
			return ErrDuplicateBuild
		}
	}
	return err
}


// buildsFindByID finds a build by ID.
func buildsFindByID(tx *sqlx.Tx, buildID string) (*Build, error) {
	const findBuildSql = `SELECT * FROM builds WHERE id = ? LIMIT 1`
	var b Build
	err := tx.Get(&b, tx.Rebind(findBuildSql), buildID)
	return &b, err
}

// buildsFindByRepoSha finds a build by repository and sha.
func buildsFindByRepoSha(tx *sqlx.Tx, repoSha string) (*Build, error) {
	parts := strings.Split(repoSha, "@")
	var sql = `SELECT * FROM builds
WHERE repository = ?
AND sha = ?
ORDER BY seq desc
LIMIT 1`
	var b Build
	err := tx.Get(&b, tx.Rebind(sql), parts[0], parts[1])
	return &b, err
}

// buildsUpdateState changes the state of a build.
func buildsUpdateState(tx *sqlx.Tx, buildID string, state BuildState) error {
	var sql string
	switch state {
	case StateBuilding:
		sql = `UPDATE builds SET state = ?, started_at = ? WHERE id = ?`
	case StateSucceeded, StateFailed:
		sql = `UPDATE builds SET state = ?, completed_at = ? WHERE id = ?`
	default:
		panic(fmt.Sprintf("not implemented for %s", state))
	}

	_, err := tx.Exec(tx.Rebind(sql), state, time.Now(), buildID)
	return err
}
