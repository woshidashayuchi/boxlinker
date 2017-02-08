# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

from common.mysql_base import MysqlInit
from common.logs import logging as log
from unit_element import font_infix_element


class ServiceDB(MysqlInit):
    def __init__(self):
        super(ServiceDB, self).__init__()

    def name_if_used_check(self, dict_data):

        service_name = dict_data.get("service_name")
        project_uuid = dict_data.get("project_uuid")

        sql = "select * from font_service where service_name =\'%s\' and " \
              "project_uuid = \'%s\'" % (service_name, project_uuid)

        return super(ServiceDB, self).exec_select_sql(sql)

    def infix_db(self, dict_data):

        font_uuid, rc_uuid, service_uuid, user_uuid, team_uuid, project_uuid, service_name = font_infix_element(
                                                                                                            dict_data)

        sql_font = "insert into font_service(uuid, rc_uuid, service_uuid, user_uuid, " \
                   "team_uuid, project_uuid, service_name) VALUES(\'%s\', \'%s\', \'%s\', \'%s\', " \
                   "\'%s\', \'%s\', \'%s\')" % (font_uuid, rc_uuid, service_uuid, user_uuid, team_uuid,
                                                project_uuid, service_name)

        return super(ServiceDB, self).exec_update_sql(sql_font)
