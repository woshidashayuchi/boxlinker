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
from response_code import code
from time import sleep
from monitor_test import Show


class ShowMessage(object):
    def __init__(self):
        pass

    @classmethod
    def get_msg(cls, json_data):

        cnt = 0

        response = []
        rname =""
        values = ""
        while True:
            result = Show.get_msg(json_data)
            log.info("log>>>>>>>>>>>>>>>>>>>>>")
            log.info(result)
            BASEURL = "http://%s/api/datasources/proxy/1/query?db=k8s&q=" % os.environ.get("GRAFANA")
            get_sql = ""
            y = {"time_long": "1m"}
            json_data.update(y)
            respon = {}
            if cnt >= 2:
                return
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
                sleep(5)
                continue

            try:
                log.info("++++++++++++++++++%s" % result)
                for i in get_sql.keys():
                    change = i
                    res_sql = get_sql.get(change)
                    res = json.loads(requests.get(BASEURL+res_sql).text)
                    for i in res.get("results"):
                        if i.get("series") == None:
                            pass
                        else:
                            for j in i.get("series"):
                                rname = j.get("name")
                                values = j.get("values")
                            respon = {"name": rname, "value": values}
                    response.append(respon)
                for i in response:
                    for j in result:
                        if i.get("name") == j.get("name"):
                            if j.get("value")[-1][0] == i.get("value")[1][0]:
                                log.info("<<<<<<<<<<<<<<<<<")
                                log.info(j.get("value")[-1][0])
                                log.info(i.get("value")[1][0])
                                pass
                            else:
                                log.info(">>>>>>>>>>>>>>>>>")
                                log.info(j.get("value")[-1][0])
                                log.info(i.get("value")[1][0])
                                j.get("value").append(i.get("value")[1])
                yield json.dumps(response).decode('utf-8')
                    # result.append(json.loads(requests.get(BASEURL+res_sql).text))
                    # result["aaa"] = json.loads(requests.get(BASEURL+res_sql).text)

            except Exception, e:
                log.error("get the result error, reason=%s" % e)
                yield "error"
            cnt += 1

            sleep(5)
