package email

import (
	"github.com/cabernety/boxlinker/controller/manager"
	"net/http"
	"github.com/gorilla/context"
	"github.com/rs/cors"
	log "github.com/Sirupsen/logrus"
)

type ApiOptions struct {
	Listen string
	Manager manager.Manager
}

type Api struct {
	listen string
	manager manager.Manager
}

func NewApi(config ApiOptions) *Api {
	return &Api{
		listen: config.Listen,
		manager: config.Manager,
	}
}

func (a *Api) Run() error {
	cs := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept", "token", "X-Requested-With", "X-Access-Token"},
	})
	globalMux := http.NewServeMux()



	s := &http.Server{
		Addr: a.listen,
		Handler: context.ClearHandler(cs.Handler(globalMux)),
	}
	log.Infof("Email Server listen on: %s", a.listen)
	return s.ListenAndServe()
}
