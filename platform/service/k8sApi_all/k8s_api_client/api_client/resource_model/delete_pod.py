#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
import json
from kubernetes_client import KubernetesClient
from common.logs import logging as log


class DeletePod(object):
    def __init__(self):
        pass

    @classmethod
    def delete_pod(cls, json_list):

        pod_name = ""

        to_server = {"action": "get", "resources_type": "pods", "parameters": {"namespace": json_list.get("user_name")}}
        kuberclient = KubernetesClient()

        try:
            pods_msg = kuberclient.rpc_pod(to_server)
            resu = json.loads(pods_msg).get("items")
        except Exception, e:
            log.error("query the pods error,reason=%s" % e)

        try:
            for i in resu:
                log.info(i)
                if json_list.get("service_name") == i.get("metadata").get("labels").get("component"):
                    pod_name = i.get("metadata").get("name")
        except Exception, e:
            log.error("iterater pod_name error, reason=%s" % e)

        json_list1 = {"namespace": json_list.get("user_name"), "name": pod_name}
        del_pod1 = {"action": "delete", "resources_type": "replicationcontrollers", "parameters": json_list1}
        del_pod = str(del_pod1)
        kuber_delpod = KubernetesClient()

        try:
            rest = kuber_delpod.rpc_name(del_pod)
            if rest != "<Response [200]>":
                log.error("stop resource error, reason=%s" % rest)
                return "error"
        except Exception, e:
            log.error("delete pod error, reason= %s" % e)
            return "error"


