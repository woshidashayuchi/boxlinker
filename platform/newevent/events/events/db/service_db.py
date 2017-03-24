# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07
import re
from common.mysql_base import MysqlInit
from common.logs import logging as log
from common.db_operate import DbOperate


class ServiceDB(MysqlInit):

    def __init__(self):
        super(ServiceDB, self).__init__()
        self.operate = DbOperate()

    def update_status_anytime(self, ps, service_status):
        try:
            service_name = ps.split('#')[0]
            project_uuid = ps.split('#')[1]
        except Exception, e:
            log.error('parameters explain error, reason is: %s' % e)
            raise Exception('parameters explain error')

        sql = "update font_service set service_status='%s' WHERE project_uuid='%s' " \
              "and service_name='%s'" % (service_status, project_uuid, service_name)

        log.info("update app status's sql is: %s" % sql)
        return super(ServiceDB, self).exec_update_sql(sql)

    def get_user_uuid(self, project_uuid, service_name):

        sql = "select user_uuid from font_service WHERE service_name='%s' and " \
              "project_uuid='%s'" % (service_name, project_uuid)

        conn, cur = self.operate.connection()
        ret = self.operate.exeQuery(cur, sql)
        self.operate.connClose(conn, cur)

        for i in ret:
            user_uuid = i.get('user_uuid')
            return user_uuid

