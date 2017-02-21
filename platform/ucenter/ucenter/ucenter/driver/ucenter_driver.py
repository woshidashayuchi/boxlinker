#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import json
import requests

from conf import conf
from common.logs import logging as log
from common.code import request_result
from common.parameters import context_data

from billing_rpcapi import BillingRpcApi

requests.adapters.DEFAULT_RETRIES = 5


class UcenterDriver(object):

    def __init__(self):

        self.email_api = conf.email_api
        self.verify_code_api = conf.verify_code_api
        self.billing_api = BillingRpcApi()

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

    def balance_init(self, token):

        context = context_data(token, "bil_blc_blc_add", "create")

        return self.billing_api.balance_init(context)