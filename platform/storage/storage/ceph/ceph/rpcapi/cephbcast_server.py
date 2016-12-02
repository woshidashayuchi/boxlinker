#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

import cephbcast_response

from time import sleep

from common.logs import logging as log
from common.rabbitmq_server import RabbitmqServer


def server_start():

    exchange_name = 'ceph_bcast'

    while True:

        try:
            log.info('Starting Ceph RPC Bcast API Server, exchange=%s'
                     % (exchange_name))
            rbtmq = RabbitmqServer(60)
            rbtmq.broadcast_server(exchange_name, cephbcast_response)
        except Exception, e:
            log.warning(
                'RPC Bcast API Server running error, exchange=%s, reason=%s'
                % (exchange_name, e))
        sleep(10)


if __name__ == "__main__":

    server_start()
