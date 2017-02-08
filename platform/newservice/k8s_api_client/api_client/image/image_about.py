#! /usr/bin python
# -*- coding:utf8 -*-
# Date: 2016/12/13
# Author: wang-xf
import os
import requests
from common.logs import logging as log
import json


class ImageAbout(object):

    def __init__(self):
        pass

    @classmethod
    def image_add(cls, json_data):
        url = "http://%s" % os.environ.get("IMAGE_SERVER")
        headers = {"token": json_data.get("token")}
        json_image = {"name": json_data.get("service_name")}
        try:
            result = json.loads(requests.post(url, headers=headers, timeout=5, json=json_image).text)
            json_data["image_dir"] = result.get("result").get("image_url")
            return json_data
        except Exception, e:
            log.error("image create error, reason=%s" % e)
            return "error"

