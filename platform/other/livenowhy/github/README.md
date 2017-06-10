#### 消息队列

#### 消息队列启动

    docker run -itd -h rabbitmq -p 127.0.0.1:5672:5672 index.boxlinker.com/library/rabbitmq


http://www.rabbitmq.com/tutorials/tutorial-two-go.html



## 概念和特性

#### 1.交换机(exchange)
1. 接收消息,转发消息到绑定的队列。四种类型: direct, topic, headers and fanout
direct: 转发消息到routigKey指定的队列
topic:  按规则转发消息(最灵活)
headers: (这个还没有接触到)
fanout：转发消息到所有绑定队列
2. 如果没有队列绑定在交换机上，则发送到该交换机上的消息会丢失。
3. 一个交换机可以绑定多个队列，一个队列可以被多个交换机绑定。
4. topic类型交换器通过模式匹配分析消息的routing-key属性。它将routing-key和binding-key的字符串切分成单词。这些单词之间用点隔开。它同样也会识别两个通配符：#匹配0个或者多个单词，*匹配一个单词。例如，binding key：*.stock.#匹配routing key：usd.stcok和eur.stock.db，但是不匹配stock.nana。
还有一些其他的交换器类型，如header、failover、system等，现在在当前的RabbitMQ版本中均未实现。
5. 因为交换器是命名实体，声明一个已经存在的交换器，但是试图赋予不同类型是会导致错误。客户端需要删除这个已经存在的交换器，然后重新声明并且赋予新的类型。
6. 交换器的属性：
- 持久性：如果启用，交换器将会在server重启前都有效。
- 自动删除：如果启用，那么交换器将会在其绑定的队列都被删除掉之后自动删除掉自身。
- 惰性：如果没有声明交换器，那么在执行到使用的时候会导致异常，并不会主动声明。


####  2.队列(queue)

1. 队列是RabbitMQ内部对象,存储消息. 相同属性的queue可以重复定义。
2. 临时队列。channel.queueDeclare(),有时不需要指定队列的名字，并希望断开连接时删除队列。
3. 队列的属性:
- 持久性：如果启用，队列将会在server重启前都有效。
- 自动删除：如果启用，那么队列将会在所有的消费者停止使用之后自动删除掉自身。
- 惰性：如果没有声明队列，那么在执行到使用的时候会导致异常，并不会主动声明。
- 排他性：如果启用，队列只能被声明它的消费者使用。
这些性质可以用来创建例如排他和自删除的transient或者私有队列。
这种队列将会在所有链接到它的客户端断开连接之后被自动删除掉。
它们只是短暂地连接到server，但是可以用于实现例如RPC或者在AMQ上的对等通信。
4. RPC的使用是这样的：RPC客户端声明一个回复队列，唯一命名（例如用UUID），并且是自删除和排他的。
然后它发送请求给一些交换器，在消息的reply-to字段中包含了之前声明的回复队列的名字。
RPC服务器将会回答这些请求，使用消息的reply-to作为routing key（默认绑定器会绑定所有的队列到默认交换器，名称为“amp.交换器类型名”）发送到默认交换器。
注意这仅仅是惯例而已，可以根据和RPC服务器的约定，它可以解释消息的任何属性（甚至数据体）来决定回复给谁。



Direct Exchange：直接匹配，通过Exchange名称+RoutingKey来发送与接收消息;

Fanout Exchange：广播订阅，向所有消费者发布消息，但只有消费者将队列绑定到该路由才能收到消息，忽略RoutingKey；

Topic Exchange：主题匹配订阅，这里的主题指的是RoutingKey，RoutingKey可以采用通配符，如：*或#，RoutingKey命名采用.来分隔多个词，只有消费者将队列绑定到该路由且指定的RoutingKey符合匹配规则时才能收到消息；

Headers Exchange：消息头订阅，消息发布前，为消息定义一个或多个键值对的消息头，然后消费者接收消息时同样需要定义类似的键值对请求头，里面需要多包含一个匹配模式（有：x-mactch=all,或者x-mactch=any）,只有请求头与消息头相匹配，才能接收到消息，忽略RoutingKey；



####  blog

   http://blog.csdn.net/lmj623565791/article/details/37607165
   http://blog.csdn.net/column/details/rabbitmq.html