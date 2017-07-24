// Copyright 2017 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package repo

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/Unknwon/com"
	log "gopkg.in/clog.v1"
	"gopkg.in/macaron.v1"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/setting"
)

const (
	ENV_AUTH_USER_ID           = "GOGS_AUTH_USER_ID"
	ENV_AUTH_USER_NAME         = "GOGS_AUTH_USER_NAME"
	ENV_AUTH_USER_EMAIL        = "GOGS_AUTH_USER_EMAIL"
	ENV_REPO_OWNER_NAME        = "GOGS_REPO_OWNER_NAME"
	ENV_REPO_OWNER_SALT_MD5    = "GOGS_REPO_OWNER_SALT_MD5"
	ENV_REPO_ID                = "GOGS_REPO_ID"
	ENV_REPO_NAME              = "GOGS_REPO_NAME"
	ENV_REPO_CUSTOM_HOOKS_PATH = "GOGS_REPO_CUSTOM_HOOKS_PATH"
)

type HTTPContext struct {
	*context.Context
	OwnerName string
	OwnerSalt string
	RepoID    int64
	RepoName  string
	AuthUser  *models.User
}

func HTTPContexter() macaron.Handler {
	return func(ctx *context.Context) {
		ownerName := ctx.Params(":username")
		repoName := strings.TrimSuffix(ctx.Params(":reponame"), ".git")
		repoName = strings.TrimSuffix(repoName, ".wiki")
		isPull := ctx.Query("service") == "git-upload-pack" ||
			strings.HasSuffix(ctx.Req.URL.Path, "git-upload-pack") ||
			ctx.Req.Method == "GET"

		owner, err := models.GetUserByName(ownerName)
		if err != nil {
			ctx.NotFoundOrServerError("GetUserByName", errors.IsUserNotExist, err)
			return
		}

		repo, err := models.GetRepositoryByName(owner.ID, repoName)
		if err != nil {
			ctx.NotFoundOrServerError("GetRepositoryByName", errors.IsRepoNotExist, err)
			return
		}

		// Authentication is not required for pulling from public repositories.
		if isPull && !repo.IsPrivate && !setting.Service.RequireSignInView {
			ctx.Map(&HTTPContext{
				Context: ctx,
			})
			return
		}

		// In case user requested a wrong URL and not intended to access Git objects.
		action := ctx.Params("*")
		if !strings.Contains(action, "git-") &&
			!strings.Contains(action, "info/") &&
			!strings.Contains(action, "HEAD") &&
			!strings.Contains(action, "objects/") {
			ctx.NotFound()
			return
		}

		// Handle HTTP Basic Authentication
		authHead := ctx.Req.Header.Get("Authorization")
		if len(authHead) == 0 {
			ctx.Resp.Header().Set("WWW-Authenticate", "Basic realm=\".\"")
			ctx.Error(http.StatusUnauthorized)
			return
		}

		auths := strings.Fields(authHead)
		if len(auths) != 2 || auths[0] != "Basic" {
			ctx.Error(http.StatusUnauthorized)
			return
		}
		authUsername, authPassword, err := base.BasicAuthDecode(auths[1])
		if err != nil {
			ctx.Error(http.StatusUnauthorized)
			return
		}

		res := CheckGitUserAndPwd(authUsername, authPassword)

		if res == false {
			ctx.Handle(http.StatusInternalServerError, "UserSignIn", err)
			return
		}

		authUser, err := models.GetUserByName(authUsername)
		if err != nil {
			ctx.Handle(http.StatusInternalServerError, "UserSignIn", err)
			return
		}

		mode := models.ACCESS_MODE_WRITE
		if isPull {
			mode = models.ACCESS_MODE_READ
		}

		has, err := models.HasAccess(authUser.ID, repo, mode)
		if err != nil {
			ctx.Handle(http.StatusInternalServerError, "HasAccess", err)
			return
		} else if !has {
			ctx.HandleText(http.StatusForbidden, "User permission denied")
			return
		}

		if !isPull && repo.IsMirror {
			ctx.HandleText(http.StatusForbidden, "Mirror repository is read-only")
			return
		}

		ctx.Map(&HTTPContext{
			Context:   ctx,
			OwnerName: ownerName,
			OwnerSalt: owner.Salt,
			RepoID:    repo.ID,
			RepoName:  repoName,
			AuthUser:  authUser,
		})
	}
}

type GitUser struct {
	Username string `json:"user_name"`
	Password string `json:"password"`
}

func CheckGitUserAndPwd(user, pwd string) bool {
	url := "https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens"
	client := &http.Client{}
	u := &GitUser{Username: user, Password: pwd}
	str, err := json.Marshal(u)
	fmt.Println(string(str))
	req, _ := http.NewRequest("POST", url, strings.NewReader(string(str)))
	req.Header.Set("Content-Type", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("token req err: ", err)
		return false
	}
	defer resp.Body.Close()
	data, _ := ioutil.ReadAll(resp.Body)

	jsondata := make(map[string]interface{})
	err = json.Unmarshal(data, &jsondata)
	if err != nil {
		fmt.Println("Json Unmarshal error ", err)
		return false
	}

	status := jsondata["status"].(float64)
	if status == 0 {
		return true
	}

	result := jsondata["result"].(map[string]interface{})
	fmt.Println(result)

	return false
}

