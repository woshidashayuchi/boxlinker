#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/26
# Author:wang-xf

import sys
import requests
import os
import json
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log


class CallBilling(object):

    def __int__(self):
        pass

    @classmethod
    def base_con(cls, json_list):
        token_u = json_list.get("token")
        resource_uuid = json_list.get("uid_font")
        resource_name = json_list.get("service_name")
        resource_type = "app"
        resource_conf = str(json_list.get("container_cpu"))+"X"
        resource_status = "Pending"
        resource_orga = json_list.get("user_orga")
        resource_user = json_list.get("user_id")
        headers = {"token": token_u}
        log.info("token=====%s"%token_u)
        to_billing = {"resource_uuid": resource_uuid, "resource_name": resource_name,
                      "resource_type": resource_type, "resource_conf": resource_conf,
                      "resource_status": resource_status, "resource_orga": resource_orga,
                      "resource_user": resource_user}
        url = "http://%s" % os.environ.get("BILLING")
        log.info(resource_uuid)
        log.info("urlllllllll====%s" % url)
        try:
            result = requests.post(url, data=json.dumps(to_billing), headers=headers).text
            log.info(result)
            if json.loads(result).get("status") == 0:
                return True
            else:
                return False
        except Exception, e:
            log.error("post to billing error, reason=%s" % e)
            return False
