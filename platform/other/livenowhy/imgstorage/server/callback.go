package server

import (
	"fmt"
	"github.com/livenowhy/goTools/aliyun"
	"github.com/livenowhy/dataModel"
	"github.com/livenowhy/dbModel/dbmodel"
	"net/http"
	//"github.com/julienschmidt/httprouter"
)

func Callback(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		return
	}

	bodystr, err := aliyun.AliCallback(w, r)

	if err != nil {
		dataModel.HttpRequestResult(w, 702, err.Error())
		return
	}

	actionT, err := NewCallbackActionType(bodystr)

	if err != nil {
		dataModel.HttpRequestResult(w, 702, err.Error())
		return
	}

	fmt.Println("Callback SetFileUrlSave")
	imageurl := AliyunConfig.AliyunKey.HostOuter + "/" + actionT.Filename

	//err = dbmodel.SetFileUrlSave(SQLDB, actionT.Resource_Location.Team_uuid,
	//	actionT.Resource_Location.Resource_type, actionT.Resource_Location.Resource_uuid,
	//	actionT.Resource_Location.Resource_domain, actionT.Filename, RadisClient)

	err = dbmodel.SetFileUrlSave(SQLDB, actionT.Resource_Location.Team_uuid,
	actionT.Resource_Location.Resource_type, actionT.Resource_Location.Resource_uuid,
	actionT.Resource_Location.Resource_domain, imageurl, RadisClient)

	if err != nil {
		fmt.Printf("Callback is error: %s \n", err.Error())
		dataModel.HttpRequestResult(w, 702, err.Error())
	}

	fmt.Println(imageurl)
	dataModel.HttpRequestResult(w, 0, imageurl)
	return
}
