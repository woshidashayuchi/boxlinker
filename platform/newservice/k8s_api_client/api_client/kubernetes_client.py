#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.rabbitmq_client import RabbitmqClient


class KubernetesClient(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()

    def rpc_exec(self, json_data):

        queue = 'kubernetesss_control'

        return self.rbtmq.rpc_cast_client(queue, json_data)

    def rpc_name(self, json_data):

        queue = 'kuber_control'
        timeout = 20

        return self.rbtmq.rpc_call_client(queue, timeout, json_data)

    def notification(self, json_data):

        queue = 'boxlinker-notification'

        return self.rbtmq.rpc_cast_client(queue, json_data)

    def rpc_pod(self, json_data):

        timeout = 20
        queue = 'podstatus_control'

        return self.rbtmq.rpc_call_client(queue, timeout, json_data)
