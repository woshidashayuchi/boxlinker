package auth

import (
	"net/http"
	"github.com/cabernety/boxlinker/controller/manager"
	"github.com/cabernety/boxlinker"
)

type AuthRequired struct {
	manager manager.Manager
}

func NewAuthRequired(m manager.Manager) *AuthRequired {
	return &AuthRequired{
		manager: m,
	}
}

func (a *AuthRequired) handleRequest(w http.ResponseWriter, r *http.Request) error {
	token := r.Header.Get("X-Access-Token")
	if err := a.manager.VerifyAuthToken(token); err != nil {
		return err
	}
	return nil
}

func (a *AuthRequired) HandlerFuncWithNext(w http.ResponseWriter, r *http.Request, next http.HandlerFunc){
	err := a.handleRequest(w, r)
	if err != nil {
		boxlinker.Resp(w, 1,nil,err.Error())
		return
	}
	if next != nil {
		next(w ,r)
	}
}