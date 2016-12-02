# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import ceph_rpcapi

from common.logs import logging as log
from common.code import request_result
from common.rpc_api import RpcAPI


class RabbitmqResponse(object):

    def __init__(self):

        self.rpc_api = RpcAPI()
        self.rpc_add_resource()

    def rpc_add_resource(self):

        self.ceph_rpcapi = ceph_rpcapi.CephRpcAPI()

        self.rpc_api.add_resource(
             'drv_ceh_dsk_gow', self.rpc_api.rbd_growfs)

    def rpc_exec(self, dict_data):

        try:
            response = self.rpc_api.rpcapp_run(dict_data)
            return response
        except Exception, e:
            log.error('RPC Server exec error: %s' % (e))
            return request_result(599)
