package server




import (
	"net/http"
	"github.com/livenowhy/oss-auth/utils"
)


// 获取
func (cg *Config)ServerTest(w http.ResponseWriter, r *http.Request) {
	utils.ResponseError(w, "OK", "test is o00s")
	return
}


