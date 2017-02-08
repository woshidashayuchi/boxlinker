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
        result = []
        try:
            li_sql = AclSql.li_sql(json_data)
            log.info(li_sql)
        except Exception, e:
            log.error("sql create error, reason=%s" % e)

        try:
            res = logicmodel.exeQuery(cur, li_sql)
            logicmodel.connClose(conn, cur)
            for i in res:
                result.append(i)

            return result
        except Exception, e:
            log.error("exeQuery acl error, reason=%s" % e)
            return "error"

    def authority_judge(self, json_data):
        user_id, user_name, user_orga, role_uuid = json_data.get("user_id"), \
                                                   json_data.get("user_name"), \
                                                   json_data.get("user_orga"), \
                                                   json_data.get("role_uuid")
        log.info(json_data)
        query = self.list_acl(json_data)
        log.info(query)
        svc_name = []
        if query == "error":
            log.info("+++---")
            return "error"
        else:
            pass
        if len(query) == 0:
            return None
        for i in query:
            log.info("orga=%s, user=%s" % (i.get("organization"), i.get("user")))
            log.info(i.get("organization"))
            log.info(role_uuid)
            log.info(user_orga)
            if i.get("organization") == user_orga:
                svc_name.append(i.get("service_name"))

        return svc_name

    def up_judge(self, json_data):
        log.info(json_data)
        user_id, user_name, user_orga, role_uuid = json_data.get("user_id"), \
                                                   json_data.get("user_name"), \
                                                   json_data.get("user_orga"), \
                                                   json_data.get("role_uuid")

        query = self.list_acl(json_data)
        log.info(query)
        if query == "error":
            return "error"
        else:
            pass
        for i in query:
            if i.get("organization") == user_orga and i.get("service_name") == json_data.get("service_name"): #and \
                                                                                 # int(role_uuid) < i.get("role"):
                return 0
            if i.get("organization") == user_orga and i.get("service_name") == json_data.get("service_name") and \
                                                                                 user_id == i.get("user"):

                return 0
        return 1

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

        if len(authority_judge) == 0:
            return "error"

        user_id, user_name, user_orga, role_uuid = json_data.get("user_id"), json_data.get("user_name"), \
                                                   json_data.get("user_orga"), json_data.get("role_uuid")
        query = self.list_acl(json_data)

        a = ""
        if query != "error":
            for i in query:
                log.info("orga=%s, user=%s" % (i.get("organization"), i.get("user")))
                if i.get("organization") == user_orga and i.get("service_name") == json_data.get("service_name") and \
                   i.get("user") == user_id: a = i.get("uuid")
                if i.get("organization") == user_orga and i.get("service_name") == json_data.get("service_name") and \
                   int(role_uuid) < i.get("role"):
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
            return e

    def domain_identify_acl(self, json_data):
        if int(json_data.get("role_uuid")) <= 401:
            return 1
        else:
            return 0
