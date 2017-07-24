# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/1 下午2:37

from common.logs import logging as log
import json
from common.logs import logging as log
from common.code import request_result
from common.local_cache import LocalCache
from common.parameters import rpc_data
from common.rabbitmq_client import RabbitmqClient

caches = LocalCache(1000)


class KubernetesRpc(object):
    def __init__(self):
        self.rbtmq = RabbitmqClient()
        self.queue = 'kubernetes_api'
        self.timeout = 5

    def delete_namespace(self, context, parameters=None):
        try:
            rpc_body = rpc_data('del_ns', context, parameters)

            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(503)
