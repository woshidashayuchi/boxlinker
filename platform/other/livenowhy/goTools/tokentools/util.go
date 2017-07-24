package tokentools

import (
	"strconv"
	"fmt"
	"crypto/md5"
	"time"
)

const ChinaTimeZoneOffset = 8 * 60 * 60  //Beijing(UTC+8:00)


// NewNonceString return random string in 32 characters  32位的随机字符串
func NewNonceString() string {
	nonce := strconv.FormatInt(time.Now().UnixNano(), 36)
	return fmt.Sprintf("%x", md5.Sum([]byte(nonce)))
}


// NewTimestampString return
func NewTimestampString() string {
	return fmt.Sprintf("%d", time.Now().Unix()+ChinaTimeZoneOffset)
}

