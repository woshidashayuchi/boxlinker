package rabbit

import (
	"github.com/livenowhy/goTools/util"
	"github.com/livenowhy/github/config"
	"github.com/streadway/amqp"
)


func (rs *RabbitMQ) QueueDeclare(queue_name string, purge bool)(err error){
	// 声明一个队列; purge 为true 时清空队列里的消息


	rs.Queue, err = rs.Channel.QueueDeclare(
		queue_name, // name
		false,         // durable, 不持久存储
		false,         // delete when usused
		false,         // exclusive
		false,         // no-wait
		nil,           // arguments
	)
	util.FailOnError(err, "Failed to declare a queue")
	if err != nil {
		return
	}
	if purge == true {
		_, err = rs.Channel.QueuePurge(queue_name, false)
		util.FailOnError(err, "Failed to purge a queue")
	}
	return
}

func (rs *RabbitMQ) SetQos() (err error){
	// 设置分发个数
	err = rs.Channel.Qos(
		1, // prefetchCount 预取数
		0, // prefetch Size
		false,
	)
	util.FailOnError(err, "Failed to qos a queue")
	return
}

func (rs *RabbitMQ) Consume(consumer string) (<-chan amqp.Delivery, error) {
	// 声明一个消费者, consumer 即可
	msgs, err := rs.Channel.Consume(
		rs.Queue.Name, // name
		consumer,      // consumer  ""
		false,         // auto-ack
		false,         // exclusive
		false,         // no-local
		false,         // no-wait
		nil,           // args
	)
	util.FailOnError(err, "Failed to register a consumer")
	return msgs, err
}

func (rs *RabbitMQ)RpcRabbitMQ(queue_name, consumer string) (<-chan amqp.Delivery, error) {
	// rpc
	rs.RabbitMQDial(config.RABBIT.Service)

	if queue_name == "" {
		rs.QueueDeclare(config.RABBIT.Queue, false)  // 声明队列
	} else {
		rs.QueueDeclare(queue_name, false)  // 声明队列
	}



	rs.SetQos()  // 设置分发个数
	msgs, err := rs.Consume(consumer)
	return msgs, err
}

func (rs *RabbitMQ) RpcSendPublish(exchange, key string, msg amqp.Publishing)  {
	err := rs.Channel.Publish(
		exchange,   // exchange
		key,        // routing key
		false,      // mandatory
		false,      // immediate
		msg,

	)
	util.FailOnError(err, "Failed to publish a message")
	// exchange, key string, mandatory, immediate bool, msg Publishing
}

func (rs *RabbitMQ) MakePublishingMsg(CorrelationId string, body []byte) (msg amqp.Publishing){
	msg = amqp.Publishing{
		//ContentType: "text/plain",
		ContentType: "application/json",
		CorrelationId: CorrelationId,
		Body: body,
	}
	return msg
}