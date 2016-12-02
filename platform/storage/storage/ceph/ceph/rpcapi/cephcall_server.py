#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

import cephcall_response

from time import sleep

from common.logs import logging as log
from common.rabbitmq_server import RabbitmqServer


def server_start():

    queue = 'ceph_call'

    while True:

        try:
            log.info('Starting Ceph RPC Call API Server, topic=%s'
                     % (queue))
            rbtmq = RabbitmqServer(60)
            rbtmq.rpc_call_server(queue, cephcall_response)
        except Exception, e:
            log.warning(
                'RPC Call API Server running error, queue=%s, reason=%s'
                % (queue, e))
        sleep(10)


if __name__ == "__main__":

    server_start()
