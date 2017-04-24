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
        dict_data = {'type': 'cpu', 'time_long': '15m', 'time_span': '1m'}
        self.alarm_drv.alarm_driver(dict_data)

    def update_manager(self, dict_data):
        return self.alarm_drv.update_alarm(dict_data)

    def only_alarm_create(self, dict_data):

        try:
            alarm_uuid = self.alarm_db.only_alarm_create(dict_data)
            return request_result(0, {'alarm_uuid': alarm_uuid})
        except Exception, e:
            log.error('database insert error, reason is: %s' % e)
            return request_result(401)

    @staticmethod
    def query_result_work(database_ret):
        result = []

        for i in database_ret:
            alarm_uuid = i[0]
            cpu_unit = i[1]
            cpu_value = i[2]
            memory_unit = i[3]
            memory_value = i[4]
            network_unit = i[5]
            network_value = i[6]
            storage_unit = i[7]
            storage_value = i[8]
            time_span = i[9]
            alarm_time = i[10]
            email = i[11]
            phone = i[12]

            dict_ret = {
                'alarm_uuid': alarm_uuid,
                'cpu_unit': cpu_unit,
                'cpu_value': cpu_value,
                'memory_unit': memory_unit,
                'memory_value': memory_value,
                'network_unit': network_unit,
                'network_value': network_value,
                'storage_unit': storage_unit,
                'storage_value': storage_value,
                'time_span': time_span,
                'alarm_time': alarm_time,
                'email': email,
                'phone': phone,
            }

            result.append(dict_ret)

        return result

    def only_alarm_query(self, dict_data):
        try:
            ret = self.alarm_db.only_alarm_query(dict_data)

        except Exception, e:
            log.error('database insert error, reason is: %s' % e)
            return request_result(404)

        try:
            result = self.query_result_work(ret)
        except Exception, e:
            log.error('explain the data error ,reason is: %s' % e)
            return request_result(601)

        return request_result(0, {'alarm_list': result})

    def only_detail_query(self, dict_data):

        try:
            ret = self.alarm_db.only_detail_query(dict_data)

        except Exception, e:
            log.error('database insert error, reason is: %s' % e)
            return request_result(404)

        try:
            result = self.query_result_work(ret)
        except Exception, e:
            log.error('explain the data error ,reason is: %s' % e)
            return request_result(601)

        return request_result(0, result[0])

    def only_update_alarm(self, dict_data):
        try:
            ret = self.alarm_db.only_detail_query(dict_data)
        except Exception, e:
            log.error('database select error, reason is: %s' % e)
            return request_result(404)

        try:
            result = self.query_result_work(ret)[0]
            dict_data.update(result)
        except Exception, e:
            log.error('ecplain the data error, reason is: %s' % e)
            return request_result(601)

        try:
            self.alarm_db.only_update_alarm(dict_data)
            return request_result(0, {'result': 'ok'})
        except Exception, e:
            log.error('database update error, reason is: %s' % e)
            return request_result(403)
