#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/15
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from data import DataOrm
from data_controller import LogicModel
from response_code import code


def get_id(all_name):
    svc_sql = DataOrm.get_svcid(all_name)
    logic = LogicModel()
    conn, cur = logic.connection()
    uid = ''
    try:
        resu = logic.exeQuery(cur, svc_sql)
        for i in resu:
            uid = i.get("uuid")

    except Exception, e:

        log.error("query the service_id error, reason=%s" % e)
        return code.request_result(404)
    logic.connClose(conn, cur)
    return code.request_result(0, uid)
