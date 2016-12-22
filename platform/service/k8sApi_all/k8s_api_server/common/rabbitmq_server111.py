#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import sys
import pika

import rabbitmq_response

from time import sleep
from common.logs import logging as log
from common.single import Singleton


class RabbitmqServer(object):

    def mq_connect(self, mq_server01='192.168.1.16',
                   mq_server02='192.168.1.21',
                   heartbeat_time=30):
        log.debug('Connecting to rabbitmq server, server01=%s, server02=%s'
                  % (mq_server01, mq_server02))
        try:
            self.connection = pika.BlockingConnection(
                              pika.ConnectionParameters(
                                   host=mq_server01,
                                   heartbeat_interval=heartbeat_time))
            self.channel = self.connection.channel()
        except Exception, e:
            log.error('RabbitMQ server %s connection error: reason=%s'
                      % (mq_server01, e))
            try:
                self.connection = pika.BlockingConnection(
                                  pika.ConnectionParameters(
                                       host=mq_server02,
                                       heartbeat_interval=heartbeat_time))
                self.channel = self.connection.channel()
            except Exception, e:
                log.error('RabbitMQ server %s connection error: reason=%s'
                          % (mq_server02, e))
                raise

    def queue_declare(self, queue_name):
        self.channel.queue_declare(queue=queue_name)
        self.channel.queue_purge(queue=queue_name)

    def broadcast_queue_declare(self, exchange_name):
        self.channel.exchange_declare(exchange=exchange_name, type='fanout')
        result = self.channel.queue_declare(exclusive=True)
        queue_name = result.method.queue
        self.channel.queue_bind(exchange=exchange_name, queue=queue_name)

    def call_request(self, channel, method, props, body):
        response = self.rbtmq_response.rpc_exec(body)
        channel.basic_publish(exchange='',
                              routing_key=props.reply_to,
                              properties=pika.BasicProperties(
                                    correlation_id=props.correlation_id),
                              body=str(response))
        channel.basic_ack(delivery_tag=method.delivery_tag)

    def cast_request(self, channel, method, props, body):
        self.rbtmq_response.rpc_exec(body)
        channel.basic_ack(delivery_tag=method.delivery_tag)

    def broadcast_request(self, channel, method, props, body):
        self.rbtmq_response.rpc_exec(body)

    def msg_call_request(self, queue_name):
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(self.call_request, queue=queue_name, no_ack=False)

    def msg_cast_request(self, queue_name):
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(self.cast_request, queue=queue_name, no_ack=False)

    def msg_broadcast_request(self, exchange_name):
        self.channel.basic_consume(self.broadcast_request, queue=queue_name, no_ack=True)

    def server_run(self, qu_ex_name):
        try:
            self.channel.start_consuming()
        except BaseException, e:
            log.warning('RabbitMQ server %s exit, reason = %s'
                        % (qu_ex_name, e))
            self.channel.stop_consuming()
            self.connection.close()
            raise

    def __init__(self, heartbeat_time):
        self.mq_connect(heartbeat_time=heartbeat_time)

    def rpc_call_server(self, queue_name):
        try:
            self.queue_declare(queue_name)
            self.rbtmq_response = rabbitmq_response.RabbitmqResponse(
                                  queue_name)
            self.msg_call_request(queue_name)
            self.server_run(queue_name)
        except Exception, e:
            log.error('RabbitMQ call server run error: queue=%s, reason=%s'
                      % (queue_name, e))
            raise

    def rpc_cast_server(self, queue_name):
        try:
            self.queue_declare(queue_name)
            self.rbtmq_response = rabbitmq_response.RabbitmqResponse(
                                  queue_name)
            self.msg_cast_request(queue_name)
            self.server_run(queue_name)
        except Exception, e:
            log.error('RabbitMQ cast server run error: queue=%s, reason=%s'
                      % (queue_name, e))
            raise

    def broadcast_server(self, exchange_name):
        try:
            self.broadcast_queue_declare(exchange_name)
            self.rbtmq_response = rabbitmq_response.RabbitmqResponse(
                                  exchange_name)
            self.msg_broadcast_request(exchange_name)
            self.server_run(exchange_name)
        except Exception, e:
            log.error(
                'RabbitMQ broadcast server run error: exchange=%s, reason=%s'
                % (exchange_name, e))
            raise


if __name__ == "__main__":

    if (len(sys.argv) == 3):
        rpc_type = sys.argv[1]
        queue_name = sys.argv[2]

        rbtmq = RabbitmqServer(60)

        if rpc_type == 'call':
            rbtmq.rpc_call_server(queue_name)
            print 'RabbitMQ rpc_call_server queue %s run success' % (queue_name)
        elif rpc_type == 'cast':
            rbtmq.rpc_cast_server(queue_name)
            print 'RabbitMQ rpc_cast_server queue %s run success' % (queue_name)
        else:
            print '参数错误'

    else:
        print '参数错误'