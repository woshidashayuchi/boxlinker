# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/14

from db.metal_work import MetalWork
from db.service_db import ServiceDB
from common.logs import logging as log
from driver.kubernetes_driver import KubernetesDriver


class QueryManager(object):

    def __init__(self):
        self.metal_work = MetalWork()
        self.k_driver = KubernetesDriver()
        self.service_db = ServiceDB()

    def service_list(self, context):
        if context.get('service_name') is None:
            try:
                query_result = self.metal_work.query_service(context)
                log.info('the query service list result is:%s, type is %s' % (query_result, type(query_result)))

                return query_result
            except Exception, e:
                log.error('query the message of the service list error....reason = %s' % e)
                raise

        else:
            try:
                query_result = self.metal_work.query_only_service(context)
                log.info('the query service list(have service_name) result is:%s, type is %s' % (query_result,
                                                                                                 type(query_result)))

                return query_result
            except Exception, e:
                log.error('query the message of the service list error....reason = %s' % e)
                raise

    def service_detail(self, context):

        try:
            ret = self.metal_work.service_detail(context)
        except Exception, e:
            log.error('get the service detail message error, reason=%s' % e)
            raise

        return ret

    def pod_message(self, context):
        try:
            context = self.service_db.get_service_name(context)
        except Exception, e:
            log.error('get the service_name based on uuid error, reason=%s' % e)
            raise

        try:
            ret = self.k_driver.get_pod_name(context)
        except Exception, e:
            log.error('get the service detail message error, reason=%s' % e)
            raise

        return ret
