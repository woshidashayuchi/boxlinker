package server


import (
	"os"
	"github.com/livenowhy/oss-auth/aliyun"
	"strconv"
	"fmt"
	"errors"
)

type Config struct {
	AliyunKey aliyun.AliYunAccessKey   `yaml:"aliyunkey,omitempty"`
}

func GetEnv() (*Config, error){
	cf := &Config{}

	cf.AliyunKey.AccessKeyID = os.Getenv("ACCESSKEYID")
	cf.AliyunKey.AccessKeySecret = os.Getenv("ACCESSKEYSECRET")
	cf.AliyunKey.HostOuter = os.Getenv("HOSTOUTER")
	cf.AliyunKey.CallbackUrl = os.Getenv("CALLBACKURL")
	cf.AliyunKey.CheckToken = os.Getenv("CHECKTOKEN")
	cf.AliyunKey.UploadDir = os.Getenv("UPLOADDIR")

	it, rb := strconv.Atoi(os.Getenv("EXPIRETIME"))

	if cf.AliyunKey.CheckToken == "" {

		fmt.Println("cf.AliyunKey.CheckToken is error")
		fmt.Printf("cf.AliyunKey.AccessKeySecret: %s \n", cf.AliyunKey.AccessKeySecret)
		return nil, errors.New("env is error")
	}

	if (cf.AliyunKey.AccessKeyID == "" || cf.AliyunKey.AccessKeySecret == "" || cf.AliyunKey.HostOuter == "" ||
	cf.AliyunKey.CallbackUrl == "" || cf.AliyunKey.UploadDir == "" || cf.AliyunKey.CheckToken == "") {
		fmt.Println("GetEnv is error")
		return nil, errors.New("env is error")
	}

	if rb != nil {
		return nil, rb
	}
	cf.AliyunKey.ExpireTime = int64(it)
	return cf, nil
}