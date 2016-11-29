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
    result = {}
    try:
        resu = logic.exeQuery(cur, svc_sql)
        for i in resu:
            resource_uuid = i.get("uuid")
            resource_user = i.get("user_id")
            resource_orga = i.get("orga_id")
            resource_status = i.get("fservice_status")
            a = i.get("spec_replicas")
            b = i.get("limits_cpu")
            if a is not None and b is not None and resource_uuid is not None:
                resource_conf = int(a)*int(b)
                result = {"resource_uuid": resource_uuid, "resource_user": resource_user,
                          "resource_orga": resource_orga, "resource_status": resource_status,
                          "resource_conf": resource_conf}

            else:
                result = "did not have this resource"

    except Exception, e:

        log.error("query the service_id error, reason=%s" % e)
        return code.request_result(404)
    logic.connClose(conn, cur)
    return code.request_result(0, result)
