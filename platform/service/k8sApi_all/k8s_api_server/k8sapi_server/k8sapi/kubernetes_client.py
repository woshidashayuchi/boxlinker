#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Wangxiaof

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.rabbitmq_client import RabbitmqClient


class KubernetesClient(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()

    def rpc_exec(self, json_data):

        queue = 'pod_control'
        timeout = 10

        return self.rbtmq.rpc_call_client(queue, timeout, json_data)

    def notification(self, json_data):

        queue = 'boxlinker-notification'

        return self.rbtmq.rpc_cast_client(queue, json_data)


if __name__ == "__main__":

    if (len(sys.argv) == 2):
        center_client = KubernetesClient()
        json_data = sys.argv[1]
        result = center_client.rpc_exec(json_data)
        print result,
    else:
        print '参数错误'

