package server


import (
	"net/http"
	"github.com/livenowhy/oss-auth/aliyun"
	"github.com/livenowhy/oss-auth/utils"
	"fmt"
	"encoding/json"
)


func (cg *Config) Callback(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		return
	}

	bodystr, err := aliyun.AliCallback(w, r)

	if err != nil {
		utils.ResponseError(w, "ERROR", err.Error())
		return
	}

	actionT, err := utils.NewCallbackActionType(bodystr)

	// 通用程序不用检查   actionT.ActionType
	if err != nil {
		utils.ResponseError(w, "ERROR", err.Error())
		return
	}

	fmt.Println("actionT.ActionIcon")

	imageurl := cg.AliyunKey.HostOuter + "/" + actionT.Filename

	fmt.Println("actionT.ActionIcon() is ok")
	fmt.Println(imageurl)
	fmt.Println(actionT)

	aa , err := json.Marshal(actionT)
	fmt.Println("ssssss-s--s-s-s")
	fmt.Println(string(aa))

	//utils.ResponseError(w, "OK", "is ok")
	utils.ResponseError(w, "OK", imageurl)
}
