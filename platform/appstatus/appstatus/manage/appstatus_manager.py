# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json
import time

from time import sleep

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder
from appstatus.drive import k8s_driver


class AppStatusManager(object):

    def __init__(self):

        self.k8s_driver = k8s_driver.K8sDriver()

    def rc_status_update(self, rc_status_cache):

        rc_status_info = self.k8s_driver.rc_status_info()
        # log.debug('rc_status_list=%s' % (rc_status_list))
        status = rc_status_info['status']
        if status != 0:
            log.debug('Get pods status from k8s error')
            return rc_status_cache

        try:
            rc_status_info = json.loads(rc_status_info['result'])
            log.debug('rc_status_list_type=%s' % (type(rc_status_info)))
            rc_status_list = rc_status_info['items']
        except Exception, e:
            log.error('Get rc status list error, reason=%s' % (e))
            return rc_status_cache

        rc_status_new = {}

        for rc_info in rc_status_list:
            rc_name_info = rc_info['metadata']['annotations']['kubernetes.io/created-by']
            rc_name = json.loads(rc_name_info)['reference']['name']
            pod_name = rc_info['metadata']['name']
            pod_status = rc_info['status']['phase']

            # log.debug('rc_name=%s, pod_name=%s, status_result=%s'
            #           % (rc_name, pod_name, pod_status))

            if rc_name not in rc_status_new.keys():
                # log.debug('Cached %s' % (rc_name))
                rc_status_new[rc_name] = {
                                             "pods_info": [
                                                 {
                                                     pod_name: pod_status
                                                 }
                                             ]
                                         }
            else:
                rc_status_new[rc_name]['pods_info'].append(
                    {pod_name: pod_status})

        rc_off_list = dict.fromkeys([x for x in rc_status_cache if x not in rc_status_new]).keys()
        for rc_off_name in rc_off_list:
            self.k8s_driver.rc_status_update(rc_off_name, 'Stopping')
            del rc_status_cache[rc_off_name]

        for rc_name, rc_info in rc_status_new.items():
            pods_info = rc_info['pods_info']
            for pod_info in pods_info:
                # log.debug('pod_info=%s, type=%s'
                #           % (pod_info, type(pod_info)))
                pod_status = pod_info.values()[0]
                if pod_status == 'Running':
                    break
                else:
                    continue

            if (rc_name in rc_status_cache.keys()) and (pod_status == rc_status_cache[rc_name]):
                continue
            else:
                rc_status_cache[rc_name] = pod_status
                log.debug('Update rc(%s) status(%s)' % (rc_name, pod_status))
                self.k8s_driver.rc_status_update(rc_name, pod_status)

        return rc_status_cache
