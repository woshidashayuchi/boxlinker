#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/20
# Author:王晓峰

from operate_result import SuccessOrFailed
import json
from notification import notify_result


class NotifyForResource(object):
    def __init__(self):
        pass

    @classmethod
    def delete_pod_notify(cls, response, json_list):
        result = SuccessOrFailed.pod_delete_result(response)

        if result == "success":
            namespace = json.loads(response).get("metadata").get("namespace")
            svc_name = json.loads(response).get("metadata").get("name").replace(namespace, "")
            notify_result(namespace, svc_name, 402, 300, 200)
        elif result == "failed":
            notify_result(namespace, svc_name, 402, 300, 200)
