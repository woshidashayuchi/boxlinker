#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import sys
import pika
import uuid

from time import sleep
from common.logs import logging as log
from common.single import Singleton


class RabbitmqClient(object):

    def mq_connect(self, mq_server01='rabbitmq01', mq_server02='rabbitmq01'):
        log.debug('Connecting to rabbitmq server, server01=%s, server02=%s'
                  % (mq_server01, mq_server02))

        try:
            self.connection = pika.BlockingConnection(
                              pika.ConnectionParameters(host=mq_server01))
            self.channel = self.connection.channel()
        except Exception, e:
            log.error('rabbitmq server %s connection error: reason=%s'
                      % (mq_server01, e))
            try:
                self.connection = pika.BlockingConnection(
                                  pika.ConnectionParameters(
                                       host=mq_server02))
                self.channel = self.connection.channel()
            except Exception, e:
                log.error('rabbitmq server %s connection error: reason=%s'
                          % (mq_server02, e))
                raise

    def mq_disconnect(self):
        log.debug('Disconnect from rabbitmq server')
        self.channel.close()
        self.connection.close()

    def on_response(self, channel, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def callback_queue(self):
        log.debug('Create callback queue')
        self.callback_queue = self.channel.queue_declare(
                              exclusive=True).method.queue
        self.channel.basic_consume(self.on_response, queue=self.callback_queue)

    def broad_exchange(self, exchange_name):
        self.channel.exchange_declare(
                     exchange=exchange_name,
                     exchange_type='fanout')

    def rpc_call(self, queue_name, json_data):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(exchange='',
                                   routing_key=queue_name,
                                   properties=pika.BasicProperties(
                                              reply_to=self.callback_queue,
                                              correlation_id=self.corr_id,
                                              ),
                                   body=str(json_data))

    def rpc_cast(self, queue_name, json_data):
        self.channel.basic_publish(exchange='',
                                   routing_key=queue_name,
                                   body=str(json_data))

    def broad_cast(self, exchange_name, json_data):
        self.channel.basic_publish(exchange=exchange_name,
                                   routing_key='',
                                   body=str(json_data))

    def get_response(self, timeout):
        cnt = 0
        while self.response is None:
            cnt += 1
            if cnt >= timeout:
                log.warning('RPC client exec time out, queue = %s'
                            % (queue_name))
                self.response = 'timeout'
                return
            self.connection.sleep(1)
            self.connection.process_data_events()

    def rpc_call_client(self, queue_name, timeout, json_data):
        try:
            self.mq_connect()
            self.callback_queue()
            self.rpc_call(queue_name, json_data)
            self.get_response(timeout)
            self.mq_disconnect()

            return self.response
        except Exception, e:
            log.error('RabbitMQ call client exec error: queue=%s, reason=%s'
                      % (queue_name, e))
            raise

    def rpc_cast_client(self, queue_name, json_data):
        try:
            self.mq_connect()
            self.rpc_cast(queue_name, json_data)
            self.mq_disconnect()
        except Exception, e:
            log.error('RabbitMQ cast client exec error: queue=%s, reason=%s'
                      % (queue_name, e))
            raise

    def broadcast_client(self, exchange_name, json_data):
        try:
            self.mq_connect()
            self.broad_exchange(exchange_name)
            self.broad_cast(exchange_name, json_data)
            self.mq_disconnect()
        except Exception, e:
            log.error(
                'RabbitMQ broadcast client exec error: exchange=%s, reason=%s'
                % (exchange_name, e))
            raise


if __name__ == "__main__":

    if (len(sys.argv) == 4):
        rpc_type = sys.argv[1]
        queue_name = sys.argv[2]
        json_data = sys.argv[3]

        rbtmq = RabbitmqClient()
        timeout = 60

        if rpc_type == 'call':
            result = rbtmq.rpc_call_client(queue_name, timeout, json_data)
            print result
        elif rpc_type == 'cast':
            rbtmq.rpc_cast_client(queue_name, json_data)
        else:
            print '参数错误'
    else:
        print '参数错误'
