package acl

import (
	"fmt"
	"github.com/livenowhy/dbModel/dbmodel"
	"strings"
    "errors"
    "strconv"
	"github.com/coocood/freecache"
	"github.com/livenowhy/dataModel"
	"github.com/jmoiron/sqlx"
	"github.com/livenowhy/goTools/token"
)

var AclError = errors.New("AclError")

var cacheSize = 100 * 1024 * 1024
var CACHE = freecache.NewCache(cacheSize)

func RoleCheck(action, privilege string) int {
	fmt.Printf("RoleCheck--> action: %s, privilege: %s", action, privilege)

	defer func() int {
		if err := recover(); err != nil {
			fmt.Println("Role check error, reason=")
			return 1
		}
		return 1
	}()

	if "create" == action && strings.Contains(privilege, "C") {
		return 0
	} else if "delete" == action && strings.Contains(privilege, "D") {
		return 0
	} else if "update" == action && strings.Contains(privilege, "U") {
		return 0
	} else if "read" == action && strings.Contains(privilege, "R") {
		return 0
	} else {
		return 1
	}
}

func AuthManager(db *sqlx.DB, user_uuid, team_uuid, team_priv, project_uuid, project_priv, resource_uuid, action string) int{
	racl := &dbmodel.ResourcesAcl{Resource_uuid: resource_uuid}

	racl_ret, err := dbmodel.GetAclCheck(db, racl)

	if err != nil {
		fmt.Printf("AuthManager acl is error: %s \n", err.Error())
		return 1
	}

	// 用户权限
	if racl_ret.User_uuid == "global" || user_uuid == racl_ret.User_uuid {
		return 0
	}

	// 项目权限
	if RoleCheck(action, project_priv) == 0 {
		if racl_ret.Project_uuid == "global" || project_uuid == racl_ret.Project_uuid {
			return 0
		}
	}

	// 组织权限
	if RoleCheck(action, team_priv) == 0 {
		if racl_ret.Team_uuid == "global" || team_uuid == racl_ret.Team_uuid {
			return 0
		}
	}

	// 管理员
	if user_uuid == "sysadmin" {
		if racl_ret.Admin_uuid == "global" || user_uuid == racl_ret.Admin_uuid {
			return 0
		}
	}

	return 1
}

func AclCheck(db *sqlx.DB, context dataModel.ContextData, parameters map[string]interface{}) (bool, error) {
	defer func() interface{} {
		if err := recover(); err != nil {
			return false
		}
		return false
	}()


	token_str := context.Token
    resource_uuid := context.Resource_uuid
    action := context.Action

	retStruct, err := token.TokenAuthStruct(token_str)
	if err != nil {
        fmt.Println("TokenAuthStruct  is error")
        fmt.Println(err.Error())
		return false, err
	}

	user_uuid := retStruct.Result.User_uuid
	team_uuid := retStruct.Result.Team_uuid
	team_priv := retStruct.Result.Team_priv
	project_uuid := retStruct.Result.Project_uuid
	project_priv := retStruct.Result.Project_priv

	context_key := user_uuid + team_uuid + team_priv + project_uuid + project_priv

	aclinfo, err := CACHE.Get([]byte(context_key))

	if err == nil {

        fmt.Println("get cache is ok")
        aa := string(aclinfo)

        fmt.Println(aa)
        ii, err := strconv.Atoi(aa)
        if err == nil && 0 == ii{
            fmt.Println(ii)
            return true, err
        }
		return false, nil
	}
	fmt.Println(context_key)

    ret := AuthManager(db, user_uuid, team_uuid, team_priv, project_uuid, project_priv,
        resource_uuid, action)


    fmt.Println("AuthManager")
    fmt.Println(ret)


    retB := strconv.Itoa(ret)
    CACHE.Set([]byte(context_key), []byte(retB), 5 * 60)

    if ret == 0 {
        return true, nil
    }

	return false, nil
}