package main

import (
	log "github.com/Sirupsen/logrus"
	"fmt"
)

func main(){
	log.SetLevel(log.DebugLevel)

	fmt.Print("send log: ","123123")
	log.Print(" ok ")
}