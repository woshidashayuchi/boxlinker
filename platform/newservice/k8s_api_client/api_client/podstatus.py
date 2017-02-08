#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/21
# Author:王晓峰
from data_controller import LogicModel
from data import DataOrm
from common.logs import logging as log
from es.to_es import post_es
from resource_model.event_monitor import EventMonitor


class PodStatus(object):

    def __int__(self):
        pass

    @staticmethod
    def update_podstatus(json_list):
        try:
            log.info("json_list=%s, type=%s" % (json_list, type(json_list)))
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
                logical.connClose(conn, cur)
            except Exception, e:
                log.error("status update error,reason=%s" % e)
                return "failed"
            try:
                event = EventMonitor()
                event.mail_es(eval(str(json_list)))
            except Exception, e:
                log.error("event error, reason=%s" % e)

        else:
            try:
                logical.exeUpdate(cur, update_status_sql)
                log.info("service create failed")
                post_es(eval(json_list), "service create failed!")
                logical.connClose(conn, cur)
            except Exception, e:
                log.error("status update error,reason=%s" % e)
                return "failed"
