package nginx

import (
	"testing"
)

func TestTemplateIt(t *testing.T) {
	var nginx NginxController
	var config IngressNginxConfig
	nginx.AddOrUpdateIngress("test", config)
}
