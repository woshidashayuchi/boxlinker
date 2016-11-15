#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

from time import sleep

from common.logs import logging as log
from common.rabbitmq_server import RabbitmqServer


def server_start():

    queue = 'storage_api_call'

    while True:
        try:
            log.info('Starting RPC Server for storage, topic=%s' % (queue))
            rbtmq = RabbitmqServer(60)
            rbtmq.rpc_call_server(queue)
        except Exception, e:
            log.warning('RPC Server queue = %s running error, reason = %s'
                        % (queue, e))
        sleep(10)


if __name__ == "__main__":

    server_start()
