package dbmodel

import (
	"github.com/jmoiron/sqlx"
	//"database/sql"
)

type CodeOauth struct {
	// code_oauth  第三方认证, 用户认证表
	Code_oauth_uuid string `json:"code_oauth_uuid" db:"code_oauth_uuid"`
	Team_uuid       string `json:"team_uuid" db:"team_uuid"` // 和组织相关, 不要绑定用户
	Src_type        string `json:"src_type" db:"src_type"`   // 代码来源
	Git_name        string `json:"git_name" db:"git_name"`
	Git_emain       string `json:"git_emain" db:"git_emain"`
	Git_uid         string `json:"git_uid" db:"git_uid"`
	Access_token    string `json:"access_token" db:"access_token"`
}



func GetCodeOauth(db *sqlx.DB, co *CodeOauth) (*CodeOauth, error){
	// 通过 team_uuid 和 src_type 得到一条 CodeOauth 记录
	//const sql = `select code_oauth_uuid, git_name, git_emain, git_uid, access_token from code_oauth where team_uuid= ? and src_type= ? LIMIT 1`
	const sql = `select * from code_oauth where team_uuid = ? and src_type = ? LIMIT 1`
	code_oauth := CodeOauth{}
	err := db.Get(&code_oauth, db.Rebind(sql), co.Team_uuid, co.Src_type)
	return &code_oauth, err
}

func GetCodeOauthByTeam(db *sqlx.DB, co *CodeOauth) ([]*CodeOauth, error) {
	// 通过 team_uuid  得到  CodeOauth 记录
	//const sql = `select code_oauth_uuid, git_name, git_emain, git_uid, access_token, src_type from code_oauth where team_uuid= ?`
	const sql = `select * from code_oauth where team_uuid = ?`
	code_oauths := []*CodeOauth{}
	err := db.Select(&code_oauths, db.Rebind(sql), co.Src_type)
	return code_oauths, err
}

func GetCodeOauthType(db *sqlx.DB, co *CodeOauth)([]*CodeOauth, error)  {
	// 获取一个用户的绑定类型
	const sql = `select src_type from code_oauth where team_uuid = ?`
	code_oauths := []*CodeOauth{}
	err := db.Select(&code_oauths, db.Rebind(sql), co.Team_uuid)
	return code_oauths, err

}