#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/26
# Author:王晓峰
from pod_to_db import PodStatusUpdate
from common.logs import logging as log


def base_result(status, json_data):

    result = {
                 "status": status,
                 "user_id": json_data.get("user_id"),
                 "service_name": json_data.get("service_name")
             }

    try:
        PodStatusUpdate.anytime_update_pod_status(result)
        return "success"
    except Exception, e:
        log.error("pod status inner database error, status=%s,reason =%s" % (status, e))

