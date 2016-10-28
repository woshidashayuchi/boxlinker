package api

import (
	"golang.org/x/net/context"
	"io"
	"net/http"
	"github.com/cabernety/boxlinker/platform/building"
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

	return s
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request){
	s.mux.ServeHTTP(w,r)
}
