# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json
import time

from time import sleep

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder
from appstatus.driver import k8s_driver


class AppStatusManager(object):

    def __init__(self):

        self.k8s_driver = k8s_driver.K8sDriver()

    def rc_status_update(self, rc_status_cache):

        rc_status_info = self.k8s_driver.rc_status_info()
        # log.debug('rc_status_list=%s' % (rc_status_list))
        status = rc_status_info['status']
        project_uuid = ''
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
            try:
                rc_name = rc_info['metadata']['labels']['component']
                project_uuid = rc_info['metadata']['namespace']
                pod_name = rc_info['metadata']['labels']['component']
                pod_status_info = rc_info['status'][
                                  'containerStatuses'][0]['state']
            except Exception, e:
                log.warning('Get rc info error, rc_info=%s, reason=%s'
                            % (rc_info, e))
                continue

            for k, v in pod_status_info.items():
                if k == 'waiting':
                    pod_status = v['reason']
                else:
                    pod_status = k

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

        rc_off_list = dict.fromkeys(
                      [x for x in rc_status_cache if x not in rc_status_new]
                      ).keys()
        for rc_off_name in rc_off_list:
            to_up = {'project_uuid': project_uuid, 'service_name': rc_off_name, 'service_status': 'Stopping'}
            self.k8s_driver.rc_status_update(to_up)
            del rc_status_cache[rc_off_name]
            log.info('Update rc(%s) status off' % (rc_off_name))

        for rc_name, rc_info in rc_status_new.items():
            pods_info = rc_info['pods_info']
            for pod_info in pods_info:
                # log.debug('pod_info=%s, type=%s'
                #           % (pod_info, type(pod_info)))
                pod_status = pod_info.values()[0]
                if pod_status == 'running':
                    break
                else:
                    continue

            if (rc_name in rc_status_cache.keys()) \
                    and (pod_status == rc_status_cache[rc_name]):
                continue
            else:
                rc_status_cache[rc_name] = pod_status
                log.info('Update rc(%s) status(%s)' % (rc_name, pod_status))
                to_up = {'project_uuid': project_uuid, 'service_name': rc_name, 'service_status': pod_status}
                self.k8s_driver.rc_status_update(to_up)

        return rc_status_cache
