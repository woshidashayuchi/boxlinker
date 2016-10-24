#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from time import sleep

from common.logs import logging as log
from common.rabbitmq_server import RabbitMQ


def server_start():

    queue = 'center_control'

    while True:
        try:
            rbtmq = RabbitMQ(60)
            rbtmq.rpc_call_server(queue)
        except Exception, e:
            log.warning('RPC Server queue = %s running error, reason = %s'
                        % (queue, e))
        sleep(10)


if __name__ == "__main__":

    server_start()
