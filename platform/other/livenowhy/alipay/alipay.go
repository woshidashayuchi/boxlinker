package alipay

import (
	"crypto"
	"encoding/base64"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"

	"github.com/smartwalle/going/encoding"
	"fmt"
)

type AliPay struct {
	appId           string
	apiDomain       string
	partnerId       string
	publicKey       []byte
	privateKey      []byte
	AliPayPublicKey []byte
	client          *http.Client
}



func New(appId, partnerId string, publicKey, privateKey []byte, isProduction bool) (client *AliPay) {
	client = &AliPay{}
	client.appId = appId
	client.partnerId = partnerId
	client.privateKey = privateKey
	client.publicKey = publicKey
	client.client = http.DefaultClient
	if isProduction {
		client.apiDomain = K_ALI_PAY_PRODUCTION_API_URL
	} else {
		client.apiDomain = K_ALI_PAY_SANDBOX_API_URL
	}
	return client
}

func (this *AliPay) URLValues(param AliPayParam) url.Values {
	var p = url.Values{}
	p.Add("app_id", this.appId)
	p.Add("method", param.APIName())
	p.Add("format", K_FORMAT)
	p.Add("charset", K_CHARSET)
	p.Add("sign_type", K_SIGN_TYPE)
	p.Add("timestamp", time.Now().Format(K_TIME_FORMAT))
	p.Add("version", K_VERSION)

	if len(param.ExtJSONParamName()) > 0 {
		p.Add(param.ExtJSONParamName(), param.ExtJSONParamValue())
	}

	var ps = param.Params()
	if ps != nil {
		for key, value := range ps {
			p.Add(key, value)
		}
	}

	var keys = make([]string, 0, 0)
	for key, _ := range p {
		keys = append(keys, key)
	}

	sort.Strings(keys)
	p.Add("sign", sign_rsa2(keys, p, this.privateKey))

	return p
}

func (this *AliPay) doRequest(method string, param AliPayParam, results interface{}) (err error) {
	var buf io.Reader
	if param != nil {
		buf = strings.NewReader(this.URLValues(param).Encode())
	}

	fmt.Printf("this.URLValues(param): %s \n", this.URLValues(param))
	fmt.Printf("doRequest: %s \n", this.URLValues(param).Encode())
	fmt.Printf("doRequest: %v \n", this.URLValues(param).Encode())

	fmt.Printf("param.ExtJSONParamValue(): %s \n", param.ExtJSONParamValue())
	fmt.Printf("param.ExtJSONParamValue(): %s \n", param.ExtJSONParamName())


	req, err := http.NewRequest(method, this.apiDomain, buf)
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")

	fmt.Printf("req.URL: %s \n", req.URL)
	rep, err := this.client.Do(req)
	if err != nil {
		return err
	}
	defer rep.Body.Close()

	data, err := ioutil.ReadAll(rep.Body)
	if err != nil {
		return err
	}

	err = json.Unmarshal(data, results)
	if err != nil {
		return err
	}
	return err
}

func sign_rsa2(keys []string, param url.Values, privateKey []byte) (s string) {
	if param == nil {
		param = make(url.Values, 0)
	}

	var pList = make([]string, 0, 0)
	for _, key := range keys {
		var value = strings.TrimSpace(param.Get(key))
		if len(value) > 0 {
			pList = append(pList, key+"="+value)
		}
	}
	var src = strings.Join(pList, "&")
	var sig, err = encoding.SignPKCS1v15([]byte(src), privateKey, crypto.SHA256)
	if err != nil {
		return ""
	}
	s = base64.StdEncoding.EncodeToString(sig)
	return s
}

func sign_rsa(keys []string, param url.Values, privateKey []byte) (s string) {
	if param == nil {
		param = make(url.Values, 0)
	}

	var pList = make([]string, 0, 0)
	for _, key := range keys {
		var value = strings.TrimSpace(param.Get(key))
		if len(value) > 0 {
			pList = append(pList, key+"="+value)
		}
	}
	var src = strings.Join(pList, "&")
	var sig, err = encoding.SignPKCS1v15([]byte(src), privateKey, crypto.SHA1)
	if err != nil {
		return ""
	}
	s = base64.StdEncoding.EncodeToString(sig)
	return s
}

func verify_rsa2(req *http.Request, key []byte) (ok bool, err error) {
	sign, err := base64.StdEncoding.DecodeString(req.PostForm.Get("sign"))
	if err != nil {
		return false, err
	}

	var keys = make([]string, 0, 0)
	for key, value := range req.PostForm {
		if key == "sign" || key == "sign_type" {
			continue
		}
		if len(value) > 0 {
			keys = append(keys, key)
		}
	}

	sort.Strings(keys)

	var pList = make([]string, 0, 0)
	for _, key := range keys {
		var value = strings.TrimSpace(req.PostForm.Get(key))
		if len(value) > 0 {
			pList = append(pList, key+"="+value)
		}
	}
	var s = strings.Join(pList, "&")

	err = encoding.VerifyPKCS1v15([]byte(s), sign, key, crypto.SHA256)
	if err != nil {
		return false, err
	}
	return true, nil
}
