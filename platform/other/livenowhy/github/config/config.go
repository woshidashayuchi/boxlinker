package config

import (
	"fmt"
	"github.com/livenowhy/dataModel"
	"io/ioutil"

	"github.com/golang/glog"
	yaml "gopkg.in/yaml.v2"
	"github.com/livenowhy/dbModel/dbmodel"

	"github.com/jmoiron/sqlx"
)

type RabbitConfig struct {
	RabbitRelease *dataModel.RabbitSerivce `yaml:"rabbitRelease,omitempty"`
	RabbitDebug *dataModel.RabbitSerivce `yaml:"rabbitDebug,omitempty"`
}


func LoadConfig(fileName string) (*RabbitConfig, error) {

	glog.V(2).Infof("LoadConfig: %s", fileName)
	contents, err := ioutil.ReadFile(fileName)
	if err != nil {
		fmt.Printf("ReadFile is error: %s \n", err.Error())
		return nil, err
	}
	c := &RabbitConfig{}
	glog.V(2).Infof("LoadConfig: %s", contents)
	if err = yaml.Unmarshal(contents, c); err != nil {
		fmt.Printf("Unmarshal is error: %s \n", err.Error())
		return nil, err
	}

	fmt.Println(c.RabbitRelease.Queue)
	return c, nil
}

var RABBIT = &dataModel.RabbitSerivce{}

var DBMYSQL = &sqlx.DB{}
var WEBHOOKURL = "http://imageauth.boxlinker.com/api/v1.0/oauthclient/webhoo"

func init() {
	var err error
	c, err := LoadConfig(dataModel.RabbitConfig)
	if err != nil {
		fmt.Printf("Rabbit Config is error : %s \n", err.Error())
	}

	if dataModel.DEBUG {
		RABBIT = c.RabbitDebug
	} else {
		RABBIT = c.RabbitRelease
	}

	fmt.Println(RABBIT.Queue)

	DBMYSQL, err = dbmodel.DbInit(dataModel.MYSQL, dataModel.DEBUG)
}

