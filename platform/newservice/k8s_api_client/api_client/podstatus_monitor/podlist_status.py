#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/23
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from pod_status import PodStatus
from data_controller import LogicModel
from data import DataOrm
from common.logs import logging as log
from time import sleep


def list_status(json_list):
    i = 0
    j = 1
    while True:
        all_status = DataOrm.query_sql(json_list)
        logical = LogicModel()
        conn, cur = logical.connection()
        resu = logical.exeQuery(cur, all_status)
        logical.connClose(conn, cur)
        for i in resu:
            service_name = i.get("fservice_name")
            log.info("service_name============%s" % service_name)
            json_to = {"user_id": json_list.get("user_id"), "user_name": json_list.get("user_name"), "service_name":service_name}

            try:
                PodStatus.monitor_pod_status(json_to)
                log.info("update %d success" % j)
                j += 1
            except Exception, e:
                log.error("pod status update error, reason=%s" % e)
        i += 1
        if i == 3:
            break
        else:
            sleep(60)
