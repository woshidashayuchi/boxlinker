#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/12/23
# Author:wang-xf
import sys
p_path = sys.path[0] + '/..'
x_path = sys.path[0] + '/../..'
sys.path.append(p_path)
sys.path.append(x_path)
from data import DataOrm
from common.logs import logging as log
from data_controller import LogicModel


class BaseCallForOthers(object):
    def __init__(self):
        pass

    @staticmethod
    def get_billing_resource_uuid(json_data):
        uid_font = ""
        # 得到要删除资源的id
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        try:
            get_sql = DataOrm.get_billing_resource_id(json_data)
            log.info("aaasql=======%s" % get_sql)
            resu = logicmodel.exeQuery(cur, get_sql)

        except Exception, e:
            log.error("get the id for the resource which should be deleted error, reason=%s" % e)
            return "error"

        for i in resu:
            uid_font = i.get("uuid")
        logicmodel.connClose(conn, cur)

        return uid_font

    @classmethod
    def for_container_update(cls, json_data):
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        result = {}
        try:
            querySql = DataOrm.check_domain_identify(json_data)
            resu = logicmodel.exeQuery(cur, querySql)
            for i in resu:
                if i.get("private_domain") != "" and i.get("private_domain") is not None and i.get("identify") == 1:
                    result["private_domain"] = i.get("private_domain")
                    result["identify"] = i.get("identify")
            logicmodel.connClose(conn, cur)
            return result

        except Exception, e:
            log.error("get the id for the resource which have private domain error, reason=%s" % e)
            return "error"


'''
    @staticmethod
    def get_private_domain(json_data):
        result = 0
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        try:
            querySql = DataOrm.check_domain_identify(json_data)
            log.info("aaasql=======%s" % querySql)
            resu = logicmodel.exeQuery(cur, querySql)
            for i in resu:
                if i.get("private_domain") != "" and i.get("private_domain") is not None:
                    result = result + 1
        except Exception, e:
            log.error("get the id for the resource which have private domain error, reason=%s" % e)
            return "error"
        logicmodel.connClose(conn, cur)
        return result

    def check(self, json_data):
        rep = self.get_private_domain(json_data)
        if rep == 0:
            return 1
        try:
            queryContainer = DataOrm.li_container(json_data)
            logicmodel = LogicModel()
            conn, cur = logicmodel.connection()
            resu = logicmodel.exeQuery(cur, queryContainer)
            container = json_data.get("container")
            for i in container:
                for j in resu:
                    if i.get("container_port") == j.get("containerPort"):
                        i["uuid"] = j.get("uuid")
                        up_sql = DataOrm.update_container(i)
                        rest = logicmodel.exeUpdate(cur, up_sql)
                        if rest != 0 and rest != 1:
                            return "error"
                        return 1
        except Exception, e:
            log.error("update the containers error, reason=%s" % e)
            return "error"
'''
