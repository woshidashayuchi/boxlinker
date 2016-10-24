#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/23
# Author:王晓峰
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
import json
from kubernetes_client import KubernetesClient
from common.logs import logging as log
from time import sleep
from pod_to_db import PodStatusUpdate
from base_call import base_result
from response_code import code


class PodStatus(object):

    def __init__(self):
        pass

    @classmethod
    def monitor_pod_status(cls, json_list):

        # 构建查询串
        to_server = {"action": "get", "resources_type": "pods", "parameters": {"namespace": json_list.get("user_name")}}

        while True:

            kuberclient = KubernetesClient()

            try:
                pods_msg = kuberclient.rpc_pod(to_server)
                log.info("pods_msg-----------------")
            except Exception, e:
                log.error("can't get the message of pods, reason=%s" % e)

            resu = json.loads(pods_msg).get("items")

            for i in resu:
                log.info(i)
                if json_list.get("service_name") in i.get("metadata").get("name"):
                    pod_statues = i.get("status").get("containerStatuses")
                    for j in pod_statues:
                        state = j.get("state")
                        if 'running' in state.keys():

                            status = "running"

                            if base_result(status, json_list) != "success":
                                return code.request_result(403)

                            break
                        elif 'waiting' in state.keys():
                            status = state.get("waiting").get("reason")

                            if base_result(status, json_list) != "success":
                                return code.request_result(403)

                            break

                        else:
                            status = 'others'

                            if base_result(status, json_list) != "success":
                                return code.request_result(403)

                            break
                break
            break


