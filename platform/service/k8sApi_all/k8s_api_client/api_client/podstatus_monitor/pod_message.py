#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/8
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
import json
from kubernetes_client import KubernetesClient
from common.logs import logging as log
from response_code import code
from access_mode import con_access


def pod_messages(json_list):
    pod = []

    to_server = {"action": "get", "resources_type": "pods", "parameters": {"namespace": json_list.get("user_name")}}
    kuberclient = KubernetesClient()
    try:
        pods_msg = kuberclient.rpc_pod(to_server)
        resu = json.loads(pods_msg).get("items")
        log.info(pods_msg)

        for i in resu:
            if json_list.get("user_name")+json_list.get("service_name") == i.get("metadata").get("labels").get("component"):
                for j in i.get("spec").get("containers"):

                    p = {"ports": j.get("ports")}

                    p.update(json_list)
                    con_ret = con_access(p)
                    log.info(con_ret)

                log.info(con_ret)
                pod_ms = {"pod_phase": i.get("status").get("phase"), "pod_name": i.get("metadata").get("name"),
                          "pod_ip": i.get("status").get("podIP"), "containers": con_ret}
                pod.append(pod_ms)
        return code.request_result(0, pod)
    except Exception, e:
        log.error("query the pods error,reason=%s" % e)
