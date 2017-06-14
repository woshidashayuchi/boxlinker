// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package auth

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	"github.com/go-macaron/session"
	gouuid "github.com/satori/go.uuid"
	log "gopkg.in/clog.v1"
	"gopkg.in/macaron.v1"

	"fmt"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/setting"
)

// IsAPIPath return if exists or not
func IsAPIPath(url string) bool {
	return strings.HasPrefix(url, "/api/")
}

// SignedInToken returns the result if token valid
// if not exists and add user
// https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens
func SignedInToken(ctx *macaron.Context, sess session.Store, url string) (bool, string) {
	token, _ := ctx.Req.Cookie("_at")
	fmt.Println("token: ", token)
	if token == nil {
		fmt.Println("missing token")
		return false, ""
	}
	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("token", token.Value)
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("token req err: ", err)
		return false, ""
	}
	defer resp.Body.Close()
	data, _ := ioutil.ReadAll(resp.Body)

	jsondata := make(map[string]interface{})
	err = json.Unmarshal(data, &jsondata)
	if err != nil {
		fmt.Println("Json Unmarshal error ", err)
		return false, ""
	}

	status := jsondata["status"].(float64)
	if status == 0 {
		fmt.Println("Authorization succ")
		result := jsondata["result"].(map[string]interface{})
		username := result["user_name"].(string)
		_, err := models.GetUserByName(username)
		if err != nil {
			u := &models.User{
				Name:     username,
				Email:    username + string("@boxlinker.com"),
				Passwd:   string("boxlinker"),
				IsActive: true,
			}

			if err := models.CreateUser(u); err != nil {
				switch {
				case models.IsErrUserAlreadyExist(err):
					ctx.Data["Err_UserName"] = true
					fmt.Println("username already exist: ", username)
					break
				case models.IsErrEmailAlreadyUsed(err):
					ctx.Data["Err_Email"] = true
					fmt.Println("email already exist: ", username+string("@boxlinker.com"))
					break
				case models.IsErrNameReserved(err):
					ctx.Data["Err_UserName"] = true
					fmt.Println("err username reserved")
					break
				case models.IsErrNamePatternNotAllowed(err):
					ctx.Data["Err_UserName"] = true
					fmt.Println("err username pattern not allowed")
					break
				default:
					fmt.Println("create user 500")
				}
			}
			return false, ""
		}
		return true, username
	}

	fmt.Println("Error Msg: ", jsondata["msg"].(string))
	return false, ""
}

// SignedInID returns the id of signed in user.
func SignedInID(ctx *macaron.Context, sess session.Store, username string) int64 {
	if !models.HasEngine {
		return 0
	}

	// Check access token.
	if IsAPIPath(ctx.Req.URL.Path) {
		tokenSHA := ctx.Query("token")
		if len(tokenSHA) == 0 {
			// Well, check with header again.
			auHead := ctx.Req.Header.Get("Authorization")
			if len(auHead) > 0 {
				auths := strings.Fields(auHead)
				if len(auths) == 2 && auths[0] == "token" {
					tokenSHA = auths[1]
				}
			}
		}
		log.Trace("token: ", tokenSHA)
		// Let's see if token is valid.
		if len(tokenSHA) > 0 {
			t, err := models.GetAccessTokenBySHA(tokenSHA)
			if err != nil {
				if !models.IsErrAccessTokenNotExist(err) && !models.IsErrAccessTokenEmpty(err) {
					log.Error(2, "GetAccessTokenBySHA: %v", err)
				}
				return 0
			}
			log.Trace("access token: ", t)
			t.Updated = time.Now()
			if err = models.UpdateAccessToken(t); err != nil {
				log.Error(2, "UpdateAccessToken: %v", err)
			}
			return t.UID
		}
	} else {
		log.Info("[SignedInID] Is Not API Path", ctx.Req.URL.Path)
		log.Info("[SignedInID] req token is : ", ctx.Req.Header.Get("token"))
	}

	var u *models.User
	var err error
	if u, err = models.GetUserByName(username); err != nil {
		if !errors.IsUserNotExist(err) {
			log.Error(2, "GetUserById: %v", err)
		}
		return 0
	}

	return u.ID
}

// SignedInUser returns the user object of signed user.
// It returns a bool value to indicate whether user uses basic auth or not.
func SignedInUser(ctx *macaron.Context, sess session.Store) (*models.User, bool) {
	if !models.HasEngine {
		return nil, false
	}
	url := "https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens"

	res, username := SignedInToken(ctx, sess, url)

	if res == false {
		return nil, false
	}

	uid := SignedInID(ctx, sess, username)
	if uid <= 0 {
		if setting.Service.EnableReverseProxyAuth {
			webAuthUser := ctx.Req.Header.Get(setting.ReverseProxyAuthUser)
			if len(webAuthUser) > 0 {
				u, err := models.GetUserByName(webAuthUser)
				if err != nil {
					if !errors.IsUserNotExist(err) {
						log.Error(4, "GetUserByName: %v", err)
						return nil, false
					}

					// Check if enabled auto-registration.
					if setting.Service.EnableReverseProxyAutoRegister {
						u := &models.User{
							Name:     webAuthUser,
							Email:    gouuid.NewV4().String() + "@localhost",
							Passwd:   webAuthUser,
							IsActive: true,
						}
						if err = models.CreateUser(u); err != nil {
							// FIXME: should I create a system notice?
							log.Error(4, "CreateUser: %v", err)
							return nil, false
						}
						return u, false
					}
				}
				return u, false
			}
		}

		// Check with basic auth.
		baHead := ctx.Req.Header.Get("Authorization")
		if len(baHead) > 0 {
			auths := strings.Fields(baHead)
			if len(auths) == 2 && auths[0] == "Basic" {
				uname, passwd, _ := base.BasicAuthDecode(auths[1])

				u, err := models.UserSignIn(uname, passwd)
				if err != nil {
					if !errors.IsUserNotExist(err) {
						log.Error(4, "UserSignIn: %v", err)
					}
					return nil, false
				}

				return u, true
			}
		}
		return nil, false
	}

	u, err := models.GetUserByID(uid)
	if err != nil {
		log.Error(4, "GetUserById: %v", err)
		return nil, false
	}
	return u, false
}
