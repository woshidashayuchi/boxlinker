package user

import (
	"github.com/urfave/cli"
	log "github.com/Sirupsen/logrus"
)

var (
	ADMIN_NAME string
	ADMIN_PASSWORD string
	ADMIN_EMAIL string
	TOKEN_KEY string

	REDIS_HOST string
	REDIS_PORT int
	REDIS_PASSWORD string
	REDIS_DB int

	USER_PASSWORD_SALT string
)

func paramRequired(key,name string) {
	if name == "" {
		log.Fatalf("param '%s' required!", key)
	}
}


func InitSettings(c *cli.Context){
	TOKEN_KEY = c.String("token-key")

	ADMIN_NAME = c.String("admin-name")
	paramRequired("admin-name", ADMIN_NAME)

	ADMIN_PASSWORD = c.String("admin-password")
	paramRequired("admin-password", ADMIN_PASSWORD)

	ADMIN_EMAIL = c.String("admin-email")
	paramRequired("admin-email", ADMIN_EMAIL)

	USER_PASSWORD_SALT = c.String("user-password-salt")
	paramRequired("user-password-salt", USER_PASSWORD_SALT)

	REDIS_HOST = c.String("redis-host")
	REDIS_PORT = c.Int("redis-port")
	REDIS_PASSWORD = c.String("redis-password")
	REDIS_DB = c.Int("redis-db")

}

