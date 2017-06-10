package dbmodel

import (
	//"time"
	//"fmt"
	//"database/sql"
	"github.com/jmoiron/sqlx"
	"errors"
)

var NotExist = errors.New("Record does not exist")


type ResourcesAcl struct {
	//  资源的acl控制
	Resource_uuid string `json:"resource_uuid" db:"resource_uuid"`
	Resource_type string `json:"resource_type" db:"resource_type"`
	Admin_uuid    string `json:"admin_uuid" db:"admin_uuid"`
	Team_uuid     string `json:"team_uuid" db:"team_uuid"`
	Project_uuid  string `json:"project_uuid" db:"project_uuid"`
	User_uuid     string `json:"user_uuid" db:"user_uuid"`

	//Create_time *time.Time `json:"create_time" db:"create_time"`
	//Update_time *time.Time `json:"update_time" db:"update_time"`

	Create_time []uint8 `json:"create_time" db:"create_time"`
	Update_time []uint8 `json:"update_time" db:"update_time"`
}

func (ra *ResourcesAcl) string() string {
	return "resources_acl"
}

func GetAclCheck(db *sqlx.DB, ra *ResourcesAcl) (*ResourcesAcl, error) {
	var sql = `select * from resources_acl where resource_uuid = ?`
	//var sql = `select project_uuid from resources_acl where resource_uuid = ?`
	//var sql = `select user_uuid from resources_acl where resource_uuid = ?`
	resource_acl := ResourcesAcl{}
	err := db.Get(&resource_acl, db.Rebind(sql), ra.Resource_uuid)
	return &resource_acl, err
}