#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
import json
from common.logs import logging as log
from common.code import request_result
from common.local_cache import LocalCache
from common.parameters import rpc_data
from common.rabbitmq_client import RabbitmqClient

caches = LocalCache(1000)


class PodStatusClient(object):

    def __init__(self):
        self.rbtmq = RabbitmqClient()
        self.queue = 'kubernetescall_api'
        self.timeout = 5

    def update_pod_status(self, context, parameters=None):
        try:
            rpc_body = rpc_data('pod_status', context, parameters)

            return self.rbtmq.rpc_cast_client(self.queue, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(403)
