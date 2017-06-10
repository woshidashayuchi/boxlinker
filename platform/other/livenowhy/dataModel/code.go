package dataModel

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

var StatusCode = make(map[int]string)
func init() {
	StatusCode[0] = "OK"
	StatusCode[101] = "Parameters error"
	StatusCode[102] = "RPC API routing error"
	StatusCode[103] = "Http requests error"
	StatusCode[201] = "Authentication failure"
	StatusCode[202] = "Operation denied"
	StatusCode[301] = "Resource name already exists"
	StatusCode[401] = "Database insert error"
	StatusCode[402] = "Database delete error"
	StatusCode[403] = "Database update error"
	StatusCode[404] = "Database select error"
	StatusCode[501] = "Kubernetes resource create failure"
	StatusCode[502] = "Kubernetes resource update failure"
	StatusCode[503] = "Kubernetes resource delete failure"
	StatusCode[511] = "Ceph disk create failure"
	StatusCode[512] = "Ceph disk delete failure"
	StatusCode[513] = "Ceph disk resize failure"
	StatusCode[597] = "RabbitMQ rpc client exec timeout"
	StatusCode[598] = "RabbitMQ rpc client exec error"
	StatusCode[599] = "RabbitMQ rpc server exec error"
	StatusCode[601] = "System error"
	StatusCode[701] = "There is no resources"
	StatusCode[702] = "ERROR"
	StatusCode[703] = "no method"
}

type ResponseResult struct {
	Status int         `json:"status"`
	Result interface{} `json:"result"`
	Msg    string      `json:"msg"`
}

func RequestResult(code int, ret interface{}) (rel ResponseResult) {
	result := ResponseResult{
		Status: code,
		Msg:    StatusCode[code],
		Result: ret,
	}
	return result
}





func HttpRequestResult(w http.ResponseWriter, code int, ret interface{}) {
	request := ResponseResult{
		Status: code,
		Msg: StatusCode[code],
		Result: ret,
	}
	w.Header().Set("Content-Type", "application/json")

	s, err := json.Marshal(request)
	if err != nil {
		fmt.Errorf("HttpRequestResult is error : %s", err.Error())
	}
	io.WriteString(w, string(s))
}


func HttpRequestResultString(code int, ret interface{}) (string) {
	request := ResponseResult{
		Status: code,
		Msg: StatusCode[code],
		Result: ret,
	}
	s, err := json.Marshal(request)
	if err != nil {
		fmt.Errorf("HttpRequestResult is error : %s", err.Error())
	}
	return string(s)
}