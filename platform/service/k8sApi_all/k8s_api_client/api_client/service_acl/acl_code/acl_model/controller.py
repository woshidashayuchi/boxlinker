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

    def __init__(self):
        pass

    def list_acl(self, json_data):
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        li_sql = ""
        try:
            li_sql = AclSql.li_sql(json_data)
        except Exception, e:
            log.error("sql create error, reason=%s" % e)

        try:
            res = logicmodel.exeQuery(cur, li_sql)
            logicmodel.connClose(conn, cur)
            return res
        except Exception, e:
            log.error("exeQuery acl error, reason=%s" % e)
            return "error"

    def authority_judge(self, json_data):
        user_id, user_name, user_orga, role_uuid = json_data.get("user_id"), json_data.get("user_name"), json_data.get("user_orga"), json_data.get("role_uuid")
        query = self.list_acl(json_data)
        log.info(query)
        if query != "error":
            for i in query:
                log.info("orga=%s, user=%s" % (i.get("organization"), i.get("user")))
                log.info(i.get("organization"))
                log.info(role_uuid)
                log.info(user_orga)
                if i.get("organization") == user_orga and int(role_uuid) == 200:
                    return "correct"
                elif i.get("organization") == user_orga and int(role_uuid) == 210:
                    return "correct"
                elif i.get("organization") == user_orga and int(role_uuid) == 400 and i.get("user") == user_id:
                    return "correct"

            return "error"
        else:

            return "error"

    def add_acl(self, json_data):
        json_data["rtype"] = "acl"
        json_data["resource_type"] = "service"
        try:
            res = DataOrm.add_method(json_data)
            return res

        except Exception, e:
            log.error("add service acl error, reason=%s" % e)

    def del_acl(self, json_data):

        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()

        authority_judge = self.authority_judge(json_data)
        if authority_judge == "correct":
            pass
        elif authority_judge == "error":
            return "error"

        user_id, user_name, user_orga, role_uuid = json_data.get("user_id"), json_data.get("user_name"), json_data.get("user_orga"), json_data.get("role_uuid")
        query = self.list_acl(json_data)

        a = ""
        if query != "error":
            for i in query:
                log.info("orga=%s, user=%s" % (i.get("organization"), i.get("user")))
                if i.get("organization") == user_orga and i.get("service_name") == json_data.get("service_name") and i.get("user") == user_id:
                    a = i.get("uuid")
        else:

            return "error"
        if a == "":
            return "error"
        up = {"uuid": a}
        json_data.update(up)
        del_sqla = ""
        try:
            del_sqla = AclSql.del_sql(json_data)
        except Exception, e:
            log.error("sql create error, reason=%s" % e)

        try:
            res = logicmodel.exeDelete(cur, del_sqla)
            logicmodel.connClose(conn, cur)
            return res
        except Exception, e:

            log.error("delete acl error, reason=%s" % e)
            return "error"

    def up_acl(self, json_data):

        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()

        up_sql = ""
        try:
            up_sql = AclSql.up_sql(json_data)
        except Exception, e:
            log.error("sql create error, reason=%s" % e)

        try:
            res = logicmodel.exeUpdate(cur, up_sql)
            logicmodel.connClose(conn, cur)
            return res
        except Exception, e:
            log.error("update acl error, reason=%s" % e)
            return "%s" % e

    def svc_list_acl(self, json_data):
        pass



