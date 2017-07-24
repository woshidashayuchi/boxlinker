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

        self.rpcapi_define = rpcapi_define.AlarmRpcAPI()

        self.rpc_api.add_resource('alarm_cre', self.rpcapi_define.alarm_create)

        self.rpc_api.add_resource('alarm_que', self.rpcapi_define.alarm_query)

        self.rpc_api.add_resource('alarm_update', self.rpcapi_define.alarm_update)

        self.rpc_api.add_resource('only_create_alarm', self.rpcapi_define.only_alarm_create)

        self.rpc_api.add_resource('only_list_alarm', self.rpcapi_define.only_alarm_query)

        self.rpc_api.add_resource('only_detail_alarm', self.rpcapi_define.only_detail_alarm)

        self.rpc_api.add_resource('only_update_alarm', self.rpcapi_define.only_update_alarm)

        self.rpc_api.add_resource('only_del_alarm', self.rpcapi_define.only_del_alarm)

        self.rpc_api.add_resource('del_service_alarm', self.rpcapi_define.alarm_svc_delete)

        self.rpc_api.add_resource('up_service_alarm', self.rpcapi_define.alarm_svc_update)

    def rpc_exec(self, rpc_body):

        try:
            return self.rpc_api.rpcapp_run(rpc_body)
        except Exception, e:
            log.error('RPC Server exec error: %s' % e)
            return request_result(599)
