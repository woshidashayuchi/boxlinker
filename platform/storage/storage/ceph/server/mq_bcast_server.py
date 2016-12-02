#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from time import sleep

from common.logs import logging as log
from common.rabbitmq_server import RabbitmqServer


if __name__ == "__main__":

    exchange_name = 'storage_node'

    while True:
        try:
            rbtmq = RabbitmqServer(60)
            rbtmq.broadcast_server(exchange_name)
        except Exception, e:
            log.warning('RPC Server exchange_name = %s running error, reason=%s'
                        % (exchange_name, e))
        sleep(10)
