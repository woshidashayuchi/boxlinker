#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/17
# Author:wang-xf

import time
from rfc3339 import rfc3339
import requests
from logs import logging as log
from response_code import code
import json
import os


def artic_time(json_data):
    time_long = "30m"
    rtype = ""
    try:
        time_long = int(json_data.get("time_long")[:-1])*60
        log.info(time_long)
    except Exception, e:
        log.error("artic time long error, reason=%s" % e)
    nowtime = rfc3339(time.time()-8*60*60)[:-6]+"Z"
    start_time = rfc3339(time.time()-time_long-8*60*60)[:-6]+"Z"

    if json_data.get("rtype") == "cpu":
        rtype = "cpu/usage_rate"
    if json_data.get("rtype") == "memory":
        rtype = "memory/usage"

    url = "http://%s/api/v1/model/namespaces/%s/metrics/%s?start=%s&end=%s" % (os.environ.get("HEAPSTER"), json_data.get("namespace"), rtype, start_time, nowtime)
    log.info(start_time)
    log.info(nowtime)
    try:
        result = requests.get(url)
        log.info(result.text)
        return code.request_result(0, json.loads(result.text))
    except Exception, e:
        log.error("get the namespace metrics error, reason=%s" % e)
        return code.request_result(601)
