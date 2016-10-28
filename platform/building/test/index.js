var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exc_name = 'boxlinker_building'

app.use(bodyParser.json())



var amqp = require('amqp');
var connection = amqp.createConnection({ host: 'boxlinker.com',port:30001 });

// add this for better debuging
connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', function () {
    // Use the default 'amq.topic' exchange
    console.info("amqp ready")
    var exc = connection.exchange(exc_name,{
        type: 'fanout',
        autoDelete: true,
        confirm: true
    }, function (exchange) {
        console.log('Exchange ' + exchange.name + ' is open');
    });
    connection.queue("",{authDelete:false},function(queue){
        console.log("queue name: ",queue.name);
        queue.bind(exc_name,queue.name,function(){
            console.log("queue bind ready");

            app.post('/push', function(req, res){
                console.log('github push webhook.');
                exc.publish(queue.name,req.body,function(){
                    console.log('exc send:',arguments);
                })
            });

            app.listen(3000,function(){
                console.info("Server listen on port: 3000")
            });


        })
    })
});