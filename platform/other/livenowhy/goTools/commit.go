package main

import (
	"github.com/livenowhy/goTools/util"
	//"path/filepath"
	"os"
	//"fmt"
	"fmt"
	"io"
	"strings"
	"errors"
)

var NoDefaultBranch  =  errors.New("no default")
var NothingToCommit  =  errors.New("nothing to commit, working tree clean")

func checkout_develop(projectpath string) {
	// 切换到develop分支
	os.Chdir(projectpath)
	util.ExecCommandOut("git", "checkout", "develop")
	commit_current_branch(projectpath)

}


func get_current_branch(projectpath string)  (string, error) {
	// 获取当前分支
	os.Chdir(projectpath)

	stderr, stdout, err := util.ExecCommandOut("git", "branch")
	if err != nil {
		fmt.Println(err.Error())
		fmt.Println(stderr.String())
		return "", err
	}
	for {
		line, err := stdout.ReadString('\n')  // 以'\n'为结束符读入一行
		if err != nil || io.EOF == err {
			break
		}

		line = strings.Replace(line, "\n", "", -1)

		//if strings.Contains(line, "*") {
		if "*" == string(line[0]) && len(line) >= 1{
			line = string(line[1:len(line)])
			line = strings.TrimSpace(line)
			fmt.Println("is defe")
			fmt.Println(line)
			return line, nil
		}
	}
	return "", NoDefaultBranch
}

func commit(branch, message string) (error){
	// 提交分支
	_, stdout, err := util.ExecCommandOut("git", "add", "-A")
	if err != nil {
		fmt.Printf("add -A is error: %s", err.Error())
		return err
	}

	fmt.Printf(stdout.String())

	//
	_, _, _ = util.ExecCommandOut("git", "commit", "-a", "-m", message)


	//if err != nil && strings.Contains(err.Error(), NothingToCommit.Error()){
	//	// nothing to commit, working tree clean
	//	fmt.Printf("commit is error: %s \n", stdout.String())
	//
	//	fmt.Println("---->1")
	//	return nil
	//} else if err != nil{
	//	fmt.Println("---->2")
	//	fmt.Printf("commit is error: %s \n", err.Error())
	//
	//	fmt.Printf("commit is error: %s \n", stdout.String())
	//	return err
	//}

	//fmt.Printf(stdout.String())

	_, stdout, err = util.ExecCommandOut("git", "push", "origin", branch)

	if err != nil {
		fmt.Printf("commit is error: %s", err.Error())
		return err
	}
	fmt.Printf(stdout.String())
	return nil

}


func commit_current_branch(projectpath string)  {
	// 提交当前分支
	branch, err := get_current_branch(projectpath)
	if err != nil{
		fmt.Printf("get_current_branch is error: %s", err.Error())
		return
	}
	fmt.Printf(branch)
	commit(branch, ".....")

}

var projectmap  = map[string]string{
	"Dockerfile": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/Dockerfile",
	"alipay": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/alipay",
	"dataModel": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/dataModel",
	"dbModel": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/dbModel",
	"github": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/github",
	"goStudy": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/goStudy",
	"goTools": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/goTools",
	"imgstorage": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/imgstorage",
	"oss-auth": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/oss-auth",
	"registryAuth": "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/registryAuth",
}

func merge_develop_to_master(projectpath string) {
	os.Chdir(projectpath)
	util.ExecCommandOut("git", "checkout", "master")
	util.ExecCommandOut("git", "merge", "develop")
	util.ExecCommandOut("git", "push", "origin", "master")
}


func main() {


	//commit_current_branch("/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/dataModel")

	for _, value := range projectmap {
		fmt.Println(value)
		commit_current_branch(value)  // 提交当前分支
		checkout_develop(value) // 切换到 develop 分支,提交
	}



	for _, value := range projectmap {
		merge_develop_to_master(value)  // 合并分支
	}



	//commit_current_branch("/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/alipay")
	//commit_current_branch("/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/goTools")

}
