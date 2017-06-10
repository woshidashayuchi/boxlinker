package server

import (
	"net/http"
	"fmt"
	"io"
	"encoding/json"
	"io/ioutil"
	"github.com/livenowhy/dataModel"
	"github.com/livenowhy/goTools/tokentools"
)

func SetCross(w http.ResponseWriter)  {
	w.Header().Set("Access-Control-Allow-Origin", "*")  // 允许访问源
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET")  // 允许post访问
	w.Header().Set("Access-Control-Allow-Headers", "token")  // header的类型
	w.Header().Set("content-type", "application/json") //返回数据格式是json
	// w.Header().Set("Access-Control-Allow-Headers", "token")
	// Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
}


// 获取
func ServerTest(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ServerTest")
	dataModel.HttpRequestResult(w, 0, "test is o00s")
	return
}


// 获取
func PolicyCallback(w http.ResponseWriter, r *http.Request) {
	SetCross(w)  //跨域

	r.ParseForm() //解析参数，默认是不会解析的
	headtoken := r.Header.Get("token")
	fmt.Printf("PolicyCallback headtoken: %s \n", headtoken)

	rruf, err := tokentools.TokenAuthStruct(headtoken)
	if err != nil {
		fmt.Printf("TokenAuthStruct is error  token: %s \n", headtoken)
		fmt.Printf("TokenAuthStruct is error reason: %s \n", err.Error())
		dataModel.HttpRequestResult(w, 702, "token is error")
		return
	}

	//结构已知，解析到结构体
	result, err:= ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("ioutil.ReadAll is error reason: %s \n", err.Error())
		dataModel.HttpRequestResult(w, 702, err.Error())
		return
	}

	fmt.Printf("ioutil.ReadAll result: %s \n", string(result))
    var resource_location dataModel.ResourceLocation

	err = json.Unmarshal([]byte(result), &resource_location)

	if err != nil {
		fmt.Println(err.Error())
		fmt.Println("json.Unmarshal is error")
	}

	resource_location.Team_uuid = rruf.Result.Team_uuid  // 这样可以保证其他人的不可以上传被人的图片
	response := AliyunConfig.AliyunKey.GetPolicyToken("ico/", &resource_location)
	fmt.Println(response)

	io.WriteString(w, response)
}


