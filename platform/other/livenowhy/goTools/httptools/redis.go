package httptools


import (
	"gopkg.in/redis.v5"
	"fmt"
	"time"
)

func RedisNewClient(addr, password string, db int) (error, *redis.Client) {
    //client := redis.NewClient(&redis.Options{
    //    Addr:     "101.201.56.57:6379",
    //    Password: "", // no password set
    //    DB:       0,  // use default DB
    //})
	client := redis.NewClient(&redis.Options{
		Addr: addr,
		Password: password,
		DB: db,
	})

    pong, err := client.Ping().Result()

	if err != nil {
		fmt.Printf("Ping is error: %s \n", err.Error())
		return err, nil
	}
    fmt.Println(pong, err)
    // Output: PONG <nil>
	return err, client
}

func SetKeyValue(client *redis.Client, key string,  value interface{},  expiration time.Duration) (error){
	return client.Set(key, value, expiration).Err()
}

func GetValue(client *redis.Client, key string) (string, error){
	return client.Get(key).Result()

}

func GetValueIgnoreError(client *redis.Client, key string) (string) {
	// 取一个值,忽略错误
	val, err := client.Get(key).Result()
	if err == redis.Nil {
		fmt.Printf("GetValueIgnoreError key does not exists")
		return ""
	} else if err != nil {
		fmt.Printf("GetValue is error: %s \n", err.Error())
		return ""
	} else {
		return val
	}
}


func ExampleClient() {
	err, client := RedisNewClient("101.201.56.57:6379", "", 1)
    err = client.Set("key", "value", 0).Err()
    if err != nil {
        panic(err)
    }

    val, err := client.Get("key").Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("key", val)

    val2, err := client.Get("key2").Result()
    if err == redis.Nil {
        fmt.Println("key2 does not exists")
    } else if err != nil {
        panic(err)
    } else {
        fmt.Println("key2", val2)
    }
}

