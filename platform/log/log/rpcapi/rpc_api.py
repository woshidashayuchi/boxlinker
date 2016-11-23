# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from common.logs import logging as log
from common.acl_auth import acl_check
from common.code import request_result
from common.rabbitmq_client import RabbitmqClient


class LogRpcApi(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()
        self.queue = 'log_api_call'
        self.timeout = 60

    @acl_check
    def label_log(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "log_lab_log_get",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            return request_result(598)

    @acl_check
    def pod_log(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "log_pod_log_get",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            return request_result(598)

    @acl_check
    def pod_log_list(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "log_pol_log_lst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            return request_result(598)
