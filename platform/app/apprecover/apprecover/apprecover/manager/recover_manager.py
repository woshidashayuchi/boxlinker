# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/31 下午6:10

from common.logs import logging as log
from common.code import request_result
from driver.recover_driver import RecoverDriver


class RecoverManager(object):
    def __init__(self):
        self.recover_driver = RecoverDriver()

    def recover_manager(self):
        try:
            self.recover_driver.update_services()
        except Exception, e:
            log.error('recover error, reason is: %s' % e)

    def service_list(self, parameters):
        project_uuid = parameters.get('project_uuid')

        try:
            ret = self.recover_driver.get_recycle_services(project_uuid)
            return request_result(0, ret)
        except Exception, e:
            log.error('get the recover services error, reason is: %s' % e)
            raise Exception(e)