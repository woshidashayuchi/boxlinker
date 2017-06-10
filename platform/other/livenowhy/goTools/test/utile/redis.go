package main

import (
	"github.com/livenowhy/goTools/utile"
	"fmt"
	//"gopkg.in/redis.v5"
)

func main() {
	err, client := utile.RedisNewClient("101.201.56.57:6379", "", 1)
    err = client.Set("key", "value-sd-sd-s-ds-d-s-d-sd-s-ds-d-s-d-sd-s", 0).Err()
    if err != nil {
        panic(err)
    }

	err = client.Set("key", "value-sds-d-s-d-sd-s-ds-d-s-d-sd-s", 0).Err()
    if err != nil {
        panic(err)
    }


	val2 := utile.GetValueIgnoreError(client, "key")
	if val2 != "" {
		fmt.Printf(val2)

	}

}
