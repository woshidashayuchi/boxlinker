package v1

import (
	"net/http"
	"github.com/cabernety/boxlinker"
	"github.com/gorilla/mux"
)

func (a *Api) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := a.manager.GetUsers(boxlinker.ParseHTTPQuery(r))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var results []map[string]interface{}
	for _, user := range users {
		results = append(results, user.APIJson())
	}
	boxlinker.Resp(w, 0, results)
}

func (a *Api) GetUser(w http.ResponseWriter, r *http.Request){
	username := mux.Vars(r)["username"]
	u := a.manager.GetUserByName(username)
	if u == nil {
		boxlinker.Resp(w, 4, nil, "not found")
		return
	}
	boxlinker.Resp(w, 0, u.APIJson())
}