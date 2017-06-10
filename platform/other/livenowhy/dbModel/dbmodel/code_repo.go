package dbmodel

import (
	"database/sql"
	"github.com/jmoiron/sqlx"
	//"time"
	"fmt"
	"github.com/livenowhy/dataModel"
)

type CodeRepo struct {
	// code_repo
	Code_repo_uuid  string  `json:"code_repo_uuid" db:"code_repo_uuid"`
	Team_uuid       string  `json:"team_uuid" db:"team_uuid"`
	Repo_uid        int     `json:"repo_uid" db:"repo_uid"`       // github 用户id
	Repo_id         int     `json:"repo_id" db:"repo_id"`         // 项目id
	Repo_name       string  `json:"repo_name" db:"repo_name"`     // 项目名
	Repo_branch     string  `json:"repo_branch" db:"repo_branch"` // 项目分支
	Repo_hook_token string  `json:"repo_hook_token" db:"repo_hook_token"`
	Hook_url        string  `json:"hook_url" db:"hook_url"` // web hook id,删除和修改时用
	Html_url        string  `json:"html_url" db:"html_url"` // 项目 url
	Ssh_url         string  `json:"ssh_url" db:"ssh_url"`   // 项目 git clone 地址
	Git_url         string  `json:"git_url" db:"git_url"`
	Description     string  `json:"description" db:"description"`
	Is_hook         int     `json:"is_hook" db:"is_hook"`   // 是否已经被授权hook
	Src_type        string  `json:"src_type" db:"src_type"` // 代码来源
	Deleted         int     `json:"deleted" db:"deleted"`
	Creation_time   []uint8 `json:"creation_time" db:"creation_time"`
	Update_time     []uint8 `json:"update_time" db:"update_time"`
}

func GetCodeRepo(db *sqlx.DB, cr *CodeRepo) ([]*CodeRepo, error) {
	// 通过 team_uuid 和 src_type 获取代码项目
	//const sql = `select code_repo_uuid, repo_uid, repo_id, repo_name, repo_branch,
	//             html_url, ssh_url, git_url, description, is_hook, deleted, creation_time, update_time
	//             from code_repo where team_uuid = ? and src_type = ?`

	const sql = `select code_repo_uuid, repo_uid, repo_id, repo_name, repo_branch,
			 html_url, ssh_url, git_url, description, is_hook, deleted, creation_time, update_time
			 from code_repo where team_uuid = ? and src_type = ?`
	code_repos := []*CodeRepo{}
	err := db.Select(&code_repos, db.Rebind(sql), cr.Team_uuid, cr.Src_type)
	return code_repos, err
}

func GetCodeRepoHook(db *sqlx.DB, cr *CodeRepo) ([]*CodeRepo, error) {
	// 通过 team_uuid 和 src_type 获取代码项目, 已经被设置webhook
	//const sql = `select repo_name, hook_url from code_repo where team_uuid=? and src_type=? and is_hook=1`
	const sql = `select * from code_repo where team_uuid = ? and src_type = ? and is_hook = 1`
	code_repos := []*CodeRepo{}
	err := db.Select(&code_repos, db.Rebind(sql), cr.Team_uuid, cr.Src_type)
	return code_repos, err

}

func SetAllCodeRepoDeleted(db *sqlx.DB, cr *CodeRepo) (sql.Result, error) {
	// 全部标记已经删除
	const sql = `update code_repo set deleted=1 where team_uuid = ? and src_type = ?`
	return db.Exec(sql, cr.Team_uuid, cr.Src_type)

}

func DelCodeRepoDeleted(db *sqlx.DB, cr *CodeRepo) (sql.Result, error) {
	// 删除已经被标记的删除的项目
	const sql = `delete from code_repo where team_uuid = ? and src_type = ? and deleted = 1`
	return db.Exec(sql, cr.Team_uuid, cr.Src_type)
}

func DelCodeOauth(db *sqlx.DB, cr *CodeRepo) (sql.Result, error) {
	// 删除code_oauth 信息
	const sql = `delete from code_oauth where team_uuid = ? and src_type = ?`
	return db.Exec(sql, cr.Team_uuid, cr.Src_type)
}