type serviceHandler struct {
	w    http.ResponseWriter
	r    *http.Request
	dir  string
	file string

	authUser  *models.User
	ownerName string
	ownerSalt string
	repoID    int64
	repoName  string
}

func (h *serviceHandler) setHeaderNoCache() {
	h.w.Header().Set("Expires", "Fri, 01 Jan 1980 00:00:00 GMT")
	h.w.Header().Set("Pragma", "no-cache")
	h.w.Header().Set("Cache-Control", "no-cache, max-age=0, must-revalidate")
}

func (h *serviceHandler) setHeaderCacheForever() {
	now := time.Now().Unix()
	expires := now + 31536000
	h.w.Header().Set("Date", fmt.Sprintf("%d", now))
	h.w.Header().Set("Expires", fmt.Sprintf("%d", expires))
	h.w.Header().Set("Cache-Control", "public, max-age=31536000")
}

func (h *serviceHandler) sendFile(contentType string) {
	reqFile := path.Join(h.dir, h.file)
	fi, err := os.Stat(reqFile)
	if os.IsNotExist(err) {
		h.w.WriteHeader(http.StatusNotFound)
		return
	}

	h.w.Header().Set("Content-Type", contentType)
	h.w.Header().Set("Content-Length", fmt.Sprintf("%d", fi.Size()))
	h.w.Header().Set("Last-Modified", fi.ModTime().Format(http.TimeFormat))
	http.ServeFile(h.w, h.r, reqFile)
}

type ComposeHookEnvsOptions struct {
	AuthUser  *models.User
	OwnerName string
	OwnerSalt string
	RepoID    int64
	RepoName  string
	RepoPath  string
}

func ComposeHookEnvs(opts ComposeHookEnvsOptions) []string {
	envs := []string{
		"SSH_ORIGINAL_COMMAND=1",
		ENV_AUTH_USER_ID + "=" + com.ToStr(opts.AuthUser.ID),
		ENV_AUTH_USER_NAME + "=" + opts.AuthUser.Name,
		ENV_AUTH_USER_EMAIL + "=" + opts.AuthUser.Email,
		ENV_REPO_OWNER_NAME + "=" + opts.OwnerName,
		ENV_REPO_OWNER_SALT_MD5 + "=" + base.EncodeMD5(opts.OwnerSalt),
		ENV_REPO_ID + "=" + com.ToStr(opts.RepoID),
		ENV_REPO_NAME + "=" + opts.RepoName,
		ENV_REPO_CUSTOM_HOOKS_PATH + "=" + path.Join(opts.RepoPath, "custom_hooks"),
	}
	return envs
}

