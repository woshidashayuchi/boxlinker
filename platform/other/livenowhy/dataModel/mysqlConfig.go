package dataModel

type DbConfig struct {
	MysqlDebug MysqlConfig `yaml:"mysqDebug,omitempty"`
	MysqlRelease MysqlConfig `yaml:"mysqRelease,omitempty"`
}

// 数据库配置
type MysqlConfig struct {
	Host    string `yaml:"host,omitempty"`
	Port    string `yaml:"port,omitempty"`
	Charset string `yaml:"charset,omitempty"`
	User    string `yaml:"user,omitempty"`
	Pawd    string `yaml:"pawd,omitempty"`
	Cydb    string `yaml:"cydb,omitempty"`
}