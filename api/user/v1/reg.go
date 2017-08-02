package v1

import (
	"net/http"
	"encoding/json"
	"github.com/cabernety/boxlinker"
	"github.com/cabernety/boxlinker/controller/models"
	"github.com/cabernety/boxlinker/auth"
)

type RegForm struct {
	Username 	string 	`json:"username"`
	Password 	string 	`json:"password"`
	Email 		string 	`json:"email"`
}

func (f *RegForm) validate() string {
	if f.Username == "" {
		return "您还没有填写用户名"
	}
	if f.Password == "" {
		return "您还没有填写密码"
	}
	if f.Email == "" {
		return "您还没有填写邮箱"
	}
	return ""

}

func (a *Api) Reg(w http.ResponseWriter, r *http.Request) {
	var form *RegForm
	if err := json.NewDecoder(r.Body).Decode(form); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if msg := form.validate(); msg != "" {
		boxlinker.Resp(w, 1, nil, msg)
		return
	}
	pass, err := auth.Hash(form.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := a.manager.SaveUser(&models.User{
		Name: form.Username,
		Password: pass,
		Email: form.Email,
	}); err != nil {
		boxlinker.Resp(w, 1, nil, err.Error())
		return
	}
	boxlinker.Resp(w, 0, nil, "success")
}