func DelCodeRepo(db *sqlx.DB, cr *CodeRepo) (sql.Result, error) {
	// 删除所有项目
	const sql = `delete from code_repo where team_uuid = ? and src_type = ?`
	return db.Exec(sql, cr.Team_uuid, cr.Src_type)

}

func AddCodeRepo(db *sqlx.DB, cr *CodeRepo) (sql.Result, error) {
	// 添加新记录
	const sql = `insert into code_repo(team_uuid, repo_uid, repo_id, repo_name,
	             repo_branch, html_url, ssh_url, git_url, description, src_type,
	             deleted, creation_time, update_time)
	             values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now())`
	return db.Exec(sql, cr.Team_uuid, cr.Repo_uid, cr.Repo_id, cr.Repo_name, cr.Repo_branch,
		cr.Html_url, cr.Ssh_url, cr.Git_url, cr.Description, cr.Src_type, cr.Deleted)
}

func ModifyCodeRepo(db *sqlx.DB, cr *CodeRepo) (sql.Result, error) {
	// 更新
	const sql = `update code_repo set repo_name=?, repo_branch=?, html_url=?,
	             ssh_url=?, git_url=?, description=?, update_time=now(), deleted=0, update_time=now()
	             where team_uuid=? and repo_id=? and src_type=?`

	return db.Exec(sql, cr.Repo_name, cr.Repo_branch, cr.Html_url, cr.Ssh_url, cr.Git_url,
		cr.Description, cr.Team_uuid, cr.Repo_id, cr.Src_type)
}

func GetCodeRepoManager(db *sqlx.DB, cr *CodeRepo) ([]CodeRepo, error) {
	// 通过 team_uuid 和 src_type 获取代码项目, 返回 CodeRepo 集合
	rows, err := GetCodeRepo(db, cr)
	if err != nil {
		fmt.Println("GetCodeRepo is error")
		fmt.Println(err.Error())
		return nil, err
	}

	var result []CodeRepo

	for _, row := range rows {
		result = append(result, *row)
	}

	fmt.Println("sssssss>>>>>")
	fmt.Println(result)
	return result, err
}


func GetCodeRepoHookManager(db *sqlx.DB, cr *CodeRepo) ([]CodeRepo, error) {
	// 通过 team_uuid 和 src_type 获取代码项目, 返回 CodeRepo 集合
	rows, err := GetCodeRepoHook(db, cr)
	if err != nil {
		fmt.Println("GetCodeRepo is error")
		fmt.Println(err.Error())
	}

	var result []CodeRepo

	for _, row := range rows {
		result = append(result, *row)
	}

	fmt.Println(result)
	return result, err
}


func GetCodeRepoResult(db *sqlx.DB, team_uuid, src_type string) (dataModel.ResponseResult) {

	co := CodeOauth{Team_uuid: team_uuid, Src_type: src_type}
	ret_co, err := GetCodeOauth(db, &co)
	if err != nil {
		fmt.Printf("GetCodeOauth is error: %s \n", err.Error())
		return dataModel.RequestResult(404, nil)
	}
    cr := CodeRepo{Team_uuid: team_uuid, Src_type: src_type}
	resulte, err := GetCodeRepoManager(db, &cr)
	if err != nil {
		fmt.Printf("GetCodeRepoManager is error: %s \n", err.Error())
		return dataModel.RequestResult(404, nil)
	}
	var repo_list = make([]interface{}, 0, 3) // 需要 0 ，否则第一个元素为 nil

	for _, re := range resulte {
		var tempmap = make(map[string]interface{})
		tempmap["repo_name"] = re.Repo_name
		tempmap["git_uid"] = re.Repo_id
		tempmap["is_hook"] = re.Is_hook
		tempmap["id"] = re.Code_repo_uuid
		tempmap["html_url"] = re.Html_url
		tempmap["ssh_url"] = re.Ssh_url
		tempmap["git_url"] = re.Git_url
		tempmap["description"] = re.Description
		tempmap["git_name"] = ret_co.Git_name
		repo_list = append(repo_list, tempmap)
	}

	if len(resulte) == 0 {
		return dataModel.RequestResult(701, nil)
	}
	return dataModel.RequestResult(0, repo_list)
}





