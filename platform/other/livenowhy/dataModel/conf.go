package dataModel

var DEBUG = false


var MYSQL, ALIYUN, RabbitConfig string
func init() {
	if DEBUG {
		MYSQL = "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/alioss/deploy/mysql/mysql.yml"
		ALIYUN = "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/alioss/deploy/aliyun/key.yml"
		RabbitConfig = "/Users/lzp/Desktop/WorkGo/src/github.com/livenowhy/alioss/deploy/rabbit/config.yml"

	} else {
		MYSQL = "/deploy/mysql/mysql.yml"
		ALIYUN  = "/deploy/aliyun/key.yml"
		RabbitConfig = "/deploy/rabbit/config.yml"
	}
}