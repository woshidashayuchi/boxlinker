#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/14
# Author:wang-xf

import os
from common.logs import logging as log
from response_code import code
import time


class Structure(object):
    def __init__(self):
        pass

    @classmethod
    def struct_sql(cls, json_data):

        time_long = json_data.get("time_long")
        time_span = json_data.get("time_span")
        user_name = json_data.get("user_name")
        pod_name = json_data.get("pod_name")
        STATICSQL = "SELECT sum(\"value\") FROM \"change\" WHERE \"type\" = \'pod_container\' " \
                    "AND \"namespace_name\" =~ /%s$/ " \
                    "AND \"pod_name\" =~ /%s$/ " \
                    "AND time > now() - %s GROUP BY time(%s), \"container_name\" fill(null)&epoch=ms" % (user_name,
                                                                                                pod_name,
                                                                                                time_long,
                                                                                                time_span)
        STATICNET = "SELECT sum(\"value\") FROM \"change\" WHERE \"type\" = \'pod\' " \
                    "AND \"namespace_name\" =~ /%s$/ " \
                    "AND \"pod_name\" =~ /%s$/ " \
                    "AND time > now() - %s GROUP BY time(%s) fill(null)&epoch=ms" % (user_name,
                                                                                     pod_name,
                                                                                     time_long,
                                                                                     time_span)

        try:
            if json_data.get("type") == "cpu":
                usage_sql = STATICSQL.replace("change", "cpu/usage_rate")
                limit_sql = STATICSQL.replace("change", "cpu/limit")
                request_sql = STATICSQL.replace("change", "cpu/request")
                result = {"usage_sql": usage_sql, "limit_sql": limit_sql, "request_sql": request_sql}
                return result
            if json_data.get("type") == "memory":
                usage_sql = STATICSQL.replace("change", "memory/usage")
                limit_sql = STATICSQL.replace("change", "memory/limit")
                request_sql = STATICSQL.replace("change", "memory/request")
                set_sql = STATICSQL.replace("change", "memory/working_set")
                result = {"usage_sql": usage_sql, "limit_sql": limit_sql, "request_sql": request_sql, "set_sql": set_sql}
                return result
            if json_data.get("type") == "network":
                tx_sql = STATICNET.replace("change", "network/tx_rate")
                rx_sql = STATICNET.replace("change", "network/rx_rate")
                result = {"tx_sql": tx_sql, "rx_sql": rx_sql}
                return result
            if json_data.get("type") == "filesystem":
                usage_sql = STATICNET.replace("change", "filesystem/usage")
                limit_sql = STATICNET.replace("change", "filesystem/limit")
                result = {"usage_sql": usage_sql, "limit_sql": limit_sql}
                return result
        except Exception, e:
            log.error("sql create error, reason=%s" % e)
            return "error"
