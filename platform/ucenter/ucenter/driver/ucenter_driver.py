#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import json
import requests

from conf import conf
from common.logs import logging as log
from common.rabbitmq_client import RabbitmqClient
from common.code import request_result

requests.adapters.DEFAULT_RETRIES = 5


class UcenterDriver(object):

    def __init__(self):

        self.rmq_client = RabbitmqClient()
        self.queue_name = 'ceph_call'
        self.exchange_name = 'ceph_bcast'
        self.timeout = 60
        self.email_api = conf.email_api
        self.verify_code_api = conf.verify_code_api

    def email_send(self, data):

        headers = {'content-type': "application/json"}
        body = json.JSONEncoder().encode(data)

        try:
            r = requests.post(self.email_api, headers=headers,
                              data=body, timeout=5)
            status = r.json()['status']
            log.debug('Email send request=%s, request_status=%s'
                      % (r, status))
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Email send error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def verify_code_check(self, code_id, code_str):

        verify_code_url = '%s/%s?code=%s' % (self.verify_code_api,
                                             code_id, code_str)
        try:
            r = requests.get(url=verify_code_url, timeout=5)
            status = r.json()['status']
            log.debug('Verify code check url=%s, request_status=%s'
                      % (verify_code_url, status))
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Verify code check error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def billing_create(self, token, volume_uuid, volume_name,
                       volume_conf, orga_uuid, user_uuid):

        headers = {'token': token}
        body = {
                   "resource_uuid": volume_uuid,
                   "resource_name": volume_name,
                   "resource_type": "volume",
                   "resource_conf": volume_conf,
                   "resource_status": "using",
                   "resource_orga": orga_uuid,
                   "resource_user": user_uuid
               }

        try:
            url = '%s/api/v1.0/billing/resources' % (self.billing_api)
            r = requests.post(url, headers=headers,
                              data=json.dumps(body), timeout=5)
            status = r.json()['status']
        except Exception, e:
            log.error('Billing resource create error: reason=%s' % (e))
            self.volume_delete(token, volume_uuid)
            return request_result(601)

        if int(status) != 0:
            log.error('Billing info create error, request_code not equal 0')
            self.volume_delete(token, volume_uuid)
            return request_result(601)

        return request_result(0)

    def billing_delete(self, token, volume_uuid):

        headers = {'token': token}
        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            r = requests.delete(url, headers=headers, timeout=5)
            status = r.json()['status']
        except Exception, e:
            log.error('Billing info delete error: reason=%s' % (e))

        if int(status) != 0:
            log.error('Billing info delete error, request_code not equal 0')
            return request_result(601)

        return request_result(0)

    def billing_update(self, token, volume_uuid,
                       volume_conf, user_uuid, orga_uuid):

        headers = {'token': token}
        body = {
                   "resource_conf": volume_conf,
                   "resource_status": "using",
                   "resource_orga": orga_uuid,
                   "resource_user": user_uuid
               }

        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            r = requests.put(url, headers=headers,
                             data=json.dumps(body), timeout=5)
            status = r.json()['status']
        except Exception, e:
            log.error('Billing info update error: reason=%s' % (e))
            return request_result(601)

        if int(status) != 0:
            log.error('Billing info update error, request_code not equal 0')
            return request_result(601)

        return request_result(0)
