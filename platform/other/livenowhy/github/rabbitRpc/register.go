package rabbitRpc

import (
	"github.com/livenowhy/goTools/rabbit"
)


func RpcAddResource(re *rabbit.RpcAPI) {
	//re.AddResource("testone", TestOne)
	tx := Sd{"ffff"}

	cr := CodeRepoDefine{"sss"}  // 代码项目列表

	crhd := CodeRepoHookDefine{Name: "set_web_hook"}

	dos := DelOauthStatus{Name: "del_oauth_status"}

	// 0.0.0.0:9901/api/v1.0/imagerepo/test
	re.AddResource("testapi", tx)

	// /api/v1.0/oauthclient/repos/<string:src_type>
	re.AddResource("get_oauth_code_repo", cr)

	re.AddResource("set_web_hook", crhd)


	re.AddResource("del_oauth_status", dos)
}


