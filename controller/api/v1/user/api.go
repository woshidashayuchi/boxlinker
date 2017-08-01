package user

import (
	"net/http"

	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/cabernety/boxlinker/controller/manager"
)

type ApiOptions struct {
	Listen string
	Manager *manager.Manager
}

type Api struct {
	listen string
	manager *manager.Manager
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
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept", "token", "X-Requested-With"},
	})

	globalMux := http.NewServeMux()

	authRouter := mux.NewRouter()

	globalMux.Handle("/auth/", authRouter)

	s := &http.Server{
		Addr:    a.listen,
		Handler: context.ClearHandler(cs.Handler(globalMux)),
	}
	return s.ListenAndServe()
}
