package oauth

import (
	"fmt"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

func NewClient(access_token string) *github.Client {
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: access_token})
	tc := oauth2.NewClient(oauth2.NoContext, ts)

	return github.NewClient(tc)

}

func RepoList(access_token string) ([]*github.Repository, *github.Response, error) {
	client := NewClient(access_token)
	// list all repositories for the authenticated user
	//lo := github.ListOptions{Page:0, PerPage:30}
	//opt := github.RepositoryListOptions{ListOptions: lo}
	//opt := github.RepositoryListOptions{Type:"all"}

	//perPage := 100
	opt := github.RepositoryListOptions{}
	opt.Page = 0
	opt.PerPage = 200
	return client.Repositories.List("", &opt)


	//repo_ret := []*github.Repository{}
	//
	//for page := 0; ; page++ {
	//
	//	fmt.Printf("page: %d \n", page)
	//	opt.Page = page
	//	opt.PerPage = perPage
	//	repos, response, err := client.Repositories.List("", &opt)
	//	if err != nil {
	//		fmt.Printf("RepoList is error: %s \n", err.Error())
	//		for _, repo := range repos {
	//			repo_ret = append(repo_ret, repo)
	//		}
	//		return repo_ret, response, err
	//	}
	//
	//	for _, repo := range repos {
	//		repo_ret = append(repo_ret, repo)
	//	}
	//	if len(repos) < perPage {
	//		return repo_ret, response, err
	//	}
	//
	//}
}

func ListHooks(access_token, owner, repo string) ([]*github.Hook, *github.Response, error) {
	// 列出一个项目下的所有web hook
	client := NewClient(access_token)
	return client.Repositories.ListHooks(owner, repo, nil)
}

func DeleteHook(access_token, owner, repo string, id int) (*github.Response, error) {
	// 删除一条hook记录
	client := NewClient(access_token)
	return client.Repositories.DeleteHook(owner, repo, id)
}

func DelHooks(access_token, owner, repo, hookurl string) {
	// 删除满足条件的web hook
	hooks, _, err := ListHooks(access_token, owner, repo)
	if err != nil {
		fmt.Println("DelHooks is error")
		fmt.Println(err.Error())
	}

	for _, hook := range hooks {
		fmt.Println(hook.Config["url"].(string))
		fmt.Println(hookurl)
		if hook.Config["url"].(string) == hookurl {
			res, err := DeleteHook(access_token, owner, repo, *hook.ID)
			if err != nil {
				fmt.Printf("DeleteHook is error %s \n", *res)
			}
			fmt.Printf(" DeleteHook %s ", *res)
		}
	}
}

func CreateHook(access_token, owner, repo, hookurl, hooksecret string) (*int, *github.Response, error) {
	// 返回设置的hookid
	client := NewClient(access_token)
	events := []string{"push", "pull_request"}

	name := "web"
	action := true
	config := map[string]interface{}{
		"url":          hookurl,
		"content_type": "json",
		"secret":       hooksecret,
	}

	hook := github.Hook{
		Name:   &name,
		Events: events,
		Active: &action,
		Config: config,
	}
	//CreateHook creates a Hook for the specified repository.
	rethook, response, err := client.Repositories.CreateHook(owner, repo, &hook)
	if err != nil {
		fmt.Println("CreateHook is error")
		fmt.Println(err.Error())
		return nil, response, err
	}

	fmt.Printf("rethook --> %s", *rethook)
	return rethook.ID, response, err
}

func CreateKey(access_token, owner, repo string) (*int, *github.Response, error) {
	// 设置Deploy keys
	client := NewClient(access_token)
	deploy_key := "ssh-dss AAAAB3NzaC1kc3MAAACBAOUhHLL94c2Hgj6LWxYC8icObdXsTTIVRwTn1HsqTyFRcJYfHYvs2" +
		"JJJPNQCa0RpORFAe638ECXLh67aLyx6et9aMOVaZRTcOg9b8Xv/hRE1sx+7NC/s6tJK/hVxGEOm4srkFpzST77hcgtL6OyjRyXKyKz32m" +
		"qAITwv7tx8KXGhAAAAFQCfzcRxRE/2eKYpN40RLAGGEALmUQAAAIBTlKbCW4Vg+JQ8OHUFUF6C6BwkKIQDvmFz6QCAO8kBUpm/55Pc9lzRGM" +
		"jgXrESMKEZvrLFRDFFIyGd3JOUVxd/nVV28XVarrqiVg7P6HfvJLxRPUj4Db1qW6pU7kLb7Tjgw6sQ/aZwhySvcSKWX8BcmTPhXAbapcDNGTfF" +
		"Hbk5pwAAAIEAzzTyGBQOb5duo1ux/5wys0IriZfwAmcMrC2VNSJH4qWCwfw1a91q/EcXLRq9ycmnUx01WOxdo8/MTEvBOc+/bTRF+OhCThDbp8ptMI3EfUNpNV+kRUXcIq2WtS46xxOrc4MtCh2p74pN7yhPEdwkEZ2m4cz3ph4ZIriSJo5pRwc= root@fortress01"
	// CreateKey adds a deploy key for a repository.
	title := "boxlinker Deploy keys"

	readOnly := false

	key := github.Key{Title: &title, ReadOnly: &readOnly, Key: &deploy_key}
	// owner string, repo string, key *Key
	rethook, response, err := client.Repositories.CreateKey(owner, repo, &key)
	if err != nil {
		fmt.Println("CreateHook is error")
		fmt.Println(err.Error())
		return nil, response, err
	}

	fmt.Printf("rethook --> %s", *rethook)
	return rethook.ID, response, err
}
