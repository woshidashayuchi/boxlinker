#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import requests

from common.logs import logging as log
from common.code import request_result

requests.adapters.DEFAULT_RETRIES = 5


class K8sDriver(object):

    def __init__(self):

        self.get_pod_status_url = os.environ.get('K8S_POD_API')
        self.rc_update_url = os.environ.get('K8S_UPDATE_API')

        with open(os.environ.get('TOKEN_PATH'), 'r') as f:
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

    def rc_status_update(self, rc_name, rc_status):

        try:
            body = '{"rc_name": "%s", "rc_status": "%s"}' \
                   % (rc_name, rc_status)
            r = requests.post(self.rc_update_url, data=body, timeout=5)
            log.debug('ret=%s, type=%s' % (r.json(), type(r.json())))
            status = r.json()['status']
            if status != 0:
                log.warning('Update rc(%s) status(%s) failure'
                            % (rc_name, rc_status))
            else:
                log.info('Update rc(%s) status(%s) success'
                         % (rc_name, rc_status))
        except Exception, e:
            log.error('Update rc status error, reason=%s' % (e))

        return
