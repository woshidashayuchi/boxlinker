#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/26
# Author: wang-xf

from pod_message import pod_messages
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from data_controller import LogicModel
from data import DataOrm
from time import sleep


def update_s(json_data):
    cnt = 0
    while True:
        if cnt >= 12:
            break
        p_list = pod_messages(json_data)
        cnt_w = 0
        cnt_r = 0

        for i in p_list:
            if i.get("pod_phase") != "Running":
                cnt_w += 1
                json_data["status"] = i.get("pod_phase")
                try:
                    update_status_sql = DataOrm.update_pods(json_data)
                except Exception, e:
                    log.error("create status sql error, reason=%s" % e)
                    return "failed"

                logical = LogicModel()
                conn, cur = logical.connection()

                try:
                    logical.exeUpdate(cur, update_status_sql)
                except Exception, e:
                    log.error("status update error,reason=%s" % e)
                    return "failed"

                logical.connClose(conn, cur)
            else:
                cnt_r += 1

        if cnt_r != 0:
            json_data["status"] = "Running"
            try:
                update_status_sql = DataOrm.update_pods(json_data)
            except Exception, e:
                log.error("create status sql error, reason=%s" % e)
                return "failed"

            logical = LogicModel()
            conn, cur = logical.connection()

            try:
                logical.exeUpdate(cur, update_status_sql)
                logical.connClose(conn, cur)
                break
            except Exception, e:
                log.error("status update error,reason=%s" % e)
                return "failed"
        cnt += 1

        sleep(5)
