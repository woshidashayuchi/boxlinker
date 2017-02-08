#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/12
# Author:wang-xf
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from data import DataOrm
from data_controller import LogicModel
from response_code import code


class CheckName(object):
    def __init__(self):
        pass

    @classmethod
    def check_name(cls, json_list):
        try:
            select_sql = DataOrm.check_name(json_list)
            log.info("checking if the name \'%s\' is a used name")
        except Exception, e:
            log.error("can't create the json: name=%s is exist, reason=%s" % (json_list.get("service_name"), e))
            return False
        logical = LogicModel()
        conn, cur = logical.connection()
        try:
            resu = logical.exeQuery(cur, select_sql)
        except Exception, e:
            log.warning("can't get the database s_name reason=%s" % (e))
        logical.connClose(conn, cur)
        for i in resu:
            if i.get("fservice_name") == json_list.get("service_name"):
                return False
            else:
                pass
