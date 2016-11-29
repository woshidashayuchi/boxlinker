#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/20
# Author:王晓峰

import json
from kubernetes_client import KubernetesClient
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log


type_resource = {
    400: "replicationcontroller",
    401: "pod",
    402: "service"
}

level_resource = {
    300: "info",
    301: "warning",
    302: "error"
}

msg_resource = {
    200: "create success",
    201: "select success",
    202: "update success",
    203: "delete success",
    301: "create failed",
    302: "select failed",
    303: "update failed",
    304: "delete failed",
    204: "creating..."
}


def notify_result(user_name,service_name, type, level, msg):
    notify = KubernetesClient()
    result = {
                 "user_name": user_name,
                 "service_name": service_name,
                 "type": type_resource[type],
                 "level": level_resource[level],
                 "message": msg

             }
    json_notify = json.dumps(result)
    try:
        notify.notification(json_notify)
    except Exception, e:
        log.error("notification error,reason=%s" % e)



