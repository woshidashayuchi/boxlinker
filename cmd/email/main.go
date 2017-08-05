package main

import (
	"github.com/urfave/cli"
	log "github.com/Sirupsen/logrus"
	"os"
	"github.com/cabernety/boxlinker/auth/builtin"
	"github.com/cabernety/boxlinker/controller/manager"
	api "github.com/cabernety/boxlinker/api/v1/email"
)

var flags = []cli.Flag{
	cli.StringFlag{
		Name: "listen, l",
		Value: ":8080",
		EnvVar: "LISTEN",
	},
	cli.StringFlag{
		Name: "token-auth-url",
		Value: "http://localhost:8080",
		EnvVar: "LISTEN",
	},

}

func main(){
	app := cli.NewApp()
	app.Name = "Boxlinker Email server"
	app.Before = func(c *cli.Context) error {
		log.SetLevel(log.DebugLevel)
		return nil
	}
	app.Action = action
	app.Flags = flags

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func action(c *cli.Context) error {

	authenticator := builtin.NewAuthenticator()

	controllerManager, err := manager.NewManager(manager.ManagerOptions{
		Authenticator:	authenticator,
		DBUser: 		c.String("db-user"),
		DBPassword: 	c.String("db-password"),
		DBHost: 		c.String("db-host"),
		DBPort: 		c.Int("db-port"),
		DBName: 		c.String("db-name"),
	})

	if err != nil {
		return err
	}

	return api.NewApi(api.ApiOptions{
		Listen: c.String("listen"),
		Manager: controllerManager,
	}).Run()


}


