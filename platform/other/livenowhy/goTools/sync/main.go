package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"strconv"
	"runtime"
	"os"

	"github.com/livenowhy/goTools/util"
)

var (
	DBhost = "101.201.53.211:3306" //IP地址
	DBuser = "root"                //用户名
	DBpwd  = "root123admin"        //密码
	DBTB   = "registry"            //表名
	CH     = "utf8"
)

type SyncConfig struct {
	MasterNode string            // 主节点
	UserName   string            // 用户名
	UserPwd    string            // 密码
	OthenNode  map[string]string // 直接点
}

//push列表
type PushList struct {
	SourceImage string            // 源镜像名
	TargetImage map[string]string // 目标镜像
}

// 创建pull任务
func (syc *SyncConfig) MakePushList(repo string) (pl *PushList, err error) {
	sourceRepo := syc.MasterNode + "/" + repo
	pushList := PushList{}
	pushList.SourceImage = sourceRepo
	pushList.TargetImage = map[string]string{}
	for k, v := range syc.OthenNode {
		targetRepo := v + "/" + repo
		pushList.TargetImage[k] = targetRepo
	}
	fmt.Println(pushList)
	return &pushList, nil
}



func PushImage(sourceImage, targetImage string) (err error) {

	// tag
	err = util.ExecCommand("docker", "tag", sourceImage, targetImage)

	if err != nil {
		return
	}

	// push
	err = util.ExecCommand("docker", "push", targetImage)
	if err != nil {
		return
	}

	// rmi
	err = util.ExecCommand("docker", "rmi", targetImage)
	if err != nil {
		return
	}

	return nil
}

// 打标签,并且推送镜像
func (pl *PushList) TagPushImage() (err error) {

	// docker tag
	for _, v := range pl.TargetImage {
		PushImage(pl.SourceImage, v)
	}
	return nil
}

// 同步一个镜像
func (syc *SyncConfig) PushOneImage(repo string) (err error) {
	pl, err := syc.MakePushList(repo)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// 获取 目标镜像
	err = util.ExecCommand("docker", "pull", pl.SourceImage)

	if err != nil {
		fmt.Println(err.Error())
		return
	}
	pl.TagPushImage()
	return nil
}

// 获取数据库中的信息记录
func GetDbRepo(c chan string) {
	defer close(c)
	db, err := sql.Open("mysql", DBuser+":"+DBpwd+"@tcp("+DBhost+")/"+DBTB+"?charset="+CH)
	if err != nil {
		fmt.Println(err.Error())
	}

	for i, j := 0, 100; ; i = i + j {

		sqlstr := "SELECT repository, tag FROM repository_events LIMIT " + strconv.Itoa(i) + ", 100"

		fmt.Println(sqlstr)

		rows, err := db.Query(sqlstr)
		if err != nil {
			fmt.Println(err.Error())
		}

		rows_num := 100
		for rows.Next() {

			rows_num = rows_num - 1

			var repository string
			var tag string

			err = rows.Scan(&repository, &tag)
			if err != nil {
				fmt.Println(err.Error())
			}

			repo := repository + ":" + tag
			c <- repo
		}

		if rows_num > 1 {
			return
		}
	}

}

func PushIamge(repo string) {
	syc := SyncConfig{
		MasterNode: "101.201.31.58",
		UserName:   "boxlinker",
		UserPwd:    "QAZwsx123",
		OthenNode:  map[string]string{"beijing01": "192.168.1.15"},
	}
	syc.PushOneImage(repo)
}

func GetChanPushImage(c chan string) {

	var v string
	ok := true

	for ok {
		if v, ok = <-c; ok {
			fmt.Println("GetChanPushImage v : " + v)
			PushIamge(v)
		}
	}

}

func main() {


	sqlss := DBuser+":"+DBpwd+"@tcp("+DBhost+")/"+DBTB+"?charset="+CH


	fmt.Println(sqlss)

	os.Exit(0)

	runtime.GOMAXPROCS(runtime.NumCPU())

	work_num := runtime.NumCPU()

	ch := make(chan string, 200)

	go GetDbRepo(ch)


	for i :=0; i < work_num; i++{
		go GetChanPushImage(ch)
	}

	sig := make(chan os.Signal,1)

	<-sig
}
