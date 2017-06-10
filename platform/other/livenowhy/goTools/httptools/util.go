package httptools

import (
	"sort"
	"strings"
	"fmt"
	"crypto/md5"
)

// SortAndConcat sort the map by key in ASCII order, and concat it in form of "k1=v1&k2=2"
// https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3
// 将集合 M 内非空参数值的参数按照参数名ASCII码从小到大排序(字典序),
// 使用URL键值对的格式( 即key1=value1&key2=value2...)拼接成字符串stringA
func SortAndConcat(param map[string]string) string {
	var keys []string
	for k := range param {
		keys = append(keys, k)
	}

	var sortedParam []string
	sort.Strings(keys)
	for _, k := range keys {
		// fmt.Println(k, "=", param[k])
		sortedParam = append(sortedParam, k+"="+param[k])
	}

	return strings.Join(sortedParam, "&")
}


// 特别注意以下重要规则:
// 1. 参数名ASCII码从小到大排序(字典序)
// 2. 如果参数的值为空不参与签名;
// 3. 参数名区分大小写;
// 4. 验证调用返回或微信主动通知签名时, 传送的sign参数不参与签名, 将生成的签名与该sign值作校验.
// 5. 微信接口可能增加字段,验证签名时必须支持增加的扩展字段

// Sign the parameter in form of map[string]string with app key.
// Empty string and "sign" key is excluded before sign.
// Please refer to http://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_3
func Sign(param map[string]string, key string) string {
	newMap := make(map[string]string)
	for k, v := range param {
		if k == "sign" {  // sign参数不参与签名
			continue
		}
		if v == "" {     // 如果参数的值为空不参与签名;
			continue
		}
		newMap[k] = v
	}

	preSignStr := SortAndConcat(newMap)
	preSignWithKey := preSignStr + "&key=" + key
	fmt.Printf("preSignStr: %s \n", preSignStr)
	fmt.Printf("preSignWithKey: %s \n", preSignWithKey)

	return fmt.Sprintf("%X", md5.Sum([]byte(preSignWithKey)))
}

