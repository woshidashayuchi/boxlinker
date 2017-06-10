package main

import (
	"fmt"
	"github.com/livenowhy/RabbitResponse/oauth"
)

func test_CreateHook() {
	hookid, re, err := oauth.CreateHook("66ceac5367614b9a1019f9d647d668002fa78795", "liuzhangpei",
		"harbor", "http://www.baidu.com", "ssdsdsds")

	if err != nil {
		fmt.Println(err.Error())
		fmt.Println(*re.Response)
	} else {
		fmt.Println(*hookid)
	}
}

func test_delHooks() {
	oauth.DelHooks("66ceac5367614b9a1019f9d647d668002fa78795", "liuzhangpei", "harbor", "http://www.baidu.com")

}

func test_CreateKey()  {
	oauth.CreateKey("66ceac5367614b9a1019f9d647d668002fa78795", "liuzhangpei", "SmartQQBot")
}

func test_DelOauthStatus()  {

}
func main() {
	//test_CreateKey()
	//test_delHooks()
	//test_DelOauthStatus()
	test_CreateHook()

}

// bb7393757c808b3933057af7eb3dd161fbc207d0
// cf690f4621869a9fc2ff0912c51d9c54d44f9dac

//oauth_access[description]:dddd
//oauth_access[scopes][]:repo
//oauth_access[scopes][]:user

//oauth_access[scopes][]:admin:org
//oauth_access[scopes][]:admin:public_key
//oauth_access[scopes][]:admin:repo_hook
//oauth_access[scopes][]:admin:org_hook
//oauth_access[scopes][]:gist
//oauth_access[scopes][]:notifications

//oauth_access[scopes][]:delete_repo
//oauth_access[scopes][]:admin:gpg_key
