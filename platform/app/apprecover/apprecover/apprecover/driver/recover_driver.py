# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/31 下午6:10

from common.logs import logging as log
from db.service_db import ServiceDB
from rpcapi_client import KubernetesRpc
from common.db_operate import DbOperate
from common.code import request_result
from conf import conf
import requests
import json
import base64


class RecoverDriver(object):
    def __init__(self):
        self.recover_url = conf.recover_url
        self.billing_url = conf.BILLING_URL
        self.recover_login = conf.recover_login
        self.user = conf.user
        self.password = base64.decodestring(conf.password)
        self.service_db = ServiceDB()
        self.rpc_client = KubernetesRpc()
        self.operate = DbOperate()
        self.k8s_url = conf.k8s_api

    def login_get_token(self):
        try:
            login_json = {'user_name': self.user,
                          'password': self.password}

            login_ret = requests.post(self.recover_login, json.dumps(login_json), timeout=5).text
            log.info('login the system result is: %s' % login_ret)

            login_ret = json.loads(login_ret)
            if login_ret.get('status') == 0:
                return login_ret.get('result').get('user_token')
            else:
                raise Exception('login the system status is not zero')

        except Exception, e:
            log.error('login the system error, reason is: %s' % e)
            raise Exception('login the system error')

    def get_zero_teams_list(self):
        zero_teams_list = []
        try:
            header = {'token': self.login_get_token()}
        except Exception, e:
            log.error('login error, reason is: %s' % e)
            raise Exception('login the system error')

        try:
            zero_list = requests.get(self.recover_url, headers=header).text
            log.info('get the zero teams list result is: %s' % zero_list)

            zero_list = json.loads(zero_list)
            if zero_list.get('status') == 0:
                for i in zero_list.get('result').get('teams_list'):
                    zero_teams_list.append(i.get('team_uuid'))
            else:
                raise Exception("get the teams list's status is not 0")

        except Exception, e:
            log.error('get the teams list of zero money error, reason is: %s' % e)
            raise Exception('get the teams list of zero money error')

        return zero_teams_list

    def delete_billing(self, resource_uuid):
        try:
            header = {'token': self.login_get_token()}
        except Exception, e:
            log.error('login error, reason is: %s' % e)
            raise Exception('login the system error')

        try:
            url = self.billing_url + '/%s' % resource_uuid
            billing_ret = requests.delete(url, headers=header, timeout=5).text
            log.info('delete the billing url is: %s, result is: %s, type is: %s' % (url, billing_ret,
                                                                                    type(billing_ret)))
            billing_ret = json.loads(billing_ret)
            if int(billing_ret.get('status')) == 0:
                return True
        except Exception, e:
            log.error('delete the resource of billing error, reason is: %s' % e)
            raise Exception('delete the resource of billing error')

    def update_services(self):
        try:
            zero_teams_list = self.get_zero_teams_list()
        except Exception, e:
            log.error('get the teams list of zero money error, reason is: %s' % e)
            raise Exception('get the teams list of zero money error')

        try:
            db_ret = self.service_db.update_zero_services(zero_teams_list)
            if db_ret is not None:
                log.error('update the db error, ret is: %s' % db_ret)
                raise Exception('update the db error')
        except Exception, e:
            log.error('update the font_Service error, reason is: %s' % e)
            raise Exception('update the db error')

        try:
            db_get = self.service_db.get_zero_services(zero_teams_list)
            log.info('get the zero services result is: %s' % str(db_get))
        except Exception, e:
            log.error('select the font_Service error, reason is: %s' % e)
            raise Exception('select the db error')

        try:
            if len(db_get) == 0 or len(db_get[0]) == 0:
                return
            else:
                for i in db_get:
                    log.info(i)

                    del_json = {'namespace': i[1]}
                    result = self.rpc_client.delete_namespace(del_json)

                    log.info('delete the namespace result is: %s' % result)
                    if result.get('kind') != 'Namespace':
                        raise Exception('kubernetes resources delete error')

                    # resource_uuid = i[2]
                    # try:
                    #     billing_ret = self.delete_billing(resource_uuid)
                    #     if billing_ret is not True:
                    #         raise Exception('billing upate result is not 0')
                    # except Exception, e:
                    #     log.error('delete service billing error, reason is: %s' % e)
                    #     raise Exception('delete service billing error')
        except Exception, e:
            log.error('delete the namespace for k8s or billing error, reason is: %s' % e)
            raise Exception('delete ns or billing error')

    def get_recycle_services(self, project_uuid):
        list_recycle = []
        try:
            db_ret = self.service_db.recycle_svc_list(project_uuid)
            if len(db_ret) == 0 or len(db_ret[0]) == 0:
                return []
            else:
                for i in db_ret:
                    list_recycle.append({'service_name': i[0], 'ltime': self.operate.time_diff(i[1]),
                                         'service_uuid': i[2]})

                return list_recycle
        except Exception, e:
            log.error('get the recycle service list error, reason is: %s' % e)
            raise Exception('get the recycle service list error')

    def create_service(self, dict_data):
        header = {'token': dict_data.get('token')}
        try:
            ret = requests.post(self.k8s_url, headers=header, data=json.dumps(dict_data), timeout=5)
            log.info('use k8s api create the service result is: %s' % ret.text)
            ret = json.loads(ret.text)
        except Exception, e:
            log.error('create the service error, reason is: %s' % e)
            raise Exception('create the service error')

        if ret.get('status') != 0:
            raise Exception('create the service status is not 0')
        else:
            return ret

    def delete_py(self, services_uuid):
        try:
            ret = self.service_db.delete_physics(services_uuid)
            if ret is not None:
                raise Exception('physics delete error')
        except Exception, e:
            log.error('physics delete the service error, reason is: %s' % e)
            raise Exception('physics delete the service error')

        return request_result(0, 'delete success')
