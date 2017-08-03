package redis

import "github.com/go-redis/redis"

func NewClient(){
	redis.NewClient(&redis.Options{
		Addr: "",
		Password: "",
		DB: 0,
	})
}
