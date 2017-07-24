package rabbitRpc

import (
	"encoding/json"
	"github.com/streadway/amqp"
	"github.com/livenowhy/goTools/rabbit"
	"time"
	"github.com/livenowhy/dataModel"
)

func RunResponse(rs *rabbit.RabbitMQ, d amqp.Delivery)  {

	apRes := make(map[string]rabbit.AppResources)
	dd := rabbit.RpcAPI{
		AppRes: apRes,
	}
	RpcAddResource(&dd)

	rpcData := &dataModel.RpcData{}
	rpcdata := d.Body

	err := json.Unmarshal(rpcdata, &rpcData)
	if err != nil {
		panic("json.Unmarshal is error")
	}

	time.Sleep(time.Second)

	ret := RpcExec(&dd, rpcData)

	retbyte, err := json.Marshal(ret)

	msg := rs.MakePublishingMsg(d.CorrelationId, []byte(retbyte))
	rs.RpcSendPublish("", d.ReplyTo, msg)
	d.Ack(false)
}


func RpcExec(re *rabbit.RpcAPI, dict_data * dataModel.RpcData) (interface{}) {
	return re.RpcAppRun(dict_data)
}

