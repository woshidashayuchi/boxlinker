package main

import (
	//"fmt"
	"github.com/livenowhy/goTools/acl"
	"github.com/livenowhy/goTools/token"
	"fmt"
	"github.com/livenowhy/dataModel"
	"github.com/jmoiron/sqlx"
	"log"
	//"fmt"
	_ "github.com/go-sql-driver/mysql"
)


func main() {

	//common.CheckToken("65b36ac5-134e-47d1-a550-c4e3d8641efa")

	for i:=2; i< 10; i++ {
		token.TokenAuthStruct("e6b649d7-88cf-4130-8498-c281783d0a0e")
	}

	db, err := sqlx.Connect("mysql", "root:root123admin@tcp(192.168.1.6:3306)/registry?autocommit=true")
	if err != nil {
		log.Fatalln(err)
	}



	context := dataModel.ContextData{
		Token: "e6cad4c9-30fe-450d-ae14-7f4719839b80",
		Resource_uuid: "4c64fc3e-3cef-3b02-8ebf-f63aab009874",
		Action: "update",
	}

	ret, _ := acl.AclCheck(db, context, nil)
	if !ret {
		fmt.Println("no access")
	} else {
		fmt.Println(" is true")
	}

}
