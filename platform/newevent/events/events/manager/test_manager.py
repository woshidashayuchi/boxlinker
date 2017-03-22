# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/15 下午6:19

from common.logs import logging as log
from events.db.service_db import ServiceDB
from events.driver.status_driver import K8sDriver
from events.driver.es_driver.to_es import post_es
import json


class EventsLog(object):
    def __init__(self):
        self.service_db = ServiceDB()
        self.k8s_driver = K8sDriver()

    def events_manager(self, events_cache):

        # 得到RC信息,从中获取namespace与name
        rc_info = self.k8s_driver.rc_status_info()
        status = rc_info['status']
        if status != 0:
            log.debug('Get pods status from k8s error')
            return events_cache

        try:
            rc_info = json.loads(rc_info['result'])
            rc_list = rc_info['items']
        except Exception, e:
            log.error('Get rc status list error, reason=%s' % (e))
            return events_cache

        events_new = {}
        for i in rc_list:

            # 通过namespace与service_name得到user_uuid,用于发日志
            project_uuid = i.get('metadata').get('namespace')
            if len(project_uuid) < 36:
                continue

            component = rc_info['metadata']['labels'].get('component')

            try:
                user_uuid = self.service_db.get_user_uuid(project_uuid, component)
                user_uuid = user_uuid[0][0]
            except Exception, e:
                log.error('get the user_uuid based on project_uuid and service_name error, reason is: %s' % e)
                continue

            # 获取events信息
            try:
                ns_events_info = self.k8s_driver.app_events_info(project_uuid)

                if ns_events_info.get('status') != 0:
                    log.debug('Get events from k8s error')
                    continue

                events_info = json.loads(ns_events_info['result'])
                events_list = events_info['items']
            except Exception, e:
                log.error('get the events error, the events result is: %s, reason is: %s' % (events_list, e))
                return events_cache

            # 从events里获取服务名及events信息
            try:
                for events in events_list:
                    if events.get('involvedObject').get('kind') == 'Pod':
                        component = events.get('involvedObject').get('name')[:-6]
                    rc_name = component + '#' +project_uuid
                    event = events.get('message')

                    if rc_name not in events_new.keys():
                        events_new[rc_name] = {"events_info": [{rc_name: event}]}
                    else:
                        events_new[rc_name]['events_info'].append({rc_name: event})
            except Exception, e:
                log.error('explain the events parameters error, reason is: %s' % e)
                return events_cache

            # 加缓存,发日志
            for rc_name, events_info in events_new.items():
                # 假设缓存样式: cache:{'rc_name':[{rc_name:xxxxxx}]}
                if len(events_cache.keys()) == 0:
                    events_info = events_info['events_info']
                    for j in events_info:
                        msg = j.values()[0]
                        if 'image' in msg:
                            message_es = {'user_uuid': user_uuid, "project_uuid": project_uuid,
                                          "service_name": component}
                            post_es(message_es, msg)
                            if events_cache[rc_name] is None or len(events_cache[rc_name]) == 0:
                                events_cache[rc_name] = [{'events_info': msg}]
