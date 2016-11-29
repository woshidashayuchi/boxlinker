#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/4
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
import json
import urllib
import os


class ConsoleAct(object):
    def __init__(self):
        pass

    def pos(self, pods):

        changes = ["cpu/usage_rate", "cpu/limit", "memory/usage", "memory/limit"]

        cpu_usage = 0
        cpu_limit = 0
        memory_usage = 0
        memory_limit = 0

        cpu_usage_result = []
        memory_usage_result = []
        namespace = pods.get("user_name")
        pods = pods.get("pods")
        STATICHTTP = "http://%s/api/datasources/proxy/1/query?db=k8s&q=" % os.environ.get("GRAFANA")
        log.info("aaaaaaa=======%s" % pods)
        for i in pods:
            for j in changes:

                sql_s = "SELECT sum(\"value\") FROM \"change\" WHERE \"type\" = \'pod_container\' " \
                        "AND \"namespace_name\" =~ /%s$/ " \
                        "AND \"pod_name\" =~ /%s$/ " \
                        "AND time > now() - 1m GROUP BY time(1m), \"container_name\" fill(null)&epoch=ms" % (namespace,
                                                                                                    i)

                url1 = STATICHTTP + sql_s
                url = url1.replace("change", j)
                res = json.loads(urllib.urlopen(url).read())
                log.info("xxxx===%s" % res)
                x = res.get("results")

                if x is not None:

                    try:
                        xx = x[0].get("series")[0].get("name")
                        log.info("hhh===%s" % xx)

                        if xx == "cpu/usage_rate":
                            c = int(x[0].get("series")[0].get("values")[1][1])
                            # if c >= 200:
                            #     cpu_usage = 200
                            # else:

                            cpu_usage = int(cpu_usage) + abs(c)

                        if xx == "cpu/limit":
                            cpu_limit = int(cpu_limit) + abs(x[0].get("series")[0].get("values")[1][1])

                        if xx == "memory/usage":
                            memory_usage = int(memory_usage) + abs(int(x[0].get("series")[0].get("values")[1][1]))

                        if xx == "memory/limit":
                            memory_limit = int(memory_limit) + abs(int(x[0].get("series")[0].get("values")[1][1]))

                    except Exception, e:
                        log.error("error, reason=%s" % e)

        resu = {"cpu_usage":cpu_usage, "cpu_limit":cpu_limit, "memory_usage": memory_usage, "memory_limit": memory_limit}
        return resu
