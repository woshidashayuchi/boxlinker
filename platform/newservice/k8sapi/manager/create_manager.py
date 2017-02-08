# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

from db.service_db import ServiceDB
from driver.rpcapi_client import KubernetesRpcClient
from common.logs import logging as log
from common.code import request_result
# from common.parameters import rc_data


class CreateManager(object):

    def __init__(self):
        self.service_db = ServiceDB()
        self.krpc_client = KubernetesRpcClient()

    def check_name(self, context):

        try:
            using_name_info = self.service_db.name_if_used_check(context)
            if len(using_name_info) != 0:
                return False
        except Exception, e:
            log.error('Database select error when check the name..., reason=%s' % e)
            return 'error'

        return True

    def infix_db(self, context):
        try:
            infix = self.service_db.infix_db(context)
            log.info('the infix result is======%s,type is======%s' % (infix, type(infix)))
        except Exception, e:
            log.error('Database infix error when create the service..., reason=%s' % e)
            return 'error'

    def service_create(self, context):
        log.info('111111111++++++++')
        check_name = self.check_name(context)
        if check_name is False:
            return request_result(301)
        if check_name == 'error':
            return request_result(404)
        log.info('222222222++++++++')
        self.infix_db(context)

        return self.krpc_client.create_services(context)
