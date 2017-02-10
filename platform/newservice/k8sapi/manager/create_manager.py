# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/10

from db.service_db import ServiceDB
from driver.rpcapi_client import KubernetesRpcClient
from common.logs import logging as log
from common.code import request_result
from driver.token_driver import TokenDriver
from driver.kubernetes_driver import KubernetesDriver


class CreateManager(object):

    def __init__(self):
        self.service_db = ServiceDB()
        self.krpc_client = KubernetesRpcClient()
        self.token_driver = TokenDriver()
        self.kuber_driver = KubernetesDriver()

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
            log.info('the infix result is %s,type is %s' % (infix, type(infix)))
            if infix is not None:
                return False
        except Exception, e:
            log.error('Database infix error when create the service..., reason=%s' % e)
            return False

        return True

    def diff_infix_db(self, dict_data):
        try:
            rc_uuid = self.service_db.get_rc_uuid(dict_data)[0][0]
        except Exception, e:
            log.error('Database error when get the rc_uuid...,reason=%s' % e)
            return False

        container = dict_data.get('container')
        env = dict_data.get('env')
        volume = dict_data.get('volume')

        if container is not None and len(container) != 0:
            for i in container:
                i['rc_uuid'] = rc_uuid
                try:
                    infix = self.service_db.container_infix_db(i)
                except Exception, e:
                    log.error('Database error when infix the containers...,reason=%s' % e)
                    return False

                if infix is not None:
                    return False

        if env is not None and len(env) != 0:
            for j in env:
                j['rc_uuid'] = rc_uuid
                try:
                    infix_env = self.service_db.env_infix_db(j)
                except Exception, e:
                    log.error('Database error when infix the env...,reason=%s' % e)
                    return False

                if infix_env is not None:
                    return False

        if volume is not None and len(volume) != 0:
            for l in volume:
                l['rc_uuid'] = rc_uuid
                try:
                    infix_volume = self.service_db.volume_infix_db(l)
                except Exception, e:
                    log.error('Database error when infix the volume...,reason=%s' % e)
                    return False

                if infix_volume is not None:
                    return False

        return True

    def service_create(self, context):
        log.info('the create service data is: %s' % context)

        check_name = self.check_name(context)
        if check_name is False:
            return request_result(301)
        if check_name == 'error':
            return request_result(404)

        project_name = self.token_driver.gain_project_name(context)
        if project_name is False:
            return request_result(501)

        context.update({'project_name': project_name})
        infix = self.infix_db(context)

        domain = self.kuber_driver.container_domain(context)
        context.update({'container': domain})

        diff = self.diff_infix_db(context)

        if infix is False or diff is False:
            return request_result(401)

        add_rc = self.kuber_driver.add_rc(context)
        add_service = self.kuber_driver.add_service(context)
        if add_rc is False or add_service is False:
            return request_result(501)

        log.info('add_rc====%s,\\n,add_service=%s' % (add_rc, add_service))

        return self.krpc_client.create_services(context)
