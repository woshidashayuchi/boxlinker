package dbmodel

import (
	"github.com/livenowhy/dataModel"
	"github.com/livenowhy/dbModel/oauth"
	"github.com/jmoiron/sqlx"
	"fmt"
	"errors"
)

var NoAccessToken = errors.New("NoAccessToken")


func RefreshRepos(db *sqlx.DB, team_uuid, src_type string) (dataModel.ResponseResult) {
	// 从 github 获取信息, 更新代码列表
	tempCo := CodeOauth{Team_uuid: team_uuid, Src_type: src_type}
	retCo, err := GetCodeOauth(db, &tempCo)
	if err != nil {
		fmt.Printf("GetCodeOauth is error: %s \n", err.Error())
		return dataModel.RequestResult(404, nil)
	}


	if "" == retCo.Access_token {
		fmt.Println("Access_token  is null ")
		return dataModel.RequestResult(404, nil)
	}

	var code_r = CodeRepo{Team_uuid: team_uuid, Src_type: src_type}

	var old_map = make(map[int]string)
	results, err := GetCodeRepoManager(db, &code_r)
	for _, result := range results {
		old_map[result.Repo_id] = result.Repo_name
	}
	_, err = SetAllCodeRepoDeleted(db, &code_r) // 标记删除

	fmt.Printf("co.Access_token-->: %s \n", retCo.Access_token)

	repos, _, err := oauth.RepoList(retCo.Access_token)
	if err != nil {
		fmt.Printf("oauth.RepoList is error: %s \n", err.Error())
		return dataModel.RequestResult(601, nil)
	}
	for _, repo := range repos {
		fmt.Println(*repo.ArchiveURL)
		var cr = CodeRepo{}
		cr.Team_uuid = team_uuid
		cr.Repo_uid = *repo.Owner.ID
		cr.Repo_id = *repo.ID
		cr.Repo_name = *repo.Name
		cr.Src_type = src_type
		cr.Repo_branch = *repo.DefaultBranch
		cr.Html_url = *repo.HTMLURL
		cr.Ssh_url = *repo.SSHURL
		cr.Git_url = *repo.CloneURL

		if repo.Description == nil {
			cr.Description = "No description, website, or topics provided."
		} else {
			cr.Description = *repo.Description
		}

		cr.Deleted = 0

		if _, ok := old_map[*repo.ID]; ok {
			ModifyCodeRepo(db, &cr)
		} else {
			AddCodeRepo(db, &cr)
		}
	}
	DelCodeRepoDeleted(db, &code_r)
	return GetCodeRepoResult(db, team_uuid, src_type)
}


// src_type  team_uuid  repo_name
func SetWebhook(db *sqlx.DB, src_type, team_uuid, repo_name , hook_token, hookurl string, delrepeat bool) (dataModel.ResponseResult) {


	tempCo := CodeOauth{Team_uuid: team_uuid, Src_type: src_type}
	retCo, err := GetCodeOauth(db, &tempCo)
	if err != nil {
		fmt.Printf("GetCodeOauth is error: %s \n", err.Error())
		return dataModel.RequestResult(404, nil)
	}

	//hook_token := dataModel.GetRandomString(46)

	if delrepeat {
		oauth.DelHooks(retCo.Access_token, retCo.Git_name, repo_name, hookurl)
	}

	oauth.CreateHook(retCo.Access_token, retCo.Git_name, repo_name, hookurl, hook_token)
	return dataModel.RequestResult(0, nil)
}







func DelOauthStatus(db *sqlx.DB, src_type, team_uuid, hookurl string) (dataModel.ResponseResult) {

	tempCo := CodeOauth{Team_uuid: team_uuid, Src_type: src_type}
	retCo, err := GetCodeOauth(db, &tempCo)
	if err != nil {
		fmt.Printf("GetCodeOauth is error: %s \n", err.Error())
		return dataModel.RequestResult(404, nil)
	}


	cr := CodeRepo{Team_uuid: team_uuid, Src_type: src_type}
	resulte, err := GetCodeRepoHookManager(db, &cr)
	if err != nil {
		fmt.Printf("GetCodeRepoHookManager is error: %s \n", err.Error())
		return dataModel.RequestResult(404, nil)
	}

	for _, re := range resulte {
		if re.Hook_url == hookurl{
			oauth.DelHooks(retCo.Access_token, retCo.Git_name, re.Repo_name, hookurl)
		}
	}
	DelCodeOauth(db, &cr)
	DelCodeRepo(db, &cr)
	return dataModel.RequestResult(0, nil)
}

