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
