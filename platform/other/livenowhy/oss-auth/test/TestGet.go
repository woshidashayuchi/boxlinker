package main

import (
	"fmt"
	//"net/url"
	"net/http"
	"io/ioutil"
	"log"
	"bytes"
	//"encoding/json"
	//
	//"strings"
	"encoding/json"
)

func HttpGet()  {
	//u, _ := url.Parse("https://gosspublic.alicdn.com/callback_pub_key_v1.pem")
	//res, err := http.Get("https://gosspublic.alicdn.com/callback_pub_key_v1.pem")
	res, err := http.Get("https://www.baidu.com/")
	fmt.Println("HttpGet 001")

	if err != nil {
		fmt.Println("HttpGet 02")
		log.Fatal(err)
		return
	}

	defer res.Body.Close()
	fmt.Println("HttpGet 01")

	fmt.Println("HttpGet 03")

	result, err := ioutil.ReadAll(res.Body)

	fmt.Println("HttpGet 04")

	if err != nil {
		fmt.Println("HttpGet 05")
		log.Fatal(err)
		return
	}
	fmt.Println("%v", string(result))
}



func TestGet()  {

	host := "https://gosspublic.alicdn.com/callback_pub_key_v1.pem"

	var b []byte
	req,err := http.NewRequest("GET",host, bytes.NewBuffer(b))
	if err != nil {
		fmt.Printf("make request error: %v",err)
		} else {
			client := &http.Client{}
			res,err := client.Do(req)
			defer res.Body.Close()
			if err != nil {
				fmt.Printf("send log reponse error: %v",err)
			} else {
				body,err := ioutil.ReadAll(res.Body)
				if err != nil {
					fmt.Printf("send log read response body error: %v",err)
				}
				fmt.Printf("send log response: %s", string(body))
			}
		}
}

//type RequestBody struct {
//
//}
//
//
//type RequestBody struct {
//
// Status  string   `json:"status"`
//
// Region  []string `json:"region"`
//
// Percent string   `json:"percent"`
//
// Task_id string   `json:"task_id"`
//
//}
//
//b, err := json.Marshal(rbody)
//
//body := bytes.NewBuffer([]byte(b))
//
//(1)
//
//resp, err := http.Post(url, "application/json", body)
//
//(2)
//
//resp, err := http.Post(url, "application/x-www-form-urlencoded", body)
//
//
//
//(3)
//
//client := &http.Client{}
//
//req, _ := http.NewRequest("POST", url, body)
//
//req.Header.Set("Content-Type", "application/json")
//
//resp, err := client.Do(req)
//
//都不行，最后，尝试一下，将
//
//req, _ := http.NewRequest("POST", url, body)
//
//改为
//
//req, _ := http.NewRequest("POST", url, strings.NewReader(string(b)))
//
//OK了



type RequestData struct {
	Msg string     `json:"msg"`
	Result interface{}     `json:"result"`
	Status int `json:"status"`
}


func PostTest(body interface{}, url string) error {
	bodystr, err := json.Marshal(body)
	if err != nil {
		return err
	}

	sendbody := bytes.NewBuffer([]byte(bodystr))
	client := &http.Client{}


	req, _:= http.NewRequest("POST", url, sendbody)
	req.Header.Set("Content-Type", "application/json")
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("is error")
		return err
	}

	result, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("iss erro")
		return err
	}
	fmt.Println(string(result))
	return nil
}




func main() {
   //
	//for i := 0; i < 30; i ++ {
	//	go TestGet()
	//}
   //
   //ch1 := make(chan int)
   //
   // <- ch1
	//CheckToken("047494ae-4967-4e9c-ba4f-6f9861a0048e", "http://192.168.1.7:8001/api/v1.0/ucenter/tokens")



	b := `{"user_name": "liuzhangpei","password": "QAZwsx123"}`




}
