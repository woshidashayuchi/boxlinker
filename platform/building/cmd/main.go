package main

import (
	"github.com/codegangsta/cli"
	log "github.com/Sirupsen/logrus"
	"os"
	"fmt"
)

var sharedFlags = []cli.Flag{
	cli.StringFlag{
		Name:	"queue",
		Value:	"memory://",
		Usage: 	"构建队列,默认内存队列",
		EnvVar: "QUEUE",
	},
	cli.StringFlag{
		Name: 	"logger-url",
		Value: 	"stdout://",
		Usage: 	"日志输入地址,默认 stdout",
		EnvVar: "LOGGER_URL",
	},
	cli.StringFlag{
		Name:   "url",
		Value:  "http://boxlinker.com",
		Usage:  "Canonical URL for this instance. Used when adding webhooks to repos.",
		EnvVar: "BASE_URL",
	},
	cli.StringFlag{
		Name:   "logger",
		Value:  "stdout://",
		Usage:  "The logger to use. Available options are `stdout://`, `s3://bucket` or `cloudwatch://`.",
		EnvVar: "LOGGER",
	},
	cli.StringFlag{
		Name: 	"db",
		Value: 	"postgres://postgres:postgres@127.0.0.1/postgres?sslmode=disable",
		Usage: 	"postgres 数据库地址",
		EnvVar: "DATABASE_URL",
	},
	cli.BoolFlag{
		Name: 	"debug, D",
		Usage: 	"debug mode",
	},

}

func main(){
	app := cli.NewApp()
	app.Name = "boxlinker image builder"
	app.Usage = "根据 Github 项目构建镜像"
	app.Action = mainAction
	app.Before = func(c *cli.Context) error {
		if c.GlobalBool("debug") {
			log.SetLevel(log.DebugLevel)
		}
		return nil
	}
	app.Flags = append(
		sharedFlags,
		append(amqpFlags,append(workerFlags,serverFlags...)...)...,
	)

	app.Commands = []cli.Command{
		cmdServer,
		cmdAmqp,
		cmdWorker,
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func mainAction(c *cli.Context){
	b := newBuilding(c)

	server := make(chan error)
	amqp := make(chan error)
	worker := make(chan error)

	go func(){
		server <- runServer(b, c)
	}()
	go func(){
		amqp <- runAmqp(b,c)
	}()

	go func(){
		worker <- runWorker(b, c)
	}()

	<-server
	<-amqp
	<-worker
}


func must(err error){
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}