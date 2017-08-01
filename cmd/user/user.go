package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/urfave/cli"
	"github.com/cabernety/boxlinker/controller/manager"
	"github.com/cabernety/boxlinker/controller/middleware/auth"
	api "github.com/cabernety/boxlinker/controller/api/v1/user"
)

var (
	flags = []cli.Flag{
		cli.BoolFlag{
			Name:   "debug, D",
			Usage:  "enable debug",
			EnvVar: "DEBUG",
		},
		cli.StringFlag{
			Name:   "listen, l",
			Value:  ":8080",
			Usage:  "server listen address",
			EnvVar: "LISTEN",
		},
	}
)

func main() {
	app := cli.NewApp()
	app.Name = "Boxlinker 用户服务"
	app.Usage = "Boxlinker 用户服务"
	app.Action = action
	app.Before = func(c *cli.Context) error {
		if c.Bool("debug") {
			log.SetLevel(log.DebugLevel)
		}
		return nil
	}
	app.Flags = flags
}

func action() {

	authRequired := auth.NewAuthRequired()

	controllerManager := manager.NewManager(manager.ManagerOptions{
		AuthRequired: authRequired,
	})

	if err := api.NewApi(api.ApiOptions{
		Manager: controllerManager,
	}); err != nil {
		log.Fatal(err)
	}

}
