package main

import (
	"log"
	"github.com/livenowhy/goTools/rabbit"
	"github.com/livenowhy/goTools/util"
	"github.com/livenowhy/github/rabbitRpc"
)

func main() {
	rb := rabbit.RabbitMQ{}
	msgs, err := rb.RpcRabbitMQ("", "")

	util.FailOnError(err, "Failed to register a consumer")

	forever := make(chan bool)


	for d := range msgs {
		go rabbitRpc.RunResponse(&rb, d)
		log.Printf("is ok")
	}

	//go func() {
	//	for d := range msgs {
	//		rb.RunResponse(d)
	//		common.FailOnError(err, "Failed to convert body to integer")
	//	}
	//}()


	log.Printf(" [*] Awaiting RPC requests")
	<-forever
}