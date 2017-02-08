#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/4
# Author:wang-xf
from __future__ import division
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
import json
from kubernetes_client import KubernetesClient
from common.logs import logging as log
from console_k import ConsoleAct
import code


def pod_messages(json_list):
    pods = []
    to_server = {"action": "get", "resources_type": "pods", "parameters": {"namespace": json_list.get("user_name")}}
    kuberclient = KubernetesClient()
    try:

        pods_msg = kuberclient.rpc_pod(to_server)
        resu = json.loads(pods_msg).get("items")

        for i in resu:
            if i.get("status").get("phase") == "Running" or resu.get("status").get("phase") == "Ready":
                pod_name = i.get("metadata").get("name")
                pods.append(pod_name)
            else:
                log.info("important message: in this namespace, some pods not running!!!")

    except Exception, e:
        log.error("query the pods error,reason=%s" % e)

    console = ConsoleAct()
    to = {"user_name": json_list.get("user_name"), "pods": pods}
    res = console.pos(to)
    log.info(res)

    # if res.get("cpu_limit") != 0 and res.get("cpu_usage") is not None and res.get("cpu_limit") is not None:
    #     cpu_b = abs(int(res.get("cpu_usage")))/abs(int(res.get("cpu_limit")))

    # else:
    #     cpu_b = 0
    # if res.get("memory_limit") != 0 and res.get("memory_limit") is not None and res.get("memory_usage") is not None:
    #     memory_b = abs(int(res.get("memory_usage")))/abs(int(res.get("memory_limit")))
    # else:
    #     memory_b = 0
    # cpu_b = str(100-cpu_b*100) + "%"
    # memory_b = str(100-memory_b*100) + "%"
    # bb = {"cpu_limit": res.get("cpu_limit")/200, "cpu_usage": res.get("cpu_usage")/200,
    #       "memory_limit": res.get("memory_limit")/1000000, "memory_usage": res.get("memory_usage")/1000000}
    # aa = {"cpu_b": cpu_b, "memory_b": memory_b}
    # aa.update(bb)

    bb = {"cpu_usage": res.get("cpu_usage"), "memory_usage": res.get("memory_usage")}
    return code.request_result(0, bb)
