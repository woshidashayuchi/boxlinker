#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import requests

from common.logs import logging as log
from common.code import request_result
from conf import conf
from rpcapi_client_podstatus import PodStatusClient

requests.adapters.DEFAULT_RETRIES = 5


class K8sDriver(object):

    def __init__(self):

        self.get_pod_status_url = conf.K8S_POD_API
        self.krpc_client = PodStatusClient()

        with open(conf.TOKEN_PATH, 'r') as f:
            token = f.read()

        auth_info = "Bearer %s" % (token)
        self.headers = {"Authorization": auth_info}

    def rc_status_info(self, token=None):

        try:
            r = requests.get(self.get_pod_status_url,
                             headers=self.headers,
                             verify=False, timeout=5)
            # log.debug('rc_status=%s' % (r.text))
            return request_result(0, r.text)
        except Exception, e:
            log.error('requests k8s api error, reason=%s' % (e))
            return request_result(103)

    def rc_status_update(self, parameters):
        try:
            rc_up_ret = self.krpc_client.update_pod_status(parameters)
        except Exception, e:
            log.error('update the pod status error, reason is: %s' % e)
            return request_result(403)
        return rc_up_ret
