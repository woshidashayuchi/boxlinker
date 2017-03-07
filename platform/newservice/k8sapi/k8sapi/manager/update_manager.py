# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/17

from common.logs import logging as log
from common.code import request_result
from db.service_db import ServiceDB
from driver.token_driver import TokenDriver
from driver.kubernetes_driver import KubernetesDriver
from driver.volume_driver import VolumeDriver


class UpdateManager(object):

    def __init__(self):
        self.kuber = KubernetesDriver()
        self.service_db = ServiceDB()
        self.token_driver = TokenDriver()
        self.volume = VolumeDriver()

    def service_update(self, context):
        log.info('the data(in) when update service....is: %s' % context)
        try:
            context = self.service_db.get_service_name(context)
        except Exception, e:
            log.error('get the service name error, reason=%s' % e)
            return request_result(404)

        try:
            team_name, project_name = self.token_driver.gain_team_name(context)
            if team_name is False:
                log.info('CREATE SERVICE ERROR WHEN GET THE PROJECT NAME FROM TOKEN...')
                return request_result(501)
        except Exception, e:
            log.error('get the team name, project name error, reason is: %s' % e)
            return request_result(502)
        context['team_name'] = team_name
        context['project_name'] = project_name

        try:
            result_old = self.kuber.update_volume_status(context)
            context['action'] = 'post'
            result_new = self.volume.storage_status(context)
            if result_old is False or result_new is False:
                return request_result(502)
        except Exception, e:
            log.error('update volume error, reason=%s' % e)
            return request_result(502)

        try:
            context = self.service_db.get_service_name(context)
        except Exception, e:
            log.error('get the service name error, reason=%s' % e)
            return request_result(404)

        ret = self.kuber.update_main(context)

        if ret is not True:
            return ret

        return request_result(0, 'service update successfully')

