#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import json
import requests

from conf import conf
from common.logs import logging as log
from common.code import request_result

from ceph_rpcapi import CephRpcApi

requests.adapters.DEFAULT_RETRIES = 5


class StorageDriver(object):

    def __init__(self):

        self.ceph_api = CephRpcApi()
        self.ucenter_api = conf.ucenter_api
        self.billing_api = conf.billing_api

    def disk_create(self, token, pool_name, disk_name, disk_size):

        context = {"token": token}

        disk_size = int(disk_size) * 1024
        parameters = {
                         "pool_name": pool_name,
                         "disk_name": disk_name,
                         "disk_size": disk_size
                     }

        return self.ceph_api.rbd_create(context, parameters)

    def disk_delete(self, token, pool_name, disk_name):

        context = {"token": token}

        parameters = {
                         "pool_name": pool_name,
                         "disk_name": disk_name
                     }

        return self.ceph_api.rbd_delete(context, parameters)

    def disk_resize(self, token, pool_name, disk_name, disk_size):

        context = {"token": token}

        disk_size = int(disk_size) * 1024
        parameters = {
                         "pool_name": pool_name,
                         "disk_name": disk_name,
                         "disk_size": disk_size
                     }

        return self.ceph_api.rbd_resize(context, parameters)

    def disk_growfs(self, token, image_name):

        context = {"token": token}

        parameters = {"image_name": image_name}

        return self.ceph_api.rbd_growfs(context, parameters)

    def billing_create(self, token, volume_uuid,
                       volume_name, volume_conf):

        try:
            url = '%s/api/v1.0/billing/resources' % (self.billing_api)
            headers = {'token': token}
            body = {
                       "resource_uuid": volume_uuid,
                       "resource_name": volume_name,
                       "resource_type": "volume",
                       "resource_conf": volume_conf,
                       "resource_status": "using"
                   }

            status = requests.post(url, headers=headers,
                                   data=json.dumps(body),
                                   timeout=5).json()['status']
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing resource create error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def billing_delete(self, token, volume_uuid):

        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            headers = {'token': token}

            status = requests.delete(url, headers=headers,
                                     timeout=5).json()['status']
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing info delete error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def billing_update(self, token, volume_uuid,
                       volume_conf=None, team_uuid=None,
                       project_uuid=None, user_uuid=None):

        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            headers = {'token': token}
            body = {
                       "resource_conf": volume_conf,
                       "resource_status": "using",
                       "team_uuid": team_uuid,
                       "project_uuid": project_uuid,
                       "user_uuid": user_uuid
                   }

            status = requests.put(url, headers=headers,
                                  data=json.dumps(body),
                                  timeout=5).json()['status']
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing info update error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def team_balance(self, token):

        try:
            url = '%s/api/v1.0/billing/balances' \
                  % (self.billing_api)
            headers = {'token': token}

            return requests.get(url, headers=headers,
                                timeout=5).json()
        except Exception, e:
            log.error('Billing get balance error: reason=%s' % (e))
            return request_result(601)

    def service_token(self):

        try:
            url = '%s/api/v1.0/ucenter/tokens' % (self.ucenter_api)
            body = {
                       "user_name": "service",
                       "password": "service@2017"
                   }

            return requests.post(url, data=json.dumps(body),
                                 timeout=5).json()
        except Exception, e:
            log.error('Get service token error: reason=%s' % (e))
            return request_result(601)

    def resources_check(self, add_list=[],
                        delete_list=[], update_list=[]):

        try:
            ret = self.service_token()
            if int(ret.get('status')) == 0:
                token = ret['result']['user_token']
            else:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Get service token error: reason=%s' % (e))
            return request_result(601)

        try:
            url = '%s/api/v1.0/billing/resources' \
                  % (self.billing_api)
            headers = {'token': token}
            body = {
                       "add_list": add_list,
                       "delete_list": delete_list,
                       "update_list": update_list
                   }

            status = requests.put(url, headers=headers,
                                  data=json.dumps(body),
                                  timeout=15).json()['status']
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing resources check error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def balances_check(self):

        try:
            ret = self.service_token()
            if int(ret.get('status')) == 0:
                token = ret['result']['user_token']
            else:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Get service token error: reason=%s' % (e))
            return request_result(601)

        try:
            url = '%s/api/v1.0/billing/balances?balance_check=true' \
                  % (self.billing_api)
            headers = {'token': token}
            log.debug('balances_check_url=%s, headers=%s' % (url, headers))

            return requests.get(url, headers=headers,
                                timeout=10).json()

            #if int(status) != 0:
            #    raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing balances check error: reason=%s' % (e))
            return request_result(601)
