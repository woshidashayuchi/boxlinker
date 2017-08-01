package manager

import (
	"github.com/cabernety/boxlinker/controller/middleware/auth"
)

type Manager struct {
	authRequired *auth.AuthRequired
}

type ManagerOptions struct {
	AuthRequired *auth.AuthRequired
}

func NewManager(config ManagerOptions) *Manager {
	return &Manager{
		authRequired: config.AuthRequired,
	}
}
