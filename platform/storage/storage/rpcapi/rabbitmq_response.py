# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import storage_rpcapi

from common.logs import logging as log
from common.code import request_result
from common.rpc_api import RpcAPI


class RabbitmqResponse(object):

    def __init__(self):

        self.rpc_api = RpcAPI()
        self.rpc_add_resource()

    def rpc_add_resource(self):

        self.storage_rpcapi = storage_rpcapi.StorageRpcAPI()

        self.rpc_api.add_resource(
             'stg_ceh_dsk_crt', self.storage_rpcapi.volume_create)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_del', self.storage_rpcapi.volume_delete)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_rsz', self.storage_rpcapi.volume_resize)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_get', self.storage_rpcapi.volume_info)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_lst', self.storage_rpcapi.volume_list)

        self.rpc_api.add_resource(
             'stg_ceh_dsk_sts', self.storage_rpcapi.volume_update)

    def rpc_exec(self, dict_data):

        try:
            response = self.rpc_api.rpcapp_run(dict_data)
            return response
        except Exception, e:
            log.error('RPC Server exec error: %s' % (e))
            return request_result(599)
