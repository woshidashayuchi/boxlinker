package server

import (
	"github.com/livenowhy/dbModel/dbmodel"
	"github.com/livenowhy/dataModel"
	"github.com/jmoiron/sqlx"
	"fmt"
	"os"
	"github.com/livenowhy/goTools/httptools"
	"gopkg.in/redis.v5"
)

var SQLDB *sqlx.DB
var AliyunConfig *Config
var RadisClient *redis.Client
func init() {
	var err error
	SQLDB, err = dbmodel.DbInit(dataModel.MYSQL, dataModel.DEBUG)
	if err != nil {
		fmt.Printf("DbInit is error: %s \n", err.Error())
		os.Exit(-1)
	}

	AliyunConfig, err = LoadConfig(dataModel.ALIYUN)
	if err != nil {
		fmt.Printf("AliyunConfig is error: %s \n", err.Error())
		os.Exit(-1)
	}

	err, RadisClient = httptools.RedisNewClient("101.201.56.57:6379", "", 1)
	if err != nil {
		fmt.Printf("utile.RedisNewClient is error: %s \n", err.Error())
		os.Exit(-1)
	}
}