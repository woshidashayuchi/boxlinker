package tokentools

// add lzp 加密相关

import (
	"crypto/md5"
	"encoding/hex"
	"math/rand"
	"time"
	"fmt"
	"golang.org/x/crypto/pbkdf2"
	"crypto/sha1"
	"encoding/base64"
)

// 生成32位MD5
func MD5(text string) string {
	ctx := md5.New()
	ctx.Write([]byte(text))
	return hex.EncodeToString(ctx.Sum(nil))
}

// return len=8  salt
func GetRandomSalt() string {
	return GetRandomString(8)
}

//生成随机字符串
func GetRandomString(lens int) string {
	str := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	bytes := []byte(str)
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < lens; i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}


func GetRandomStringNoNumber(lens int) string {
	//生成随机字符串,不含数字和大写字母
	str := "abcdefghijklmnopqrstuvwxyz"
	bytes := []byte(str)
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < lens; i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}

// Encrypt encrypts the content with salt
func Encrypt(content string, salt string) string {
	return fmt.Sprintf("%x", pbkdf2.Key([]byte(content), []byte(salt), 4096, 16, sha1.New))
}

// ReversibleEncrypt encrypts the str with base64
func ReversibleEncrypt(str string) string {
	return base64.StdEncoding.EncodeToString([]byte(str))
}

// ReversibleDecrypt decrypts the str with base64
func ReversibleDecrypt(str string) (string, error) {
	b, err := base64.StdEncoding.DecodeString(str)
	return string(b), err
}
