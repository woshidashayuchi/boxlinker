package api

import (
	"golang.org/x/net/context"
	"io"
	"net/http"
	"github.com/cabernety/boxlinker/platform/building"
	"github.com/remind101/conveyor/Godeps/_workspace/src/github.com/gorilla/mux"
)

type client interface {
	Logs(context.Context, string) (io.Reader, error)

}

type Server struct {
	client
	mux http.Handler
}

func NewServer(b *building.Building, auth func(http.Handler) http.Handler) *Server {
	return newServer(b, auth)
}

func newServer(c client, auth func(http.Handler) http.Handler) *Server {
	s := &Server{
		client: c,
	}

	//authFunc := func(h http.HandlerFunc) http.Handler {
	//	return auth(http.HandlerFunc(h))
	//}

	r := mux.NewRouter()

	s.mux = r

	return s
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request){
	s.mux.ServeHTTP(w,r)
}
