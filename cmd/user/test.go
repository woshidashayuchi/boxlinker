package main

import (
	"golang.org/x/crypto/scrypt"
	"fmt"
)

func main(){
	if h, err := scrypt.Key([]byte("Admin123456"),[]byte("arandomuserpasswordsalt"), 16384, 8, 1, 3); err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(">>>",string(h[:]))
	}

}
