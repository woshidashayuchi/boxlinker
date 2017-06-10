package server

import (
	"fmt"
	"io/ioutil"
	yaml "gopkg.in/yaml.v2"
	"github.com/golang/glog"
	"github.com/livenowhy/goTools/aliyun"
)


type Config struct {
	AliyunKey aliyun.AliYunAccessKey   `yaml:"aliyunkey,omitempty"`
	AliyunOss aliyun.AliYunOssConf   `yaml:"oss,omitempty"`
}



// 加载配置文件数据,
func LoadConfig(fileName string) (*Config, error) {
	fmt.Println(fileName)
	contents, err := ioutil.ReadFile(fileName)
	if err != nil {
		fmt.Printf("ReadFile is error: %s \n", err.Error())
		return nil, fmt.Errorf("could not read %s: %s", fileName, err)
	}

	c := &Config{}
	glog.V(2).Infof("LoadConfig: %s", contents)
	if err = yaml.Unmarshal(contents, c); err != nil {
		fmt.Printf("Unmarshal is error: %s \n", err.Error())
		return nil, fmt.Errorf("could not parse config: %s", err)
	}

	return c, nil
}

