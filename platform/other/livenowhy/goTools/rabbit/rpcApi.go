package rabbit


import (
	"github.com/livenowhy/dataModel"
)

//  单个驱动服务程序
type AppResources interface {
	AppRun(context dataModel.ContextData, parameters map[string]interface{})(interface{})
}

type RpcAPI struct {
	AppRes map[string]AppResources  // 字典
}


// 添加一个函数
func (rc *RpcAPI) AddResource(api string, resource AppResources) {
	rc.AppRes[api] = resource
}

func (rc *RpcAPI) RpcAppRun(dictdata *dataModel.RpcData) (interface{}){
	api := dictdata.API
	context := dictdata.Context
	parameters := dictdata.Parameters
	// 添加解析失败  处理  return request_result(101)
	return rc.AppRes[api].AppRun(context, parameters)
}