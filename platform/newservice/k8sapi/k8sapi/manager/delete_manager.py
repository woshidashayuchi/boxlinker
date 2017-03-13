# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/14

from common.logs import logging as log
from common.code import request_result
from db.service_db import ServiceDB
from driver.kubernetes_driver import KubernetesDriver
from driver.billing_driver import BillingResource


class DeleteManager(object):

    def __init__(self):
        self.service_db = ServiceDB()
        self.kuber = KubernetesDriver()
        self.billing = BillingResource()

    def service_delete(self, context):
        log.info('the data(in) when delete service....is: %s' % context)

        try:
            context = self.service_db.get_service_name(context)
        except Exception, e:
            log.error('get the service name error, reason=%s' % e)
            return request_result(404)

        try:
            ret_volume = self.kuber.update_volume_status(context)
            if ret_volume is False:
                log.info('UPDATE THE VOLUME STATUS ERROR')
                return request_result(503)
        except Exception, e:
            log.error('update volume status error, reason is: %s' % e)
            return request_result(503)

        ret = self.kuber.delete_service(context)
        if ret is not True:
            return ret

        try:
            b_ret = self.billing.delete_billing(context)
            if not b_ret:
                log.error('update the billing resources error, result is: %s' % b_ret)
            log.info('delete billing success, result is: %s' % b_ret)
        except Exception, e:
            log.error('delete billing resource error, reason is: %s' % e)

        try:
            ret_database = self.service_db.delete_all(context)
            if ret_database is not None:
                return request_result(402)
        except Exception, e:
            log.error('database delete error, reason=%s' % e)
            return request_result(402)

        return request_result(0, 'service deleted successfully')
