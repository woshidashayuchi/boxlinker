package auth

import (
	"net/http"
	"github.com/cabernety/boxlinker/controller/manager"
	"github.com/cabernety/boxlinker"
	"golang.org/x/net/context"
)

type AuthRequired struct {
	manager manager.Manager
}

func NewAuthRequired(m manager.Manager) *AuthRequired {
	return &AuthRequired{
		manager: m,
	}
}

//func (a *AuthRequired) handleRequest(w http.ResponseWriter, r *http.Request) (map[string]) {
//
//	return nil
//}

func (a *AuthRequired) HandlerFuncWithNext(w http.ResponseWriter, r *http.Request, next http.HandlerFunc){
	//err := a.handleRequest(w, r)
	token := r.Header.Get("X-Access-Token")
	data, err := a.manager.VerifyAuthToken(token)
	if err != nil {
		boxlinker.Resp(w, 1,nil,err.Error())
		return
	}
	if next != nil {
		next(w ,r.WithContext(context.WithValue(r.Context(), "user", data)))
	}
}