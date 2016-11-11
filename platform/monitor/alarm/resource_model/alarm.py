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
from email_about import EmailAb


def alarm():

    cnt = 0
    url = "http://send-email.boxlinker.com/send"

    email_ab = EmailAb()
    while 1:
        log.info("cntcntcntcntcntcntcntcntcnt------%s" % cnt)
        to_email = []
        monitor_act = MonitorAct()
        node_name = ["192\\.168\\.1\\.11", "192\\.168\\.1\\.12", "192\\.168\\.1\\.13", "192\\.168\\.1\\.14",
                     "192\\.168\\.1\\.18", "192\\.168\\.1\\.4"]
        rtype = ["memory", "cpu", "filesystem"]
        json_data = {"time_long": "1m"}

        for i in node_name:
            for j in rtype:
                json_data["node_name"] = i
                json_data["rtype"] = j
                result = monitor_act.nape(json_data)
                json_data["result"] = result

                a = monitor_act.count_msg(json_data)

                xx = ""
                x = a.get("results")
                log.info("aaaaaaaaaaaa===%s" % x)
                if x is not None:

                    try:
                        xx = x[0].get("series")[0].get("name")
                        node_name = a.get("results")[0].get("series")[0].get("tags").get("nodename")
                    except Exception, e:
                        log.error("hava no node_name, reason=%s" % e)

                if xx == "cpu/usage_rate" or xx == "filesystem/usage" or xx == "memory/usage":

                    for k in x[0].get("series")[0].get("values"):
                        if k[1] is None:
                            pass
                        if k[1] is not None:
                            if xx == "cpu/usage_rate" and round(k[1]/4000, 2) <= 0.5:

                                now_d = time_diff(float(str(k[0])[:-3]))
                                proportion = str(round(k[1]/4000, 2)*100)+"%"

                                r = {"proportion": proportion, "now_d": now_d, "node_name": node_name,
                                     "rtype": "cpu"}

                                to_email.append(r)

                                log.info("uuuuuuuuuuuuuuuu++++++%s,cnt======%s" % (to_email, cnt))

                            if xx == "filesystem/usage" and round(k[1]/10000000000000, 2) >= 0.5:
                                proportion = str(round(k[1]/10000000000000, 2)*100)+"%"
                                now_d = time_diff(float(str(k[0])[:-3]))
                                r = {"proportion": proportion, "now_d": now_d, "node_name": node_name,
                                     "rtype": "memory"}
                                to_email.append(r)

                            if xx == "memory/usage" and round(k[1]/16268380000, 2) >= 0.5:
                                proportion = str(round(k[1]/16268380000, 2)*100)+"%"
                                now_d = time_diff(float(str(k[0])[:-3]))
                                r = {"proportion": proportion, "now_d": now_d, "node_name": node_name,
                                     "rtype": "filesystem"}
                                to_email.append(r)

        if len(to_email) != 0 and (cnt == 0 or cnt >= 60):
            log.info("emailing=========%s" % to_email)
            try:
                res = requests.post(url, json=email_ab.send_email(to_email), timeout=10)

                if json.loads(res.text).get("status") != 0:
                    log.error("send email error, reason=%s,type=%s" % (res.text, type(res.text)))
                else:
                    log.info("success")
            except Exception, e:
                log.error("send email error, reason=%s" % e)

        cnt = cnt+1

        if cnt > 0 and cnt < 5:
            pass
        elif cnt >= 5:
            cnt = 0
        sleep(120)


if __name__ == "__main__":

    while True:
        try:
            alarm()
        except Exception, e:
            log.error("alarm program startup error, reason=%s" % e)

        sleep(5)