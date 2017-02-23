# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from conf import conf
from common.logs import logging as log
from common.code import request_result
from common.parameters import rpc_data
from common.rabbitmq_client import RabbitmqClient


class CephRpcApi(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()
        self.queue = conf.ceph_call_queue
        self.exchange = conf.ceph_exchange_name
        self.timeout = 60

    def rbd_create(self, context, parameters=None):

        try:
            rpc_body = rpc_data("drv_ceh_dsk_crt", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def rbd_delete(self, context, parameters=None):

        try:
            rpc_body = rpc_data("drv_ceh_dsk_del", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def rbd_resize(self, context, parameters=None):

        try:
            rpc_body = rpc_data("drv_ceh_dsk_rsz", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def rbd_growfs(self, context, parameters=None):

        try:
            rpc_body = rpc_data("drv_ceh_dsk_gow", context, parameters)
            self.rbtmq.broadcast_client(
                 self.exchange_name, rpc_body)
            return request_result(0)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)
