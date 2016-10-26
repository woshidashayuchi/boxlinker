#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author: wang-xf
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from data import DataOrm
from common.logs import logging as log
from data_controller import LogicModel
from con_sql import AclSql


class Controller(object):

    logicmodel = LogicModel()
    conn, cur = logicmodel.connection()

    def add_acl(self, json_data):
        json_data["rtype"] = "acl"
        json_data["resource_type"] = "service"
        try:
            res = DataOrm.add_method(json_data)
            return res

        except Exception, e:
            log.error("add service acl error, reason=%s" % e)

    def del_acl(self, json_data):
        del_sql = ""
        try:
            del_sql = AclSql.del_sql(json_data)
        except Exception, e:
            log.error("sql create error, reason=%s" % e)

        try:
            res = self.logicmodel.exeDelete(self.cur, del_sql)
            self.logicmodel.connClose(self.conn, self.cur)
            return res
        except Exception, e:
            log.error("delete acl error, reason=%s" % e)

    def up_acl(self, json_data):
        up_sql = ""
        try:
            up_sql = AclSql.up_sql(json_data)
        except Exception, e:
            log.error("sql create error, reason=%s" % e)

        try:
            res = self.logicmodel.exeUpdate(self.cur, up_sql)
            self.logicmodel.connClose(self.conn, self.cur)
            return res
        except Exception, e:
            log.error("update acl error, reason=%s" % e)
            return "%s" % e

    def list_acl(self, json_data):
        li_sql = ""
        try:
            li_sql = AclSql.li_sql(json_data)
        except Exception, e:
            log.error("sql create error, reason=%s" % e)

        try:
            res = self.logicmodel.exeQuery(self.cur, li_sql)
            self.logicmodel.connClose(self.conn, self.cur)
            return res
        except Exception, e:
            log.error("update acl error, reason=%s" % e)
            return "%s" % e
