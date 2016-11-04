#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/17
# Author:wang-xf

from __future__ import division
from time import sleep
from struct_g import MonitorAct
from common.logs import logging as log
from time_tiff import time_diff
import requests
import json
from email_about import email_text


def alarm():
    cnt = 0
    url = "http://send-email.boxlinker.com/send"
    cpu_to_email = []

    while 1:

        monitor_act = MonitorAct()
        node_name = ["192\.168\.1\.11", "192\.168\.1\.12", "192\.168\.1\.13", "192\.168\.1\.14",
                     "192\.168\.1\.18", "192\.168\.1\.4"]
        rtype = ["memory", "cpu", "filesystem"]
        json_data = {"time_long": "2m"}

        for i in node_name:
            for j in rtype:
                # json_data["node_name"] = i


                json_data["rtype"] = j
                result = monitor_act.nape(json_data)
                json_data["result"] = result
                log.info(json_data)
                a = monitor_act.count_msg(json_data)
                log.info("a=====%s" % a)
                rest = a.get("results")
                log.info("总数据===%s" % rest)
                for x in rest:

                    for y in x.get("series"):

                        if y.get("name") == "cpu/usage_rate" or y.get("name") == "filesystem/usage" or y.get("name") == "memory/usage":
                            for k in y.get("values"):
                                if k[1] is None:
                                    pass
                                if k[1] is not None:
                                    if y.get("name") == "cpu/usage_rate" and round(k[1]/4000, 2) <= 0.5:
                                        cnt += 1
                                        proportion = str(round(k[1]/4000, 2)*100)+"%"
                                        now_d = time_diff(float(str(k[0])[:-3]))
                                        node_name = y.get("tags").get("nodename")

                                        r = {"proportion": proportion, "now_d": now_d, "node_name": node_name,
                                             "rtype": "cpu"}
                                        cpu_to_email.append(r)
                                        # if cnt == 1 or (cnt != 0 and cnt/720 >= 1):

                                    elif y.get("name") == "cpu/usage_rate" and round(k[1]/4000, 2) <= 0.5:
                                        cnt = 0
                                    if y.get("name") == "filesystem/usage" and round(k[1]/4000, 2) >= 0.5:
                                        now_d = time_diff(k[0])
                                        pass
                                    if y.get("name") == "memory/usage" and round(k[1]/4000, 2) >= 0.5:
                                        now_d = time_diff(k[0])
                                        pass
                    else:
                        log.info("11111111111111111111")

        if cnt != 0:
            log.info("22222222222222")
            log.info(email_text(cpu_to_email))
            res = requests.post(url, json=email_text(cpu_to_email), timeout=10)
            if res != "<Response [200]>":
                log.error("send email error, reason=%s,type=%s" % (res.text, type(res.text)))

        sleep(120)

if __name__ == "__main__":
    alarm()
