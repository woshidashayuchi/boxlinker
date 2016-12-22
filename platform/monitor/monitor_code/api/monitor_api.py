#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/14
# Author:wang-xf
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from token_about.token_for_api import TokenForApi
from response_code import code
from common1.logs import logging as log
from flask import request
from resource_model.monitor_test import Show
from resource_model.rc_monitor import rc_monitor


class MonitorApi(object):
    def __init__(self):
        pass

    @classmethod
    def get_msg(cls, json_data):
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.info("token check error, reason = %s" % e)
            return code.request_result(201)

        try:
            return Show.get_msg(json_data)
        except Exception, e:
            log.error("get the Message error, reason = %s" % e)
            return code.request_result(601)

    @classmethod
    def get_rc_message(cls, json_data):
        try:
            token_get = request.headers.get("token")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.info("token check error, reason = %s" % e)
            return code.request_result(201)

        try:
            return rc_monitor(json_data)
        except Exception, e:
            log.error("get the Message error, reason = %s" % e)
            return code.request_result(601)
