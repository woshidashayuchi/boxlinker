#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/14
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from structure import Structure
from common.logs import logging as log
import os
import requests
import json


class Show(object):
    def __init__(self):
        pass

    @classmethod
    def get_msg(cls, json_data):
        BASEURL = "http://%s/api/datasources/proxy/1/query?db=k8s&q=" % os.environ.get("GRAFANA")

        get_sql = ""
        result = []
        try:
            if json_data.get("type") == "cpu":
                get_sql = Structure.struct_sql(json_data)
            if json_data.get("type") == "memory":
                get_sql = Structure.struct_sql(json_data)
            if json_data.get("type") == "network":
                get_sql = Structure.struct_sql(json_data)
            if json_data.get("type") == "filesystem":
                get_sql = Structure.struct_sql(json_data)
        except Exception, e:
            log.error("create sql(cpu) error, reason=%s" % e)
            return "error"

        try:
            rname = ""
            values = ""
            respon = {}
            log.info("++++++++++++++++++%s" % result)
            for i in get_sql.keys():
                change = i
                res_sql = get_sql.get(change)
                re = json.loads(requests.get(BASEURL+res_sql).text)
                log.info(re)
                for i in re.get("results"):
                    if i.get("series") == None:
                        pass
                    else:
                        for j in i.get("series"):
                            rname = j.get("name")
                            values = j.get("values")
                        respon = {"name": rname, "value": values}
                # log.info(json.loads(requests.get(BASEURL+res_sql).text))
                result.append(respon)
            # result["aaa"] = json.loads(requests.get(BASEURL+res_sql).text)
            if result[0].get("value") is not None:
                for i in result:
                    for j in i.get("value"):
                        if j[1] == 0 and i.get("value").index(j) > 0 and i.get("value")[i.get("value").index(j)-1][1] is not None:
                            j[1] = i.get("value")[i.get("value").index(j)-1][1]

                        if j[1] == 0 and i.get("value").index(j) == 0:
                            for x in i.get("value"):
                                if x[1] != 0 and x[1] is not None:
                                    j[1] = x[1]
                            # j[1] = i.get("value")[i.get("value").index(j)+1][1]
                        if j[1] < 0 and j[1] is not None:
                            j[1] = abs(j[1])

            return result

        except Exception, e:
            log.error("get the result error, reason=%s" % e)
            return "error"

    @classmethod
    def get_rc_msg(cls, json_data):
        resu = []
        for i in json_data.get("pods"):
            json_data["pod_name"] = i
            result = cls.get_msg(json_data)
            log.info("result")
            resu.append(result)

        for i in resu:
            pass
        return resu