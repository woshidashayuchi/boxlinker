# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/31 下午6:10

from common.mysql_base import MysqlInit
from common.logs import logging as log


class ServiceDB(MysqlInit):

    def __init__(self):
        super(ServiceDB, self).__init__()

    def element_explain(self, team_list):
        try:
            sql = "("
            for i in team_list:
                sql = sql+"'"+i+"'"+','
            sql = sql[:-1] + ')'
        except Exception, e:
            log.error('explain the element for database error, reason is: %s' % e)
            raise Exception('explain the element for database error')
        return sql

    def update_zero_services(self, teams_list):
        # sql = "update font_service set lifecycle='stop' where team_uuid in " + self.element_explain(teams_list)
        sql = "update font_service set lifecycle='stop' where team_uuid='99acbcae-76f0-42b4-90e8-279a6f96c327'"
        log.info('update the db sql is: %s,type is: %s' % (sql, type(sql)))

        return super(ServiceDB, self).exec_update_sql(sql)

    def get_zero_services(self, teams_list):

        # sql = "select service_name, project_uuid, uuid from " \
        #       "font_service WHERE team_uuid IN " + self.element_explain(teams_list)

        sql = "select service_name, project_uuid, uuid from " \
              "font_service WHERE team_uuid='99acbcae-76f0-42b4-90e8-279a6f96c327'"
        log.info('get the zero money service sql is: %s' % sql)

        return super(ServiceDB, self).exec_select_sql(sql)

    def recycle_svc_list(self, project_uuid):

        sql = "select service_name,service_create_time ltime from font_service WHERE project_uuid='%s' and " \
              "lifecycle='stop'" % project_uuid

        return super(ServiceDB, self).exec_select_sql(sql)