package nginx

import "k8s.io/kubernetes/pkg/api"

// ConfigmapEx holds an Ingress along with Secrets and Endpoints of the services
// that are referenced in this Configmap
type ConfigmapEx struct {
	Config    *api.ConfigMap
	Secrets   map[string]*api.Secret
	Endpoints map[string][]string
}
