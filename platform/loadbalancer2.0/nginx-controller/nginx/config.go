package nginx

// Config holds NGINX configuration parameters
type Config struct {
	LocationSnippets              []string
	ServerSnippets                []string
	ServerPort                    string
	ServerNamespace               string
	ServiceName                   string
	ServicePort                   string
	ServerTokens                  bool
	ProxyConnectTimeout           string
	ProxyReadTimeout              string
	ClientMaxBodySize             string
	HTTP2                         bool
	RedirectToHTTPS               bool
	MainHTTPSnippets              []string
	MainServerNamesHashBucketSize string
	MainServerNamesHashMaxSize    string
	MainLogFormat                 string
	ProxyBuffering                bool
	ProxyBuffers                  string
	ProxyBufferSize               string
	ProxyMaxTempFileSize          string
	ProxyProtocol                 bool
	ProxyHideHeaders              []string
	ProxyPassHeaders              []string
	HSTS                          bool
	HSTSMaxAge                    int64
	HSTSIncludeSubdomains         bool

	// http://nginx.org/en/docs/http/ngx_http_realip_module.html
	RealIPHeader    string
	SetRealIPFrom   []string
	RealIPRecursive bool

	// http://nginx.org/en/docs/http/ngx_http_ssl_module.html
	MainServerSSLProtocols           string
	MainServerSSLPreferServerCiphers bool
	MainServerSSLCiphers             string
	MainServerSSLDHParam             string
}

// NewDefaultConfig creates a Config with default values
func NewDefaultConfig() *Config {
	return &Config{
		ServerTokens:               true,
		ProxyConnectTimeout:        "600s",
		ProxyReadTimeout:           "600s",
		ClientMaxBodySize:          "1m",
		MainServerNamesHashMaxSize: "1024",
		ProxyBuffering:             true,
		HSTSMaxAge:                 2592000,
	}
}
