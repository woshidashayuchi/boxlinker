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
}

