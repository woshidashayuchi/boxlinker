package dbmodel

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	//"time"
	"github.com/jmoiron/sqlx"
	"github.com/livenowhy/dataModel"
	//"time"
	"gopkg.in/redis.v5"
	"github.com/livenowhy/goTools/httptools"
	"time"
)

type ResourcesStorage struct {
	// 图片服务
	Storage_uuid int `json:"storage_uuid" db:"storage_uuid"` // 自增整形

	dataModel.ResourceLocation // 位置

	Storage_url string `json:"storage_url" db:"storage_url"` //图片url

	Create_time *time.Time `json:"create_time" db:"create_time"`
	Update_time *time.Time `json:"update_time" db:"update_time"`
}

// storage_uuid  storage_url   create_time  update_time
func (pr *ResourcesStorage) string() string {
	return "resources_storage"
}

func AddResourcesStorage(db *sqlx.DB, pr *ResourcesStorage) error {
	// 添加新资源记录
	const sql = `insert into resources_storage (
	             team_uuid, resource_type, resource_uuid, resource_domain, storage_url, create_time, update_time)
	             values (:team_uuid, :resource_type, :resource_uuid, :resource_domain, :storage_url, :create_time, :update_time)`
	return InsertNamed(db, sql, pr)
}

func UpdateResourcesStorage(db *sqlx.DB, pr *ResourcesStorage) error {
	// 修改记录
	const sql = `update resources_storage set storage_url = :storage_url , update_time = :update_time
	             where
	             team_uuid = :team_uuid and resource_type = :resource_type and
	             resource_uuid = :resource_uuid and resource_domain = :resource_domain`

	return InsertNamed(db, sql, pr)
}

func SelectResourcesStorageByLocation(db *sqlx.DB, pr *ResourcesStorage) ([]*ResourcesStorage, error) {
	// 通过 ResourceLocation 查询资源记录
	const sql = `select storage_uuid, team_uuid, resource_type, resource_uuid, resource_domain, storage_url from resources_storage
	             where team_uuid=? and resource_type=? and resource_uuid=? and resource_domain=? limit 1`

	rs := []*ResourcesStorage{}
	err := db.Select(&rs, db.Rebind(sql), pr.Team_uuid, pr.Resource_type,
		pr.Resource_uuid, pr.Resource_domain)
	return rs, err
}

func SelectResourcesStorageByResource(db *sqlx.DB, pr *ResourcesStorage) ([]*ResourcesStorage, error) {
	// 通过 Resource 三个资源点位参数查询资源
	const sql = `select storage_uuid, team_uuid, resource_type, resource_uuid, resource_domain, storage_url
	  from resources_storage where resource_type=? and resource_uuid=? and resource_domain=?`
	rs := []*ResourcesStorage{}
	err := db.Select(&rs, db.Rebind(sql), pr.Resource_type, pr.Resource_uuid, pr.Resource_domain)
	return rs, err
}

func GetResourcesStorageByLocation(db *sqlx.DB, pr *ResourcesStorage) (*ResourcesStorage, error) {
	// 通过 ResourceLocation 查询资源记录
	const sql = `select storage_uuid, team_uuid, resource_type, resource_uuid, resource_domain, storage_url from resources_storage
	             where team_uuid=? and resource_type=? and resource_uuid=? and resource_domain=?`

	rs := ResourcesStorage{}
	err := db.Get(&rs, db.Rebind(sql), pr.Team_uuid, pr.Resource_type,
		pr.Resource_uuid, pr.Resource_domain)

	return &rs, err
}

func ExistResourcesStorage(db *sqlx.DB, pr *ResourcesStorage) bool {
	// 资源是否存在
	defer func() interface{} {
		if err := recover(); err != nil {
			fmt.Printf("ExistResourcesStorage recover: %v \n", err)
			return false
		}
		return false
	}()

	//ret, err := SelectResourcesStorageByLocation(tx, pr)

	const sql = `select storage_uuid from resources_storage
	             where
	             team_uuid=:team_uuid and resource_type=:resource_type
	             and resource_uuid=:resource_uuid and resource_domain=:resource_domain`

	rows, err := db.NamedQuery(sql, pr)

	if err != nil {
		fmt.Printf("SelectResourcesStorageByLocation is error : %s \n", err.Error())
		return false
	}
	return rows.Next() // TRUE 存在; false 不存在
}

func SelectResourcesStorageByResource_type(db *sqlx.DB, pr *ResourcesStorage) ([]*ResourcesStorage, error) {
	// 通过 resource_type 查找资源
	const sql = `select storage_uuid, team_uuid, resource_type, resource_uuid, resource_domain, storage_url
	  from resources_storage where resource_type = ?` // and resource_domain=?`
	rs := []*ResourcesStorage{}
	err := db.Select(&rs, db.Rebind(sql), pr.Resource_type)
	return rs, err
}

func GetFileByLocation(db *sqlx.DB, team_uuid, resource_type, resource_uuid, resource_domain string) ([]*ResourcesStorage, error) {
	rl := dataModel.ResourceLocation{Team_uuid: team_uuid, Resource_type: resource_type,
		Resource_uuid: resource_uuid, Resource_domain: resource_domain}

	rs := ResourcesStorage{ResourceLocation: rl}
	return SelectResourcesStorageByLocation(db, &rs)
}

func SetFileUrlSave(db *sqlx.DB, team_uuid, resource_type, resource_uuid, resource_domain, fileurl string, radisClient *redis.Client) (err error) {

	var rs = &ResourcesStorage{}

	time_now := time.Now()
	rl := dataModel.ResourceLocation{Team_uuid: team_uuid, Resource_type: resource_type,
		Resource_uuid: resource_uuid, Resource_domain: resource_domain}

	rs.ResourceLocation = rl
	rs.Storage_url = fileurl
	rs.Create_time = &time_now
	rs.Update_time = &time_now
	retbool := ExistResourcesStorage(db, rs)
	if retbool {
		fmt.Println("ExistResourcesStorage is true")
		err = UpdateResourcesStorage(db, rs)
	} else {
		fmt.Println("ExistResourcesStorage is false")
		err = AddResourcesStorage(db, rs)
	}

	// 设置缓存
	if radisClient != nil {
		key := team_uuid + resource_type + resource_uuid + resource_domain
		rows, err := GetFileByLocation(db, team_uuid, resource_type, resource_uuid, resource_domain)
		if err == nil {
			retstr := dataModel.HttpRequestResultString(0, rows)
			err = httptools.SetKeyValue(radisClient, key, retstr, 0)
			if err != nil {
				fmt.Printf("SetKeyValue is error: %s \n", err.Error())
			}
		}
	}

	return
}

func GetFileList(rows []*ResourcesStorage) {

	rs := []ResourcesStorage{}
	for _, row := range rows {
		rs = append(rs, *row)
	}
}
