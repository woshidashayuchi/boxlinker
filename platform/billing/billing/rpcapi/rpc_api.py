# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from common.logs import logging as log
from common.acl_auth import acl_check
from common.code import request_result
from common.rabbitmq_client import RabbitmqClient


class BillingRpcApi(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()
        self.queue = 'billing'
        self.timeout = 60

    @acl_check
    def resource_create(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_rss_rss_crt", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def resource_delete(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_rss_rss_del", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def resource_update(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_rss_rss_put", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def resource_get(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_rss_rss_get", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def voucher_create(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_voc_voc_crt", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def voucher_active(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_voc_voc_act", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def voucher_get(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_voc_voc_get", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def bill_get(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_bls_bls_get", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def balance_init(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_blc_blc_add", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def balance_update(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_blc_blc_put", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def balance_get(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_blc_blc_get", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def order_create(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_odr_odr_crt", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def order_update(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_odr_odr_put", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def order_get(self, context, parameters=None):
        try:
            dict_data = {"api": "bil_odr_odr_get", "context": context, "parameters": parameters}
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)
