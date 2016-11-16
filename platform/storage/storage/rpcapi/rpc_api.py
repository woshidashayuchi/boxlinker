# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from common.logs import logging as log
from common.acl_auth import acl_check
from common.code import request_result
from common.rabbitmq_client import RabbitmqClient


class StorageRpcApi(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()
        self.queue = 'storage_api_call'
        self.timeout = 60

    @acl_check
    def disk_create(self, context, parameters=None):
        try:
            dict_data = {
                            "api": "stg_ceh_dsk_crt",
                            "context": context,
                            "parameters": parameters
                        }
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def disk_list(self, context, parameters=None):
        try:
            dict_data = {
                            "api": "stg_ceh_dsk_lst",
                            "context": context,
                            "parameters": parameters
                        }
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def disk_info(self, context, parameters=None):
        try:
            dict_data = {
                            "api": "stg_ceh_dsk_get",
                            "context": context,
                            "parameters": parameters
                        }
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def disk_resize(self, context, parameters=None):
        try:
            dict_data = {
                            "api": "stg_ceh_dsk_rsz",
                            "context": context,
                            "parameters": parameters
                        }
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def disk_delete(self, context, parameters=None):
        try:
            dict_data = {
                            "api": "stg_ceh_dsk_del",
                            "context": context,
                            "parameters": parameters
                        }
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)

    @acl_check
    def disk_status(self, context, parameters=None):
        try:
            dict_data = {
                            "api": "stg_ceh_dsk_sts",
                            "context": context,
                            "parameters": parameters
                        }
            json_data = json.dumps(dict_data)
            return json.loads(self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, json_data))
        except Exception, e:
            return request_result(598)
