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


class MonitorApi(object):
    def __init__(self):
        pass

    @staticmethod
    def token_ab(json_data):
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            log.info("token====%s" % token_get)
            TokenForApi.get_msg(token_get)
            return True
        except Exception, e:
            log.info("token check error, reason = %s" % e)
            return False

    @classmethod
    def get_msg(cls, json_data):
        if cls.token_ab(json_data) is False:
            return code.request_result(201)
        try:
            return Show.get_msg(json_data)
        except Exception, e:
            log.error("get the Message error, reason = %s" % e)
            return "error"

    @classmethod
    def get_rc_message(cls, json_data):
        response = []
        value = []
        if cls.token_ab(json_data) is False:
            return code.request_result(201)
        try:
            log.info("json_data=%s" % json_data)
            for i in json_data.get("pod_name"):
                r = {"pod_name": i}
                json_data.update(r)

                alone = Show.get_msg(json_data)
                for i in alone:
                    if "usage" in i.get("name"):
                        result = i.get("value")
                        for j in result:
                            if len(value) == 0:
                                value = result
                            else:
                                for m in value:
                                    if m[1] is None or j[1] is None:
                                        pass
                                    else:
                                        m[1] = j[1] + m[1]
                r = {"name": i.get("name"), "value": value}
                response.append(r)
            return response
        except Exception, e:
            log.error("get the rc monitor message error, reason=%s" % e)
            return "error"
