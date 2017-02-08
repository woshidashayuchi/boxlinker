#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/29
# Author:xiaofengwang

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from data import DataOrm
from data_controller import LogicModel
from common.logs import logging as log
from response_code import code


class Up(object):
    def __init__(self):
        pass

    @classmethod
    def update_status(cls, json_list):
        update_sql = ""
        try:
            update_sql = DataOrm.anytime_update_pod1(json_list)
        except Exception, e:
            log.error("create sql error, reason=%s" % e)

        logic = LogicModel()
        conn, cur = logic.connection()

        try:
            result = logic.exeUpdate(cur, update_sql)
            logic.connClose(conn, cur)

            if str(result) == '1' or str(result) == '0':
                log.info("the update result ==== %s" % result)
                return code.request_result(0, 'status update success')

            else:
                return code.request_result(403)
        except Exception, e:
            log.error("database update error,reason=%s" % e)
            return code.request_result(403)
