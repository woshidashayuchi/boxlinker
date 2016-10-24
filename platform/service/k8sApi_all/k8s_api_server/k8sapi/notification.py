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

    101: "create success",
    102: "create failed",
    103: "update success",
    104: "update failed",
    105: "delete success",
    106: "delete failed",
    107: "going..."
}


def notify_result(user_name, service_name, type, code, level):
    notify = KubernetesClient()
    resu = {
                 "service_name": service_name,
                 "type": type_resource[type],
                 "level": level_resource[level],
                 "message": msg_resource[code]

             }
    result = {
        "status":    code,
        "namespace": user_name,
        "data": resu
    }
    json_notify = json.dumps(result)
    log.info("result=%s" % json_notify)
    try:
        notify.notification(json_notify)
    except Exception, e:
        log.error("notification error,reason=%s" % e)



