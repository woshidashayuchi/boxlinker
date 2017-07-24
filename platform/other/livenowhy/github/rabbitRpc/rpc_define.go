package rabbitRpc

import (
	"fmt"
	"github.com/livenowhy/github/config"
	"github.com/livenowhy/dbModel/dbmodel"
	"github.com/livenowhy/dataModel"
	"github.com/livenowhy/goTools/tokentools"
)

type Sd struct {
	ss string
}

func (ss Sd) AppRun(context dataModel.ContextData, parameters map[string]interface{}) interface{} {
	fmt.Println(" AppRun  AppRun AppRun AppRunsssssss")
	return dataModel.RequestResult(0, "testapi for test")
}

type CodeRepoDefine struct {
	ss string
}

func (ss CodeRepoDefine) AppRun(context dataModel.ContextData, parameters map[string]interface{}) interface{} {
	fmt.Println(" CodeRepoDefine  CodeRepoDefine CodeRepoDefine CodeRepoDefine")

	fmt.Println(parameters)

	defer func()(interface{}) {
		if err := recover(); err != nil {
			return dataModel.RequestResult(101, nil)
		}
		return dataModel.RequestResult(101, nil)
	}()

	src_type := parameters["src_type"].(string)
	team_uuid := parameters["team_uuid"].(string)
	refresh := parameters["refresh"].(bool)

	if refresh {
		fmt.Println(" is true")
		return dbmodel.RefreshRepos(config.DBMYSQL, team_uuid, src_type)

	} else {
		fmt.Println(" is false")

		result := dbmodel.GetCodeRepoResult(config.DBMYSQL, team_uuid, src_type)
		if result.Status != 0 {
			fmt.Println("result.Status != 0 ")
			return dbmodel.RefreshRepos(config.DBMYSQL, team_uuid, src_type)
		}
		fmt.Println("result.Status == 0 ")
		return result
	}
}



// 设置Web hook
type CodeRepoHookDefine struct {
	Name string
}

func (crhd CodeRepoHookDefine) AppRun(context dataModel.ContextData, parameters map[string]interface{}) interface{} {
	fmt.Println(" CodeRepoHookDefine  CodeRepoHookDefine ")

	fmt.Println(parameters)

	defer func()(interface{}) {
		if err := recover(); err != nil {
			fmt.Println("------>")
			return dataModel.RequestResult(101, nil)
		}
		return dataModel.RequestResult(101, nil)
	}()

	src_type := parameters["src_type"].(string)
	team_uuid := parameters["team_uuid"].(string)
	repo_name := parameters["repo_name"].(string)
// src_type  team_uuid  repo_name
	fmt.Println(src_type)
	fmt.Println(team_uuid)
	fmt.Println(repo_name)

	hook_token := tokentools.GetRandomString(46)

	dbmodel.SetWebhook(config.DBMYSQL, src_type, team_uuid, repo_name, hook_token, config.WEBHOOKURL, true)
	return dataModel.RequestResult(0, nil)
}



// 设置Web hook
type DelOauthStatus struct {
	Name string
}

func (dos DelOauthStatus) AppRun(context dataModel.ContextData, parameters map[string]interface{}) interface{} {
	fmt.Println(" CodeRepoHookDefine  CodeRepoHookDefine ")

	fmt.Println(parameters)

	defer func()(interface{}) {
		if err := recover(); err != nil {
			fmt.Println("------>")
			return dataModel.RequestResult(101, nil)
		}
		return dataModel.RequestResult(101, nil)
	}()

	src_type := parameters["src_type"].(string)
	team_uuid := parameters["team_uuid"].(string)
// src_type  team_uuid  repo_name
	fmt.Println(src_type)
	fmt.Println(team_uuid)

	dbmodel.DelOauthStatus(config.DBMYSQL, src_type, team_uuid, config.WEBHOOKURL)

	return dataModel.RequestResult(0, nil)
}