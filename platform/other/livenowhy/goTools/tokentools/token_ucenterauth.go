package tokentools


import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/coocood/freecache"
	"io/ioutil"
	"net/http"
	"errors"
)

//var TokenUrl = "http://192.168.1.7:8001/api/v1.0/ucenter/tokens"
var TokenUrl = "https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens"


var cacheSize = 100 * 1024 * 1024
var CACHE = freecache.NewCache(cacheSize)

var TokenError = errors.New("token is error")

type ResponseResultUserInfo struct {
	Status int      `json:"status"`
	Result UserInfo `json:"result"`
	Msg    string   `json:"msg"`
}

type UserInfo struct {
	Project_priv string `json:"project_priv"`
	Project_uuid string `json:"project_uuid"`
	Team_priv    string `json:"team_priv"`
	Team_uuid    string `json:"team_uuid"`
	User_uuid    string `json:"user_uuid"`
}

func CheckToken(token string) (userinfo *ResponseResultUserInfo, err error) {
	client := &http.Client{}
	var b []byte
	req, err := http.NewRequest("GET", TokenUrl, bytes.NewBuffer(b))
	if err != nil {
		return
	}

	req.Header.Set("token", token)
	resp, err := client.Do(req)

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
	ret := json.Unmarshal(body, &userinfo)
	if ret != nil{
		fmt.Printf("token is error reason : %s \n", err.Error())
		return
	}

	if userinfo.Status != 0 {
		err = TokenError
		fmt.Printf("token is userinfo.Status != 0 : %s \n", err.Error())
		return
	}
    return
}

func TokenAuth(token string) (userInfo []byte, err error) {
    userInfo, err = CACHE.Get([]byte(token))
    if err == nil{
        fmt.Printf("get cache  is ok")
        return
    }

    userinfoStruct, err := CheckToken(token)

    if err != nil {

		fmt.Println(" TokenAuth is error 01")
        return userInfo, err
    }

	fmt.Println("TokenAuth is ok -01")
    userInfo, err = json.Marshal(userinfoStruct)

	if err != nil {
		fmt.Printf("token is error : %s \n", err.Error())
		return
	}



    fmt.Printf("%s", userInfo)

    CACHE.Set([]byte(token), userInfo, 5 * 60)
    return
}

func TokenAuthStruct(token string)(rrui *ResponseResultUserInfo, err error)  {

	rrui = &ResponseResultUserInfo{}

    userInfo, err := TokenAuth(token)
    if err != nil{
        return
    }
    err = json.Unmarshal(userInfo, rrui)
    if err != nil {
		fmt.Println(err.Error())
        return
    }

    fmt.Printf(rrui.Result.Project_priv)
    return
}
