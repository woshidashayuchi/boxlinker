# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/06

import time

from common.logs import logging as log
from common.code import request_result
from common.local_cache import LocalCache
from common.parameters import rpc_data
from common.rabbitmq_client import RabbitmqClient

caches = LocalCache(1000)


class KubernetesRpcClient(object):

    def __init__(self):
        self.rbtmq = RabbitmqClient()
        self.queue = 'kubernetescall_api'
        self.timeout = 8

    def create_services(self, context, parameters=None):
        try:
            rpc_body = rpc_data("svc_cre", context, parameters)

            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(501)

    def query_service(self, context, parameters=None):

        try:
            rpc_body = rpc_data("svc_query", context, parameters)

            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(404)

    def detail_service(self, context, parameters=None):

        try:
            rpc_body = rpc_data("svc_detail", context, parameters)

            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(404)

    def delete_service(self, context, parameters=None):

        try:
            rpc_body = rpc_data("svc_delete", context, parameters)

            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(503)

    def update_service(self, context, parameters=None):

        try:
            rpc_body = rpc_data('svc_update', context, parameters)

            return self.rbtmq.rpc_call_client(self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % e)
            return request_result(502)
