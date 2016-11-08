# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json
import time

from time import sleep

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder
from monitor.drive import k8s_driver


class MonitorManager(object):

    def __init__(self):
        self.k8s_driver = k8s_driver.K8sDriver()

    def rc_status_update(self, rc_status_cache):

        rc_status_info = self.k8s_driver.rc_status_info()
        #log.debug('rc_status_list=%s' % (rc_status_list))
        status = rc_status_info['status']
        if status != 0:
            log.debug('Get pods status from k8s error')
            return rc_status_cache

        try:
            rc_status_info = json.loads(rc_status_info['result'])             
            log.debug('rc_status_list_type=%s' % (type(rc_status_info)))
            rc_status_list = rc_status_info['items']
        except Exception, e:
            log.error('get list error, reason=%s' % (e))
            return rc_status_cache

        for rc_info in rc_status_list:
            rc_name_info = rc_info['metadata']['annotations']['kubernetes.io/created-by']
            rc_name = json.loads(rc_name_info)['reference']['name']
            pod_name = rc_info['metadata']['name']
            pod_status = rc_info['status']['phase']
            
            # log.debug('rc_name=%s, pod_name=%s, status_result=%s' % (rc_name, pod_name, pod_status))

            if rc_name not in rc_status_cache.keys():
                log.debug('Cached %s' % (rc_name))
                rc_status_cache[rc_name] = {"rc_status": None, "pods_info": [{pod_name: pod_status}]}
            else:
                rc_status_cache[rc_name]['pods_info'].append({pod_name: pod_status})

        for rc_name, rc_info in rc_status_cache.items():
            rc_status = rc_info['rc_status']
            pods_info = rc_info['pods_info']
            for pod_info in pods_info:
                # log.debug('pod_info=%s, type=%s' % (pod_info, type(pod_info)))
                pod_status = pod_info.values()[0]
                if pod_status == 'Running':
                    break
                else:
                    continue

            if pod_status != rc_status:
                rc_status_cache[rc_name]['rc_status'] = pod_status
                log.debug('Update rc(%s) status(%s)' % (rc_name, pod_status))
                self.k8s_driver.rc_status_update(rc_name, pod_status)

            rc_status_cache[rc_name]['pods_info'] = []

        return rc_status_cache
