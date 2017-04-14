# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/12 下午1:12

from common.logs import logging as log
from common.mysql_base import MysqlInit
from element_explain import ElementExplain


class AlarmDB(MysqlInit):

    def __init__(self):
        super(AlarmDB, self).__init__()
        self.element_ex = ElementExplain()

    def insert_alarm(self, dict_data):

        a_uuid, user_uuid, service_uuid, wise, cpu_unit, cpu_value, memory_unit, memory_value, network_unit, \
            network_value, storage_unit, storage_value, time_span, \
            alarm_time, alarm_uuid = self.element_ex.insert_alarm_ex(dict_data)

        sql_alarm = "insert into alarming(uuid,wise,cpu_unit,cpu_value,memory_unit,memory_value," \
                    "network_unit,network_value,storage_unit,storage_value,time_span,alarm_time) " \
                    "VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s'," \
                    "'%s')" % (a_uuid, wise, cpu_unit, cpu_value, memory_unit, memory_value,
                               network_unit, network_value, storage_unit, storage_value, time_span, alarm_time)

        super(AlarmDB, self).exec_update_sql(sql_alarm)
        for i in service_uuid:

            sql = "insert INTO alarm_service_rules(uuid,alarm_uuid,service_uuid) VALUES ('%s','%s'," \
                  "'%s')" % (alarm_uuid, a_uuid, i)
            log.info('insert the database(alarming) sql is: %s' % sql)

            super(AlarmDB, self).exec_update_sql(sql)

    def get_alarm(self, dict_data):

        project_uuid = dict_data.get('project_uuid')
        user_uuid = dict_data.get('user_uuid')

        sql = "select a.wise,a.cpu_unit,a.cpu_value,a.memory_unit,a.memory_value,a.network_unit,a.network_value," \
              "a.storage_unit,a.storage_value,a.time_span,a.alarm_time,b.service_uuid from alarming a," \
              "alarm_service_rules b " \
              "WHERE b.service_uuid IN (SELECT uuid from font_service WHERE user_uuid='%s' " \
              "AND project_uuid='%s') AND a.uuid=b.alarm_uuid" % (user_uuid, project_uuid)

        return super(AlarmDB, self).exec_select_sql(sql)
