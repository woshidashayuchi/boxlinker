package main

import (
	"github.com/jmoiron/sqlx"
	"log"
	//"fmt"
	_ "github.com/go-sql-driver/mysql"
	//"github.com/livenowhy/dbModel/dbmodel"
	//"github.com/livenowhy/dataModel"
	//"fmt"
	//"os"
	"github.com/livenowhy/dataModel"
	"github.com/livenowhy/dbModel/dbmodel"
	"fmt"
	//"os"
	"time"
)

func test_ExistResourcesStorage(db *sqlx.DB)  {

	rl := dataModel.ResourceLocation{
		Resource_type: "UserAvatars",
		Resource_uuid: "cabb719f-4a9a-475f-89f1-717231ae7eb5",
		Resource_domain:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s",
		Team_uuid:"39828489-1bf6-334b-acdb-6a15bbd7c5a3ss"}


	rc := &dbmodel.ResourcesStorage{ResourceLocation: rl}
	ret := dbmodel.ExistResourcesStorage(db, rc)
	if ret {
		fmt.Printf("is osk")
	} else {
		fmt.Printf("is false")
	}
}
// {resource_type}/{resource_uuid}/{resource_domain}
// /UserAvatars/cabb719f-4a9a-475f-89f1-717231ae7eb5/39828489-1bf6-334b-acdb-6a15bbd7c5a3s
func test_AddResourcesStorage(db *sqlx.DB)  {

	rl := dataModel.ResourceLocation{
		Resource_type: "UserAvatars",
		Resource_uuid: "cabb719f-4a9a-475f-89f1-717231ae7eb5",
		Resource_domain:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s",
		Team_uuid:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s"}

	time_now := time.Now()
	fmt.Println(time_now)

	rs := &dbmodel.ResourcesStorage{ResourceLocation: rl, Storage_url:"sssss", Create_time: &time_now, Update_time: &time_now}
	err := dbmodel.AddResourcesStorage(db, rs)
	if err != nil {
		fmt.Printf("sssssss is error: %s \n", err.Error())
	}

}

func test_UpdateResourcesStorage(db *sqlx.DB) {

		rl := dataModel.ResourceLocation{
		Resource_type: "UserAvatars",
		Resource_uuid: "cabb719f-4a9a-475f-89f1-717231ae7eb5",
		Resource_domain:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s",
		Team_uuid:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s"}

	time_now := time.Now()

	rs := &dbmodel.ResourcesStorage{ResourceLocation: rl, Storage_url:"dsdsdsrwwe", Update_time: &time_now}
	err := dbmodel.UpdateResourcesStorage(db, rs)
	if err != nil {
		fmt.Printf("sssssss is error: %s \n", err.Error())
	}

}



func test_SelectResourcesStorageByLocation(db *sqlx.DB) {

		rl := dataModel.ResourceLocation{
		Resource_type: "UserAvatars",
		Resource_uuid: "cabb719f-4a9a-475f-89f1-717231ae7eb5",
		Resource_domain:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s",
		Team_uuid:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s"}


	rs := &dbmodel.ResourcesStorage{ResourceLocation: rl}
	rows, err := dbmodel.SelectResourcesStorageByLocation(db, rs)
	if err != nil {
		fmt.Printf("sssssss is error: %s \n", err.Error())
	}

	for _, row := range rows {
		fmt.Printf("--->: %s \n", row.Resource_domain)
	}

}

func test_SelectResourcesStorageByResource(db *sqlx.DB) {

		rl := dataModel.ResourceLocation{
		Resource_type: "UserAvatars",
		Resource_uuid: "cabb719f-4a9a-475f-89f1-717231ae7eb5",
		Resource_domain:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s",
		Team_uuid:"39828489-1bf6-334b-acdb-6a15bbd7c5a3s"}


	rs := &dbmodel.ResourcesStorage{ResourceLocation: rl}
	rows, err := dbmodel.SelectResourcesStorageByResource(db, rs)
	if err != nil {
		fmt.Printf("sssssss is error: %s \n", err.Error())
	}

	for _, row := range rows {
		fmt.Printf("--->: %s \n", row.Resource_domain)
	}

}
func test_sssss(db *sqlx.DB)  {
	// resource_type/:resource_uuid/:resource_domain
	rl := dataModel.ResourceLocation{Resource_type: "UserAvatars",
		Resource_uuid: "39828489-1bf6-334b-acdb-6a15bbd7c5a3",
		Resource_domain:""}

	rs := &dbmodel.ResourcesStorage{ResourceLocation: rl}
	rows, err := dbmodel.SelectResourcesStorageByResource_type(db, rs)
	if err != nil {
		fmt.Printf("SelectResourcesStorageByResource is error: %s \n", err.Error())
	}

	for _, row := range rows {
		fmt.Println(row.Storage_uuid)
	}

	fmt.Printf("%v", rows)


	dbmodel.GetFileList(rows)

}


func main() {


	db, err := sqlx.Connect("mysql", "root:root123admin@tcp(101.201.56.57:33066)/registry")
	if err != nil {
		log.Fatalln(err)
	}

	//tx := db.MustBegin()

	test_AddResourcesStorage(db)

	db.Begin()


	time.Sleep(time.Microsecond)

	for i:=2; i > 0 ; i--  {
		test_ExistResourcesStorage(db)
	}

	//test_UpdateResourcesStorage(tx)
	//test_SelectResourcesStorageByLocation(tx)
	//test_SelectResourcesStorageByResource(tx)


}

// docker run --env MYSQL_ROOT_PASSWORD=root123admin -d -p 33066:3306 --restart=always --name=test-mysql  index.boxlinker.com/boxlinker/user_mysql:latest
