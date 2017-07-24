package token

import (
	"io/ioutil"
	"encoding/json"
	"fmt"
	"bytes"
	//"net/url"
	"net/http"
	"errors"
)

var TokenIsError = errors.New("token is error")


type RequestData struct {
	Msg string     `json:"msg"`
	Result interface{}     `json:"result"`
	Status int `json:"status"`
}


type HvishRequestData struct {
	Msg string     `json:"message"`
	Result interface{}     `json:"result"`
	Status int `json:"status_code"`
}

func CheckToken(token string, url string) error {

	client := &http.Client{}
	var b []byte
	req, err := http.NewRequest("GET", url, bytes.NewBuffer(b))
	if err != nil {
		return err
	}

	req.Header.Set("token", token)
	resp, err := client.Do(req)

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	hvishrequestData := &HvishRequestData{}

	ret := json.Unmarshal(body, &hvishrequestData)
	if ret != nil || hvishrequestData.Status != 200 {
		fmt.Println("token is error")
		return TokenIsError
	} else {
		fmt.Printf(" token is ok")
		return nil
	}
}


