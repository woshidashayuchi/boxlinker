#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/14
# Author:wang-xf
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from token_about.token_for_api import TokenForApi
from response_code import code
from common.logs import logging as log
from flask import request, Response
from resource_model.monitors import ShowMessage
from common import time_artic
from resource_model.monitor_test import Show


class MonitorApi(object):
    def __init__(self):
        pass

    @classmethod
    def get_msg(cls, json_data):
        # token time_long time_span
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.info("token check error, reason = %s" % e)
            return code.request_result(201)

        try:
            # log.info(Show.get_msg(json_data))
            return Show.get_msg(json_data)
            # return Response(ShowMessage.get_msg(json_data))
        except Exception, e:
            log.error("get the Message error, reason = %s" % e)
            return code.request_result(601)

    @classmethod
    def get_namespace_msg(cls, json_data):
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.info("token check error, reason = %s" % e)
            return code.request_result(201)

        result = time_artic.artic_time(json_data)
        return result


