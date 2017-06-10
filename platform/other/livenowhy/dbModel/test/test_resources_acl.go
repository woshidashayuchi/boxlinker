package main

import (
	"github.com/jmoiron/sqlx"
	"log"
	//"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/livenowhy/dbModel/dbmodel"
	"fmt"
	"os"
)

func test_AclCheck(tx *sqlx.DB)  {

	rc := dbmodel.ResourcesAcl{Resource_uuid: "002a7f39-2208-3415-baf2-62ae7bd3c316"}
	rcr, err := dbmodel.AclCheck(tx, &rc)
	if err != nil {
		fmt.Printf("AdminAclCheck is erorr: %s \n", err.Error())
		os.Exit(0)
	}

	fmt.Println(rcr.Team_uuid)
	fmt.Println(rcr.Resource_type)
	fmt.Println(rcr.Resource_uuid)
	fmt.Println(rcr.User_uuid)
	fmt.Printf(string(rcr.Create_time))

}

func main() {

	db, err := sqlx.Connect("mysql", "root:root123admin@tcp(192.168.1.6:3306)/registry?autocommit=true")
	if err != nil {
		log.Fatalln(err)
	}

	test_AclCheck(db)

}
