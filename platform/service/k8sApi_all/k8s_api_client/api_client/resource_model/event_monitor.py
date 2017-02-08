#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/23
# Author: wang-xf
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from kubernetes_client import KubernetesClient
from common.logs import logging as log
from es.to_es import post_es
from time import sleep
import json


class EventMonitor(object):
    def __init__(self):
        pass

    @staticmethod
    def get_namespace_event(json_data):
        get_json = {
                    "action": "get",
                    "resources_type": "events",
                    "parameters": {
                        "namespace": json_data.get("user_name")
                    }
        }
        kuberclient = KubernetesClient()
        result = kuberclient.rpc_name(get_json)
        return result

    def get_event(self, json_data):
        response = []

        svc_name = json_data.get("user_name")+json_data.get("service_name")
        try:
            result = self.get_namespace_event(json_data)
            result = json.loads(result)
        except Exception, e:
            log.error("get namespace events error, reason=%s" % e)
            return False
        items = result.get("items")
        for i in items:
            if svc_name in i.get("involvedObject").get("name"):
                # log.info("**********************%s" % i.get("involvedObject").get("name"))
                response.append(i.get("message"))

        return response

    @staticmethod
    def replace_str(data_list):
        font = data_list.replace("to 192.168.1.13", "").replace("to 192.168.1.14", "").replace("to 192.168.1.18", "")
        result = font.replace("to node \"192.168.1.13\"", "").replace("to node \"192.168.1.14\"",
                                                                      "").replace("to node \"192.168.1.18\"",
                                                                                  "")
        return result

    def mail_es(self, json_data):

        font = []
        a = []
        b = []
        e = ""
        cnt = 1
        while True:
            try:
                font = self.get_event(json_data)
            except Exception, e:
                log.error("get the events error, reason=" % e)
            if len(a) == 0:
                a = font
                a = sorted(set(a), key=a.index)
                for i in a:
                    i = self.replace_str(i)
                    if "image" in i:
                        result = post_es(json_data, i)
                        log.info("es result == %s" % result)
                    if "error" in i:
                        post_es(json_data, i)
                    if "Started container with docker id" in i and a.index(i) == len(a)-1:
                        post_es(json_data, i)
            else:
                for i in font:
                    if i in a:
                        pass
                    else:
                        b.append(i)
                a = font
            if len(b) != 0:
                b = sorted(set(b), key=b.index)
                for i in b:
                    i = self.replace_str(i)
                    if "image" in i:
                        result = post_es(json_data, i)
                        log.info("es result == %s" % result)
                    if "error" in i:
                        post_es(json_data, i)
                    if "Started container with docker id" in i and a.index(i) == len(a)-1:
                        post_es(json_data, i)

            for i in a:
                if a.index(i)+1 < len(a):
                    if "Started container with docker id" in i and a.index(i) == len(a)-1:
                        log.info("exited from a...")
                        e = "eee"
                        break
                    if "Error syncing pod" in i or "Failed to start container" in i:
                        log.info("exited from a_1...")
                        e = "eee"
                        break

            for i in b:
                if b.index(i)+1 < len(b):
                    if "Started container with docker id" in i and b.index(i) == len(b)-1:
                        log.info("exited from b...")
                        e = "eee"
                        break
                    if "Error syncing pod" in i or "Failed to start container" in i:
                        log.info("exited from b_1...")
                        e = "eee"
                        break
            if e == "eee":
                break
            if cnt == 720:
                break

            b[:] = []
            cnt += 1
            log.info("waiting for exiting...")
            sleep(5)
