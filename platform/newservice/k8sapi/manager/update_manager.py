# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/17

from common.logs import logging as log
from common.code import request_result
from driver.kubernetes_driver import KubernetesDriver


class UpdateManager(object):

    def __init__(self):
        self.kuber = KubernetesDriver()

    def service_update(self, context):
        log.info('the data(in) when update service....is: %s' % context)

        ret = self.kuber.update_main(context)

        if ret is not True:
            return ret

        return request_result(0, 'service update successfully')
