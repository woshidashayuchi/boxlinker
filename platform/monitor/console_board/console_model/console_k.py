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
        cpu_limit = 0
        cnt_c = 0
        cnt_m = 0
        memory_limit = 0
        cpu_result = []
        memory_result = []
        a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        namespace = pods.get("user_name")
        pods = pods.get("pods")
        STATICHTTP = "http://%s/api/datasources/proxy/1/query?db=k8s&q=" % os.environ.get("GRAFANA")
        log.info("aaaaaaa=======%s" % pods)
        for i in pods:
            for j in changes:

                sql_s = "SELECT sum(\"value\") FROM \"change\" WHERE \"type\" = \'pod_container\' " \
                        "AND \"namespace_name\" =~ /%s$/ " \
                        "AND \"pod_name\" =~ /%s$/ " \
                        "AND time > now() - 15m GROUP BY time(1m), \"container_name\" fill(null)&epoch=ms" % (namespace,
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
                            xxx = x[0].get("series")[0].get("values")

                            if cnt_c == 0:
                                cpu_result = xxx
                                cnt_c += 1
                            else:
                                for g in a:
                                    if cpu_result[g][1] is None or cpu_result[g][1] == "":
                                        cpu_result[g][1] = float(xxx[g][1])
                                    if xxx[g][1] is None or xxx[g][1] == "":
                                        pass
                                    else:
                                        cpu_result[g][1] = float(cpu_result[g][1]) + float(xxx[g][1])
                                    cnt_c += 1

                        if xx == "cpu/limit":
                            cpu_limit = int(cpu_limit) + abs(x[0].get("series")[0].get("values")[1][1])

                        if xx == "memory/usage":
                            # memory_usage = int(memory_usage) + abs(int(x[0].get("series")[0].get("values")[1][1]))
                            xxx = x[0].get("series")[0].get("values")

                            if cnt_m == 0:
                                memory_result = xxx
                                cnt_m += 1
                            else:
                                for g in a:
                                    if memory_result[g][1] is None or memory_result[g][1] == "":
                                        memory_result[g][1] = float(xxx[g][1])
                                    if xxx[g][1] is None or xxx[g][1] == "":
                                        pass
                                    else:
                                        memory_result[g][1] = float(memory_result[g][1]) + float(xxx[g][1])
                                    cnt_m += 1

                        if xx == "memory/limit":
                            memory_limit = int(memory_limit) + abs(int(x[0].get("series")[0].get("values")[1][1]))

                    except Exception, e:
                        log.error("error, reason=%s" % e)

        resu = {"cpu_usage": cpu_result, "cpu_limit": cpu_limit, "memory_usage": memory_result,
                "memory_limit": memory_limit}
        return resu
