# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json
import time

from time import sleep

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from events.db.service_db import ServiceDB
from events.driver.status_driver import K8sDriver
from events.driver.es_driver.to_es import post_es


class AppStatusManager(object):

    def __init__(self):
        self.service_db = ServiceDB()
        self.k8s_driver = K8sDriver()

    def app_events_es(self, events_cache):

        rc_status_info = self.k8s_driver.rc_status_info()
        status = rc_status_info['status']
        if status != 0:
            log.debug('Get pods status from k8s error')
            return events_cache

        try:
            rc_status_info = json.loads(rc_status_info['result'])
            rc_status_list = rc_status_info['items']
        except Exception, e:
            log.error('Get rc status list error, reason=%s' % (e))
            return events_cache

        events_new = {}
        for rc_info in rc_status_list:
            try:
                project_uuid = rc_info.get('metadata').get('namespace')
                log.info('namespace length is: %d' % len(project_uuid))
                if len(project_uuid) < 30:
                    continue
                rc_name1 = rc_info['metadata']['labels'].get('component')
                log.info('in the kubernetes users resources, the name is: %s, namespace is: %s' % (rc_name1,
                                                                                                   project_uuid))
                rc_name = rc_name1 + '#' + project_uuid
                user_uuid = self.service_db.get_user_uuid(project_uuid, rc_name1)
                user_uuid = user_uuid[0][0]
            except Exception, e:
                log.error('get the user_uuid error, reason is: %s' % e)
                return events_cache

            try:
                ns_events_info = self.k8s_driver.app_events_info(project_uuid)

                if ns_events_info.get('status') != 0:
                    log.debug('Get events from k8s error')
                    return events_cache

                events_info = json.loads(ns_events_info['result'])
                events_list = events_info['items']
                # log.info('event event event is: %s' % events_list)
            except Exception, e:
                log.error('get the events error, the events result is: %s, reason is: %s' % (events_list, e))
                return events_cache

            try:
                log.info('7777')
                for events in events_list:
                    if events.get('involvedObject').get('kind') == 'Pod':
                        rc_name1 = events.get('involvedObject').get('name')[:-6]
                    project_uuid = events.get('involvedObject').get('namespace')
                    rc_name = rc_name1 + '#' + project_uuid
                    event = events.get('message')

                    if rc_name not in events_new.keys():
                        events_new[rc_name] = {"events_info": [{rc_name: event}]}

                    else:
                        events_new[rc_name]['events_info'].append({rc_name: event})
                    log.info('88888888888---events_new is: %s' % events_new)
            except Exception, e:
                log.error('explain the events parameters error, reason is: %s' % e)
                return events_cache

            try:
                # rc_off_list = dict.fromkeys([x for x in events_cache if x not in events_new]).keys()
                # log.info('101010,cache is: %s, events_new is: %s,off_list is: %s' % (events_cache, events_new,
                #                                                                      rc_off_list))
                # for rc_off_name in rc_off_list:
                #     del events_cache[rc_off_name]
                for rc_name, rc_info in events_new.items():
                    log.info('2222222----rc_name is: %s, events_cache.keys is: %s' % (rc_name, events_cache.keys()))
                    if (rc_name is not None) and (rc_name not in events_cache.keys()):

                        # log.info('len test:events_cache is: %d, rc_info is: %d' % (len(events_cache[rc_name]),
                        #                                                            len(rc_info['events_info'])))
                        events_info = rc_info['events_info']
                        log.info('project_uuid is: %s' % project_uuid)

                        if events_cache.get('rc_name') is None:
                            events_cache[rc_name] = events_info
                        else:
                            events_cache[rc_name]['events_info'].append(events_info.get('events_info'))
                        # events_cache[rc_name]['events_info'].append(events_info)

                        for event_info in events_info:
                            events_msg = event_info.values()[0]
                            if 'image' in events_msg:
                                message_es = {'user_uuid': user_uuid, "project_uuid": project_uuid,
                                              "service_name": rc_name1}
                                post_es(message_es, events_msg)
                        break

                    else:
                        log.info('len test:events_cache is: %d, rc_info is: %d' % (len(events_cache[rc_name]),
                                                                                   len(rc_info['events_info'])))
                        return events_cache

                # rc_off_new = dict.fromkeys([x for x in events_new if x in events_cache]).keys()
                # for rc_off_name in rc_off_new:
                #     del events_new[rc_off_name]

            except Exception, e:
                log.error('export error, reason is: %s' % e)
                return events_cache

        return events_cache
