package v1

import (
	"net/http"
	"encoding/json"
	"github.com/cabernety/boxlinker"
	"io/ioutil"
	log "github.com/Sirupsen/logrus"
)

type LoginForm struct {
	Username string		`json:"username"`
	Password string		`json:"password"`
}

func (f *LoginForm) validate() string {
	if f.Username == "" {
		return "您还没有填写用户名"
	}
	if f.Password == "" {
		return "您还没有填写用户名"
	}
	return ""
}

func (a *Api) Login(w http.ResponseWriter, r *http.Request){
	form := &LoginForm{}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := json.Unmarshal(b, form); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	log.Debugf("form: %v", form)
	if msg := form.validate(); msg != "" {
		boxlinker.Resp(w, 1, nil, msg)
		return
	}

	u := a.manager.GetUserByName(form.Username)
	success, err := a.manager.VerifyUsernamePassword(u.Name, u.Password)
	if err != nil {
		boxlinker.Resp(w, 1, nil, err.Error())
		return
	}
	if !success {
		boxlinker.Resp(w, 1, nil, "failed")
		return
	}
	token, err := a.manager.GenerateToken(u.Id, u.Name)
	if err != nil {
		boxlinker.Resp(w, 1, nil, err.Error())
		return
	}
	boxlinker.Resp(w, 0, map[string]string{
		"token": token,
	})
}




