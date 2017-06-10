package main

import (
	"github.com/jmoiron/sqlx"
	"log"
	"github.com/livenowhy/dbModel/dbmodel"
	//"fmt"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
)

func test_GetCodeRepoManager(db *sqlx.DB)  {
	cr := &dbmodel.CodeRepo{Team_uuid:"cabb719f-4a9a-475f-89f1-717231ae7eb5", Src_type:"github"}
	dbmodel.GetCodeRepoManager(db, cr)
}

func Test_GetCodeRepoResult(db *sqlx.DB, team_uuid, src_type string)  {
	ret := dbmodel.GetCodeRepoResult(db, team_uuid, src_type)
	fmt.Printf("%v \n", ret)
}


func Test_RefreshRepos(db *sqlx.DB, team_uuid, src_type string)  {
	ret := dbmodel.RefreshRepos(db, team_uuid, src_type)
	fmt.Printf("%v \n", ret)
}

func main() {
	db, err := sqlx.Connect("mysql", "root:root123admin@tcp(192.168.1.6:3306)/registry?autocommit=true")
	if err != nil {
		log.Fatalln(err)
	}


	//test_GetCodeRepoManager(db)

	//Test_GetCodeRepoResult(db, "cabb719f-4a9a-475f-89f1-717231ae7eb5", "github")
	Test_RefreshRepos(db, "09757939-b6dc-4da3-add6-b3775c8efb7a", "github")
}
