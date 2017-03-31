# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07
import rpcapi_define

from common.logs import logging as log
from common.code import request_result
from common.rpc_api import RpcAPI


class RabbitmqResponse(object):

    def __init__(self):

        self.rpc_api = RpcAPI()
        self.rpc_add_resource()

    def rpc_add_resource(self):

        self.rpcapi_define = rpcapi_define.KubernetesRpcAPI()

        self.rpc_api.add_resource('svc_cre', self.rpcapi_define.service_create)

        self.rpc_api.add_resource('svc_query', self.rpcapi_define.service_query)

        self.rpc_api.add_resource('svc_detail', self.rpcapi_define.service_detail)

        self.rpc_api.add_resource('svc_delete', self.rpcapi_define.service_delete)

        self.rpc_api.add_resource('svc_update', self.rpcapi_define.service_update)

        self.rpc_api.add_resource('pod_msg', self.rpcapi_define.pods_message)

        self.rpc_api.add_resource('name_check', self.rpcapi_define.check_name_if_use)

    def rpc_exec(self, rpc_body):

        try:
            return self.rpc_api.rpcapp_run(rpc_body)
        except Exception, e:
            log.error('RPC Server exec error: %s' % e)
            return request_result(599)
