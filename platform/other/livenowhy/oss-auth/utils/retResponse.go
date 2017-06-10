package utils

import (
	"net/http"
	"encoding/json"
	"fmt"
	"io"
)


type ResponseOss struct {
	Status string `json:"Status"`
	Result string     `json:"result"`
	ErrMsg string     `json:"errmsg"`
}


func ResponseError(w http.ResponseWriter, Status string, Msg string) {
	var ResponseOss ResponseOss
	ResponseOss.Status = Status
	ResponseOss.Result = Msg
	ResponseOss.ErrMsg = Msg
	response_oss, err := json.Marshal(ResponseOss)
	if err != nil {
		fmt.Println("json err:", err)
	}
	w.Header().Set("Content-Type", "application/json")
	//w.Header().Set("Content-Length", )
	io.WriteString(w, string(response_oss))
}