func serviceRPC(h serviceHandler, service string) {
	defer h.r.Body.Close()

	if h.r.Header.Get("Content-Type") != fmt.Sprintf("application/x-git-%s-request", service) {
		h.w.WriteHeader(http.StatusUnauthorized)
		return
	}
	h.w.Header().Set("Content-Type", fmt.Sprintf("application/x-git-%s-result", service))

	var (
		reqBody = h.r.Body
		err     error
	)

	// Handle GZIP
	if h.r.Header.Get("Content-Encoding") == "gzip" {
		reqBody, err = gzip.NewReader(reqBody)
		if err != nil {
			log.Error(2, "HTTP.Get: fail to create gzip reader: %v", err)
			h.w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	var stderr bytes.Buffer
	cmd := exec.Command("git", service, "--stateless-rpc", h.dir)
	if service == "receive-pack" {
		cmd.Env = append(os.Environ(), ComposeHookEnvs(ComposeHookEnvsOptions{
			AuthUser:  h.authUser,
			OwnerName: h.ownerName,
			OwnerSalt: h.ownerSalt,
			RepoID:    h.repoID,
			RepoName:  h.repoName,
			RepoPath:  h.dir,
		})...)
	}
	cmd.Dir = h.dir
	cmd.Stdout = h.w
	cmd.Stderr = &stderr
	cmd.Stdin = reqBody
	if err = cmd.Run(); err != nil {
		log.Error(2, "HTTP.serviceRPC: fail to serve RPC '%s': %v - %s", service, err, stderr)
		h.w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func serviceUploadPack(h serviceHandler) {
	serviceRPC(h, "upload-pack")
}

func serviceReceivePack(h serviceHandler) {
	serviceRPC(h, "receive-pack")
}

func getServiceType(r *http.Request) string {
	serviceType := r.FormValue("service")
	if !strings.HasPrefix(serviceType, "git-") {
		return ""
	}
	return strings.TrimPrefix(serviceType, "git-")
}

// FIXME: use process module
func gitCommand(dir string, args ...string) []byte {
	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	out, err := cmd.Output()
	if err != nil {
		log.Error(2, fmt.Sprintf("Git: %v - %s", err, out))
	}
	return out
}

func updateServerInfo(dir string) []byte {
	return gitCommand(dir, "update-server-info")
}

func packetWrite(str string) []byte {
	s := strconv.FormatInt(int64(len(str)+4), 16)
	if len(s)%4 != 0 {
		s = strings.Repeat("0", 4-len(s)%4) + s
	}
	return []byte(s + str)
}

func getInfoRefs(h serviceHandler) {
	h.setHeaderNoCache()
	service := getServiceType(h.r)
	if service != "upload-pack" && service != "receive-pack" {
		updateServerInfo(h.dir)
		h.sendFile("text/plain; charset=utf-8")
		return
	}

	refs := gitCommand(h.dir, service, "--stateless-rpc", "--advertise-refs", ".")
	h.w.Header().Set("Content-Type", fmt.Sprintf("application/x-git-%s-advertisement", service))
	h.w.WriteHeader(http.StatusOK)
	h.w.Write(packetWrite("# service=git-" + service + "\n"))
	h.w.Write([]byte("0000"))
	h.w.Write(refs)
}

func getTextFile(h serviceHandler) {
	h.setHeaderNoCache()
	h.sendFile("text/plain")
}

func getInfoPacks(h serviceHandler) {
	h.setHeaderCacheForever()
	h.sendFile("text/plain; charset=utf-8")
}

func getLooseObject(h serviceHandler) {
	h.setHeaderCacheForever()
	h.sendFile("application/x-git-loose-object")
}

func getPackFile(h serviceHandler) {
	h.setHeaderCacheForever()
	h.sendFile("application/x-git-packed-objects")
}

func getIdxFile(h serviceHandler) {
	h.setHeaderCacheForever()
	h.sendFile("application/x-git-packed-objects-toc")
}

var routes = []struct {
	reg     *regexp.Regexp
	method  string
	handler func(serviceHandler)
}{
	{regexp.MustCompile("(.*?)/git-upload-pack$"), "POST", serviceUploadPack},
	{regexp.MustCompile("(.*?)/git-receive-pack$"), "POST", serviceReceivePack},
	{regexp.MustCompile("(.*?)/info/refs$"), "GET", getInfoRefs},
	{regexp.MustCompile("(.*?)/HEAD$"), "GET", getTextFile},
	{regexp.MustCompile("(.*?)/objects/info/alternates$"), "GET", getTextFile},
	{regexp.MustCompile("(.*?)/objects/info/http-alternates$"), "GET", getTextFile},
	{regexp.MustCompile("(.*?)/objects/info/packs$"), "GET", getInfoPacks},
	{regexp.MustCompile("(.*?)/objects/info/[^/]*$"), "GET", getTextFile},
	{regexp.MustCompile("(.*?)/objects/[0-9a-f]{2}/[0-9a-f]{38}$"), "GET", getLooseObject},
	{regexp.MustCompile("(.*?)/objects/pack/pack-[0-9a-f]{40}\\.pack$"), "GET", getPackFile},
	{regexp.MustCompile("(.*?)/objects/pack/pack-[0-9a-f]{40}\\.idx$"), "GET", getIdxFile},
}

func getGitRepoPath(dir string) (string, error) {
	if !strings.HasSuffix(dir, ".git") {
		dir += ".git"
	}

	filename := path.Join(setting.RepoRootPath, dir)
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		return "", err
	}

	return filename, nil
}

func HTTP(ctx *HTTPContext) {
	for _, route := range routes {
		reqPath := strings.ToLower(ctx.Req.URL.Path)
		m := route.reg.FindStringSubmatch(reqPath)
		if m == nil {
			continue
		}

		// We perform check here because routes matched in cmd/web.go is wider than needed,
		// but we only want to output this message only if user is really trying to access
		// Git HTTP endpoints.
		if setting.Repository.DisableHTTPGit {
			ctx.HandleText(http.StatusForbidden, "Interacting with repositories by HTTP protocol is not disabled")
			return
		}

		if route.method != ctx.Req.Method {
			ctx.NotFound()
			return
		}

		file := strings.TrimPrefix(reqPath, m[1]+"/")
		dir, err := getGitRepoPath(m[1])
		if err != nil {
			log.Warn("HTTP.getGitRepoPath: %v", err)
			ctx.NotFound()
			return
		}

		route.handler(serviceHandler{
			w:    ctx.Resp,
			r:    ctx.Req.Request,
			dir:  dir,
			file: file,

			authUser:  ctx.AuthUser,
			ownerName: ctx.OwnerName,
			ownerSalt: ctx.OwnerSalt,
			repoID:    ctx.RepoID,
			repoName:  ctx.RepoName,
		})
		return
	}

	ctx.NotFound()
}
