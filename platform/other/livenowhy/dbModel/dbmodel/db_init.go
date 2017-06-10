package dbmodel

import (
	"github.com/livenowhy/dataModel"
	"github.com/jmoiron/sqlx"
	"fmt"
	"io/ioutil"
	yaml "gopkg.in/yaml.v2"
	"os"
)



func GetDbTx(dataSourceName string)(*sqlx.DB, error) {
	// 有配置文件的情况下，初始化

	db, err := sqlx.Connect("mysql", dataSourceName)
	if err != nil {
		fmt.Printf("sqlx.Connect is error: %s \n", err.Error())
		return nil, err
	}
	db.SetMaxOpenConns(200)
	db.SetMaxIdleConns(100)
	db.Ping()

	return db, err
}

// 加载配置文件数据
func LoadConfig(fileName string) (*dataModel.DbConfig, error) {

	fmt.Println(fileName)
	contents, err := ioutil.ReadFile(fileName)
	if err != nil {
		fmt.Printf("could not read %s: %s", fileName, err)
		return nil, err
	}

	c := &dataModel.DbConfig{}
	err = yaml.Unmarshal(contents, c)
	if err != nil {
		fmt.Printf("could not parse config: %s", err)
		return nil, err
	}
	fmt.Println(c.MysqlDebug.Host)
	fmt.Println(c.MysqlRelease.Host)
	return c, nil
}



func DbInit(config string, debug bool)(*sqlx.DB, error) {
	// 有配置文件的情况下，初始化
	c, err := LoadConfig(config)
	if err != nil {
		fmt.Printf("LoadConfig is error: %s \n", err.Error())
		os.Exit(-1)
	}

	var  dataSourceName string
	if debug {
		dataSourceName = c.MysqlDebug.User + ":" + c.MysqlDebug.Pawd + "@tcp(" + c.MysqlDebug.Host + ":" +
			c.MysqlDebug.Port + ")/" + c.MysqlDebug.Cydb + "?charset=" + c.MysqlDebug.Charset
	} else {
		dataSourceName = c.MysqlRelease.User + ":" + c.MysqlRelease.Pawd + "@tcp(" + c.MysqlRelease.Host + ":" +
			c.MysqlRelease.Port + ")/" + c.MysqlRelease.Cydb + "?charset=" + c.MysqlRelease.Charset
	}
	fmt.Printf("dataSourceName: %s \n", dataSourceName)

	return GetDbTx(dataSourceName)
}






