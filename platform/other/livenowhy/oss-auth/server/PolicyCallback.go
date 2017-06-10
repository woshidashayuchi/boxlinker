package server

import (
	"net/http"
	"fmt"
	"io"
	"encoding/json"
	"io/ioutil"
	"github.com/livenowhy/oss-auth/utils"
	"github.com/livenowhy/oss-auth/token"
)

// 获取
func (cg *Config)PolicyCallback(w http.ResponseWriter, r *http.Request) {
	r.ParseForm() //解析参数，默认是不会解析的

	w.Header().Set("Access-Control-Allow-Headers", "token")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	headtoken := r.Header.Get("token")
	fmt.Println(headtoken)

	//结构已知，解析到结构体
	result, err:= ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("ioutil.ReadAll is error")
	}

	fmt.Println(string(result))
    var actionType utils.CallbackActionType;
	err = json.Unmarshal([]byte(result), &actionType)

	//err = json.NewDecoder(r.Body).Decode(&actionType)
	if err != nil {
		fmt.Println(err.Error())
		fmt.Println("json.Unmarshal is error")
	}

	fmt.Println(actionType.ActionResourceId)
	fmt.Println(actionType.ActionType)

	if headtoken == "" {
		fmt.Println("headtoken is error")
		utils.ResponseError(w, "ERROR", "token is nill")
		return
	}

	if cg.AliyunKey.CheckToken != "" {
		err = token.CheckToken(headtoken, cg.AliyunKey.CheckToken)
		if err != nil {
			fmt.Println("headtoken is error")
			utils.ResponseError(w, "ERROR", err.Error())
			return
		}
		fmt.Println(" toke is ok")
	} else {
		fmt.Println("no CheckToken url")
	}

	//response := cg.AliyunKey.GetPolicyToken("user-dir/", &actionType)
	response := cg.AliyunKey.GetPolicyToken(cg.AliyunKey.UploadDir, &actionType)

	io.WriteString(w, response)
}



