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

                user_uuid = self.service_db.get_user_uuid(project_uuid, rc_name1)
                log.info('user uuid is: %s' % user_uuid)
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

                for i in events_list:

                    if i.get('involvedObject').get('kind') == 'Pod':
                        rc_name_event = i.get('involvedObject').get('name')[:-6]
                    else:
                        rc_name_event = i.get('involvedObject').get('name')

                    namespace = i.get('involvedObject').get('namespace')

                    inner_name = rc_name_event + '#' + namespace
                    event = i.get('message')

                    # events_new:{'rc_name':['message','message']},  cache:'rc_name':['message','message']
                    # if events_new.get(inner_name) is None:
                    events_new[inner_name] = []
                    events_new[inner_name].append(event)
                    if events_cache != {}:
                        # if events_cache.get(inner_name)
                        # l2 = list(set(events_cache[inner_name]))
                        # log.info('444444444xxxxxxxxxxxxx')
                        # events_cache[inner_name] = l2
                        if inner_name not in events_cache.keys():
                            events_cache[inner_name] = events_new[inner_name]
                            for q in events_new[inner_name]:

                                message_es = {'user_uuid': user_uuid, 'project_uuid': project_uuid,
                                              'service_name': rc_name_event}
                                if 'image' in q:
                                    log.info('11111111111>>>>>>>>>%s' % q)
                                    post_es(message_es, q)

                        if inner_name in events_cache.keys():
                            message_es = {'user_uuid': user_uuid, 'project_uuid': project_uuid, 'service_name':
                                          rc_name_event}
                            if not set(events_new[inner_name]).issubset(set(events_cache[inner_name])):

                                for x in events_new[inner_name]:
                                    if x not in events_cache[inner_name]:

                                        events_cache[inner_name].append(x)
                                        if 'image' in x:
                                            log.info('2222222222>>>>>>>%s' % x)
                                            post_es(message_es, x)

                                        events_cache[inner_name].append(x)

                    else:
                        message_es = {'user_uuid': user_uuid, 'project_uuid': project_uuid, 'service_name': rc_name_event}
                        events_cache = dict()
                        events_cache[inner_name] = events_new[inner_name]
                        for q in events_new[inner_name]:
                            if 'image' in q or 'err' in q:
                                log.info('333333333>>>>%s' % q)
                                post_es(message_es, q)

            except Exception, e:
                log.error('explain the events error, reason is: %s' % e)
                return events_cache

        return events_cache
