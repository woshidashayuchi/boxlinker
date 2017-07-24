package main

import (
	"github.com/livenowhy/imgstorage/server"
	"net/http"
	//"github.com/julienschmidt/httprouter"
	//"github.com/gorilla/mux"
	"github.com/gorilla/mux"
)



func main() {

	router := mux.NewRouter()

	// /files/:resource_type/:resource_uuid/:resource_domain

	// 精确获取一个资源
	router.HandleFunc("/api/v1.0/files/{team_uuid}/{resource_type}/{resource_uuid}/{resource_domain}",
		server.GetFileByLocation)

	// 一类资源列表
	router.HandleFunc("/api/v1.0/files/{resource_type}/{resource_uuid}/{resource_domain}",
		server.GetFileByResource)

	// 含有 team_uuid post 获取一类资源的列表
	router.HandleFunc("/api/v1.0/files/team_uuid", server.GetFileByLocationList)

	// 不含 team_uuid post 获取一类资源的列表
	router.HandleFunc("/api/v1.0/files", server.GetFileByResourceList)

	router.HandleFunc("/api/v1.0/files/test", server.ServerTest)

	router.HandleFunc("/api/v1.0/files/policy", server.PolicyCallback)
	router.HandleFunc("/api/v1.0/files/callback", server.Callback)
	//http.ListenAndServe(":8765", nil)
	http.ListenAndServe(":8765", router)
}
// http://127.0.0.1:8765/api/v1.0/files/cabb719f-4a9a-475f-89f1-717231ae7eb5/UserAvatar/39828489-1bf6-334b-acdb-6a15bbd7c5a3/boxlinker