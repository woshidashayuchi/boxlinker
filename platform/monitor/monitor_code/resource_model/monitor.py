#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/21
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common1.pod_list import list_pod
from common1.logs import logging as log
import os
import requests
from response_code import code
from kubernetes_client import KubernetesClient
import json
import os


class DataA(object):
    def __init__(self):
        pass

    def get_pods(self, namespace):
        log.info("RABBITMQ_HOST=%s"%os.environ.get("RABBITMQ_HOST"))
        log.info("RABBITMQ_PORT=%s"%os.environ.get("RABBITMQ_PORTS"))
        pod = []

        to_server = {"action": "get", "resources_type": "pods", "parameters": {"namespace": namespace}}
        kuberclient = KubernetesClient()
        try:
            pods_msg = kuberclient.rpc_pod(to_server)
            resu = json.loads(pods_msg).get("items")
            log.info("ffffff====%s" % resu)
            for i in resu:
                pod.append(i.get("metadata").get("name"))
            return pod
        except Exception, e:
            log.error("query the pods error,reason=%s" % e)
            return False

    def get_data(self, json_data):
        namespace = json_data.get("namespace")
        pod_list = json_data.get("pod_list")
        rtype = json_data.get("rtype")
        pods = ""
        url = ""
        try:
            pods = list_pod(pod_list)
        except Exception, e:
            log.error("exchange the pod list to string error, reason=%s" % e)

        if rtype == "cpu":
            url = "http://%s/api/v1/model/" \
                  "namespaces/%s/pod-list/%s/metrics/cpu/usage_rate" % (os.environ.get("HEAPSTER"),
                                                                        namespace, pods)
        if rtype == "memory":
            url = "http://%s/api/v1/model/" \
                  "namespaces/%s/pod-list/%s/metrics/memory/usage" % (os.environ.get("HEAPSTER"),
                                                                       namespace, pods)
        if rtype == "network":
            url = "http://%s/api/v1/model/" \
                  "namespaces/%s/pod-list/%s/metrics/network/tx_rate" % (os.environ.get("HEAPSTER"),
                                                                         namespace, pods)
            res1 = json.loads(requests.get(url).text)

            url = "http://%s/api/v1/model/" \
                  "namespaces/%s/pod-list/%s/metrics/network/rx_rate" % (os.environ.get("HEAPSTER"),
                                                                         namespace, pods)
            res2 = json.loads(requests.get(url).text)

            result = {"tx_rate": res1, "rx_rate": res2}

            return result
        resu = json.loads(requests.get(url).text)
        log.info(resu)
        return resu

    def get_namespace_msg(self, json_data):
        namespace = json_data.get("namespace")
        query = self.get_pods(namespace)
        log.info("*************%s" % query)
        json_data.update({"pod_list": query})
        result = self.get_data(json_data)
        aaa = []

        res = []
        if json_data.get("rtype") != "network":
            for j in result.get("items")[0].get("metrics"):
                timestamp = j.get("timestamp")
                aaa.append({"timestamp": timestamp, "value": 0})
            for i in aaa:
                for x in result.get("items"):
                    for y in x.get("metrics"):
                        if y.get("timestamp") == i.get("timestamp"):
                            i["value"] = float(y.get("value")) + float(i.get("value"))

        return aaa
