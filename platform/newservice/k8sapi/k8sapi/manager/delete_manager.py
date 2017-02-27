# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/14

from common.logs import logging as log
from common.code import request_result
from db.service_db import ServiceDB
from driver.kubernetes_driver import KubernetesDriver


class DeleteManager(object):

    def __init__(self):
        self.service_db = ServiceDB()
        self.kuber = KubernetesDriver()

    def service_delete(self, context):
        log.info('the data(in) when delete service....is: %s' % context)

        try:
            context = self.service_db.get_service_name(context)
        except Exception, e:
            log.error('get the service name error, reason=%s' % e)
            return request_result(404)

        ret = self.kuber.delete_service(context)
        if ret is not True:
            return ret

        try:
            ret_database = self.service_db.delete_all(context)
            if ret_database is not None:
                return request_result(402)
        except Exception, e:
            log.error('database delete error, reason=%s' % e)
            return request_result(402)

        return request_result(0, 'service deleted successfully')
