package rabbit

import (
	"log"
	"github.com/livenowhy/goTools/util"
	"github.com/streadway/amqp"
)

type RabbitMQ struct {
	Connection    *amqp.Connection
	Channel      *amqp.Channel
	Queue      amqp.Queue
}

func (rs *RabbitMQ) RabbitMQDial(url string) (err error){
	// 建立一个Connection(连接)和Channel(通道)
	rs.Connection, err = amqp.Dial(url)
	util.FailOnError(err, "Failed to connect to RabbitMQ")
	//defer rs.Conn.Close()  // 不能执行 close 操作, 一旦执行后续操作报错(channel/connection is not open)
	log.Println(url)
	if err != nil {
		return
	}

	rs.Channel, err = rs.Connection.Channel()
	util.FailOnError(err, "Failed to open a channel")
	return
}



//// 声明一个随机命名的队列
//func (rs *RabbitMQ) QueueDeclareExclusive() (amqp.Queue, error) {
//	// 声明一个队列; RabbitMQ 随机命名; exclusive=true 当Consumer关闭连接时,这个queue要被deleted
//	q, err := rs.Ch.QueueDeclare(
//		"",    // name
//		false, // durable
//		false, // delete when usused
//		true,  // exclusive  exclusive=true 当Consumer关闭连接时,这个queue要被deleted
//		false, // noWait
//		nil,   // arguments
//	)
//	return q, err
//}

//
//// 声明一个 fanout exchange 用于广播
//func (rs *RabbitMQ) FanoutExchangeDeclare(exchange_name string) error {
//	// name, kind string, durable, autoDelete, internal, noWait bool, args Table
//	err := rs.Channel.ExchangeDeclare(
//		exchange_name, // name
//		"fanout",      // type
//		false,         // durable, 不持续存储
//		false,         // autoDelete
//		false,         // internal
//		false,         // noWait
//		nil,           // arguments
//	)
//	common.FailOnError(err, "Failed to declare an exchange")
//	return err
//}