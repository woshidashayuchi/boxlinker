package server

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/livenowhy/dataModel"
	"github.com/livenowhy/dbModel/dbmodel"
	"github.com/livenowhy/goTools/httptools"
	"io/ioutil"
	"net/http"
	//"time"
	"io"
)

func SetFileUrlSave(w http.ResponseWriter, r *http.Request) {
	team_uuid, resource_type, resource_uuid, resource_domain := ParsePar(r)

	var fl dataModel.SetFileUrl
	result, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("ioutil.ReadAll is error reason: %s \n", err.Error())
		dataModel.HttpRequestResult(w, 702, err.Error())
		return
	}

	err = json.Unmarshal([]byte(result), &fl)

	if err != nil {
		fmt.Println(err.Error())
		dataModel.HttpRequestResult(w, 101, "json.Unmarshal is error")
		fmt.Println("json.Unmarshal is error")
		return
	}

	err = dbmodel.SetFileUrlSave(SQLDB, team_uuid, resource_type, resource_uuid, resource_domain, fl.FileUrl, RadisClient)
	if err != nil {
		fmt.Printf("SetFileUrlSave is error: %s \n", err.Error())
		dataModel.HttpRequestResult(w, 702, err.Error())
		return
	}

	dataModel.HttpRequestResult(w, 0, nil)
	return
}

func ParsePar(r *http.Request) (team_uuid, resource_type, resource_uuid, resource_domain string) {
	// 解析参数
	vars := mux.Vars(r)
	team_uuid = vars["team_uuid"]
	resource_type = vars["resource_type"]
	resource_uuid = vars["resource_uuid"]
	resource_domain = vars["resource_domain"]
	return

}

// /files/39828489-1bf6-334b-acdb-6a15bbd7c5a3s/UserAvatars/cabb719f-4a9a-475f-89f1-717231ae7eb5/39828489-1bf6-334b-acdb-6a15bbd7c5a3s
// {team_uuid}/{resource_type}/{resource_uuid}/{resource_domain}
func GetFileByLocation(w http.ResponseWriter, r *http.Request) {
	// 通过location或取资源列表, 唯一的资源(四个点位数据)
	SetCross(w)

	if r.Method == "POST" {
		SetFileUrlSave(w, r)

	} else if r.Method == "GET" { // 获取资源
		team_uuid, resource_type, resource_uuid, resource_domain := ParsePar(r)

		key := team_uuid + resource_type + resource_uuid + resource_domain
		val := httptools.GetValueIgnoreError(RadisClient, key)
		if val != "" {
			fmt.Printf("GetFileByLocation GetValueIgnoreError is ok \n")
			io.WriteString(w, val)
			return
		}
		rows, err := dbmodel.GetFileByLocation(SQLDB, team_uuid, resource_type, resource_uuid, resource_domain)
		if err != nil {
			fmt.Printf("GetFileByLocation is error: %s \n", err.Error())
			dataModel.HttpRequestResult(w, 103, err.Error())
		} else {
			retstr := dataModel.HttpRequestResultString(0, rows)
			err = httptools.SetKeyValue(RadisClient, key, retstr, 0)
			if err != nil {
				fmt.Printf("SetKeyValue is error: %s \n", err.Error())
			}
		}
		dataModel.HttpRequestResult(w, 0, rows)
	} else {
		dataModel.HttpRequestResult(w, 703, r.Method)
	}
	return
}

// {resource_type}/{resource_uuid}/{resource_domain}
// /files/UserAvatars/cabb719f-4a9a-475f-89f1-717231ae7eb5/39828489-1bf6-334b-acdb-6a15bbd7c5a3s
func GetFileByResource(w http.ResponseWriter, r *http.Request) {
	// 通过Resource获取资源列表, 资源信息(一类资源信息)
	SetCross(w)

	vars := mux.Vars(r)
	resource_type := vars["resource_type"]
	resource_uuid := vars["resource_uuid"]
	resource_domain := vars["resource_domain"]

	rl := dataModel.ResourceLocation{Resource_type: resource_type, Resource_uuid: resource_uuid, Resource_domain: resource_domain}
	rs := dbmodel.ResourcesStorage{ResourceLocation: rl}

	rows, err := dbmodel.SelectResourcesStorageByResource(SQLDB, &rs)
	if err != nil {
		fmt.Printf("SelectResourcesStorageByResource is error: %s \n", err.Error())
	}

	dataModel.HttpRequestResult(w, 0, rows)
	return
}

// 含有team_uuid
func GetFileByLocationList(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		return
	}

	//结构已知，解析到结构体
	result, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("ioutil.ReadAll is error reason: %s \n", err.Error())
		dataModel.HttpRequestResult(w, 702, err.Error())
		return
	}

	fmt.Printf("ioutil.ReadAll result: %s \n", string(result))
	var rq dataModel.ResourceQuery

	err = json.Unmarshal([]byte(result), &rq)

	if err != nil {
		fmt.Println(err.Error())
		dataModel.HttpRequestResult(w, 101, "json.Unmarshal is error")
		fmt.Println("json.Unmarshal is error")
		return
	}

	ret := []*dbmodel.ResourcesStorage{}

	for _, rl := range rq.QueryParameter {
		fmt.Printf(rl.Resource_domain)
		rs := dbmodel.ResourcesStorage{ResourceLocation: rl}
		rows, err := dbmodel.SelectResourcesStorageByLocation(SQLDB, &rs)
		if err != nil {
			fmt.Printf("SelectResourcesStorageByResource is error: %s \n", err.Error())
		} else {
			for _, row := range rows {
				ret = append(ret, row)
			}

		}

	}
	dataModel.HttpRequestResult(w, 0, ret)
	//dataModel.HttpRequestResult(w, 702, err.Error())
	return
}

// 不含team_uuid
func GetFileByResourceList(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		return
	}

	//结构已知，解析到结构体
	result, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("ioutil.ReadAll is error reason: %s \n", err.Error())
		dataModel.HttpRequestResult(w, 702, err.Error())
		return
	}

	fmt.Printf("ioutil.ReadAll result: %s \n", string(result))
	var rq dataModel.ResourceQuery

	err = json.Unmarshal([]byte(result), &rq)

	if err != nil {
		fmt.Println(err.Error())
		dataModel.HttpRequestResult(w, 101, "json.Unmarshal is error")
		fmt.Println("json.Unmarshal is error")
		return
	}

	ret := []*dbmodel.ResourcesStorage{}

	for _, rl := range rq.QueryParameter {
		fmt.Printf(rl.Resource_domain)
		rs := dbmodel.ResourcesStorage{ResourceLocation: rl}
		rows, err := dbmodel.SelectResourcesStorageByResource(SQLDB, &rs)
		if err != nil {
			fmt.Printf("SelectResourcesStorageByResource is error: %s \n", err.Error())
		} else {
			for _, row := range rows {
				ret = append(ret, row)
			}

		}

	}
	dataModel.HttpRequestResult(w, 0, ret)
	return
}
