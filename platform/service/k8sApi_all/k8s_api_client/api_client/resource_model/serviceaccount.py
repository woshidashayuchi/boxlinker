#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/24
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from kubernetes_client import KubernetesClient
import json


class ServiceAccount(object):
    def __init__(self):
        pass

    def serviceAccount_json(self, json_list):
        namespace = json_list.get("user_name")
        json_data = {"namespace1": namespace, "name": "default"}
        account_get = {"action": "get", "resources_type": "serviceAccount", "parameters": json_data}
        try:
            kuber = KubernetesClient()
            x = kuber.rpc_name(account_get)
            log.info(x)
            res = json.loads(x)
            account_json = {
                "namespace": namespace,
                "name": "default",
                "rtype": "serviceaccounts",
                "kind": "ServiceAccount",
                "apiVersion": "v1",
                "metadata": {
                    "name": "default",
                    "namespace": namespace,
                },
                "secrets": res.get("secrets"),
                "imagePullSecrets": [
                    {
                        "name": "registry-key"
                    }
                  ]
            }
            put_json = {"action": "put", "resources_type": "serviceAccount", "parameters": account_json}
            log.info("111111111111111111111")
            kubers = KubernetesClient()
            result = kubers.rpc_name(put_json)
            log.info("22222222222222222222")
            log.info("result=======account=======%s" % result)
            return result
        except Exception, e:
            log.error("get the serviceaccount error, reason=%s" % e)
            return "error"


