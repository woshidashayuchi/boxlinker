#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/21
# Author:王晓峰
from data_controller import LogicModel
from data import DataOrm
from common.logs import logging as log
import json
from es.to_es import post_es
# from detail_podstatus import update_s


class PodStatus(object):

    def __int__(self):
        pass

    def update_podstatus(self, json_list):
        # user_id, user_name, service_name, status
        update_status_sql = ""
        try:
            log.info("json_list=%s, type=%s" % (json_list, type(json_list)))
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            json1 = eval(json_list)
            update_status_sql = DataOrm.update_pods(json1)
        except Exception, e:
            log.error("create status sql error, reason=%s" % e)
            return "failed"

        logical = LogicModel()
        conn, cur = logical.connection()

        if eval(json_list).get("status") != "fail":
            try:
                logical.exeUpdate(cur, update_status_sql)
                log.info("service create success!!!!!!!!!!")
                log.info(eval(json_list).get("token"))
                post_es(eval(json_list), "service has be created successfully!")
            except Exception, e:
                log.error("status update error,reason=%s" % e)
                return "failed"

            logical.connClose(conn, cur)

        else:
            try:
                logical.exeUpdate(cur, update_status_sql)
                log.info("service create failed")
                post_es(eval(json_list), "service create failed!")
            except Exception, e:
                log.error("status update error,reason=%s" % e)
                return "failed"

        # update_s(json_list)