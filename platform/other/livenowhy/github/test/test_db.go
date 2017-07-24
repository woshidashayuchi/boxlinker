package main

import (
	"github.com/livenowhy/RabbitResponse/db"
	//"github.com/livenowhy/RabbitResponse/manager"
	//"github.com/livenowhy/RabbitResponse/oauth"
	//"fmt"
	//"github.com/livenowhy/RabbitResponse/manager"
	"github.com/livenowhy/dataModel"
)

func main() {
// rows, err := DbHandle.Query(sql, "2e8e7b37-a957-4770-9075-aaa67eaa49ce", "github")
//	co := db.CodeOauth{Team_uuid: "2e8e7b37-a957-4770-9075-aaa67eaa49ce", Src_type: "github"}
//	co.GetCodeOauthManger()
//
//	fmt.Println(co.Access_token)

	//cr := db.CodeRepo{Team_uuid: "2e8e7b37-a957-4770-9075-aaa67eaa49ce", Src_type: "github"}

	//resulte ,err := cr.GetCodeRepoManager()
	//if err != nil{
	//	fmt.Println("sssss")
	//	fmt.Printf(err.Error())
	//}

	//fmt.Println(manager.GetCodeRepoResult(&cr))
	//manager.RefreshRepos("2e8e7b37-a957-4770-9075-aaa67eaa49ce", "github")
	//ret := manager.GetCodeRepoResult("2e8e7b37-a957-4770-9075-aaa67eaa49ce", "github")
	//log.Println(ret)

	//manager.DelOauthStatus( "github", "2e8e7b37-a957-4770-9075-aaa67eaa49ce")
	//ra := &db.ResourcesAcl{Resource_uuid: "get_code_oauth_type"}
	//
	////raa := &ra
	//ra.AdminCheck()

	// team_uuid=? and resource_type=? and resource_uuid=? and resource_domain=?`

	rl := dataModel.ResourceLocation{Team_uuid:"sss", Resource_type:"sss", Resource_domain:"ere"}
	rr := &db.ResourcesStorage{Resource_Location: rl}

	rr.ExistResourcesStorage()

	//db.LoadConfig("/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/RabbitResponse/conf/mysql.yml")





	//for _, re := range resulte {
	//	fmt.Println(re.Src_type)
	//}
}


