# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/14 上午10:55

from common.logs import logging as log
from db.alarm_db import AlarmDB
from common.code import request_result
from driver.alarm_driver import AlarmDriver


class AlarmManager(object):
    def __init__(self):
        self.alarm_db = AlarmDB()
        self.alarm_drv = AlarmDriver()

    def alarm_into_manager(self, dict_data):
        try:
            self.alarm_db.insert_alarm(dict_data)
        except Exception, e:
            log.error('insert the table alarming error, reason is: %s' % e)
            return request_result(401)

        return request_result(0, 'create the alarming successfully')

    def query_result_ex(self, dict_data):
        result = []

        try:
            ret = self.alarm_db.get_alarm(dict_data)
        except Exception, e:
            log.error('query the database error, reason is: %s' % e)
            raise Exception('query the database error')
        try:
            for i in ret:
                ret_ex = {
                    'wise': i[0],
                    'cpu_unit': i[1],
                    'cpu_value': i[2],
                    'memory_unit': i[3],
                    'memory_value': i[4],
                    'network_unit': i[5],
                    'network_value': i[6],
                    'storage_unit': i[7],
                    'storage_value': i[8],
                    'time_span': i[9],
                    'alarm_time': i[10],
                    'service_uuid': i[11]
                }
                result.append(ret_ex)
        except Exception, e:
            log.error('explain the db result error, reason is: %s' % e)
            raise Exception('explain the db result error')

        return result

    def query_manager(self, dict_data):
        try:
            ret = self.query_result_ex(dict_data)
        except Exception, e:
            log.error('get the alarm message error, reason is: %s' % e)
            return request_result(404)

        return request_result(0, ret)

    def alarm_svc_manager(self):
        dict_data = {'type': 'memory', 'time_long': '15m', 'time_span': '1m'}
        self.alarm_drv.alarm_driver(dict_data)
