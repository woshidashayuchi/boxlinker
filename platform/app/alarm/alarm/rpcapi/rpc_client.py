# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/14 上午11:16

from common.logs import logging as log
from common.code import request_result
from common.local_cache import LocalCache
from common.parameters import rpc_data
from common.rabbitmq_client import RabbitmqClient
from conf import conf


caches = LocalCache(1000)


class AlarmRpcClient(object):
    def __init__(self):
        self.rbtmq = RabbitmqClient()
        self.queue = conf.alarm_queue
        self.timeout = 8

    def create_alarm(self, context, parameters=None):
        try:
            rpc_body = rpc_data("alarm_cre", context, parameters)
            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(598)

    def query_alarm(self, context, parameters=None):
        try:
            rpc_body = rpc_data("alarm_que", context, parameters)
            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(598)
