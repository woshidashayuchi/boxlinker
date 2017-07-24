package main

import (
	"github.com/livenowhy/RabbitResponse/db"
	"github.com/livenowhy/dataModel"
	"fmt"
)

func main() {
	fmt.Printf("sssss")

	rl := dataModel.ResourceLocation{Resource_uuid: "39828489-1bf6-334b-acdb-6a15bbd7c5a3",
	Resource_domain:"", Resource_type: "UserAvatars"}

	rs := &db.ResourcesStorage{Resource_Location:rl}

	rs.GetResourcesStorageByResourceMore()
}