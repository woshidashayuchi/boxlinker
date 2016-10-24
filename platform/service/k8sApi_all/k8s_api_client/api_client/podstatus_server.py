#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Wangxf <it-yanh@all-reach.com>

from time import sleep
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from common.rabbitmq_server import RabbitmqServer


def server_start():

    queue = 'pod_control'

    while True:
        try:
            rbtmq = RabbitmqServer(60)
            rbtmq.rpc_call_server(queue)
        except Exception, e:
            log.warning('RPC Server queue = %s running error, reason = %s'
                        % (queue, e))
        sleep(10)


if __name__ == "__main__":

    server_start()