package main

import (
	"github.com/livenowhy/oss-auth/server"
	"net/http"
	"github.com/golang/glog"
	"os"
	"fmt"
)




func main() {

	glog.Info("begin run ...... ")
	 //os.Getenv检索环境变量并返回值，如果变量是不存在的，这将是空的。
	c, err := server.GetEnv()

	if err != nil {
		fmt.Println("GetEnv is error")
		glog.Exitf("init to load config: %s", err)
		os.Exit(-1)
	}

	// http://img.boxlinker.com/test
	http.HandleFunc("/test", c.ServerTest)
	http.HandleFunc("/policy", c.PolicyCallback)
	http.HandleFunc("/callback", c.Callback)
	http.ListenAndServe(":8765", nil)
}
