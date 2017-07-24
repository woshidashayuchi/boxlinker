package httptools

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func GetPublicKey(pub_key_url string) (retbool bool, public_key []byte) {
	var client = &http.Client{}

	fmt.Println(pub_key_url)
	request, err := http.NewRequest("GET", pub_key_url, nil)
	if err != nil {
		fmt.Println(" http.NewRequest err != nil")
		return false, nil
	}
	response, err := client.Do(request)
	if err != nil {
		fmt.Println(" client.Do(request) err != nil")
		fmt.Println(err.Error())
		return false, nil
	}

	fmt.Println("begin 03 get")
	defer response.Body.Close()

	if err != nil {
		fmt.Println("err != nil")
		return false, nil
	}

	if response.StatusCode == 200 {
		fmt.Println("response.StatusCode")
		public_key, _ = ioutil.ReadAll(response.Body)
		public_key_str := string(public_key)
		fmt.Println(public_key_str)
		return true, public_key
	} else {
		return false, nil
	}
}

func GetPublicKeyTwo(pub_key_url string) (retbool bool, public_key []byte) {
	res, err := http.Get(pub_key_url)
	if err != nil {
		fmt.Println(err.Error())
		return false, nil
	}

	result, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err.Error())
		fmt.Printf("GetPublicKeyTwo ioutil.ReadAll is error: %s \n", err.Error())
		return false, nil
	}
	res.Body.Close()
	return true, result
}
