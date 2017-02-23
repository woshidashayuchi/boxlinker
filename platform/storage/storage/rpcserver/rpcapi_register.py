# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import rpcapi_define

from common.logs import logging as log
from common.code import request_result
from common.rpc_api import RpcAPI


class RabbitmqResponse(object):

    def __init__(self):

        self.rpc_api = RpcAPI()
        self.rpc_add_resource()

    def rpc_add_resource(self):

        self.rpcapi_define = rpcapi_define.StorageRpcManager()

        self.rpc_api.add_resource(
             'stg_ceh_dsk_crt', self.rpcapi_define.volume_create)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_lst', self.rpcapi_define.volume_list)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_inf', self.rpcapi_define.volume_info)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_rsz', self.rpcapi_define.volume_resize)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_del', self.rpcapi_define.volume_delete)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_sts', self.rpcapi_define.volume_update)

    def rpc_exec(self, rpc_body):

        try:
            return self.rpc_api.rpcapp_run(rpc_body)
        except Exception, e:
            log.error('RPC Server exec error: %s' % (e))
            return request_result(599)
