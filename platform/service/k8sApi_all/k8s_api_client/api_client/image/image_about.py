#! /usr/bin python
# -*- coding:utf8 -*-
# Date: 2016/12/13
# Author: wang-xf
import os
import requests
import json


class ImageAbout(object):

    def __init__(self):
        pass

    @staticmethod
    def image_server(json_data):
        url = "http://"+os.environ.get("IMAGE_SERVER")
        headers = {"token": json_data.get("token")}
        result = requests.get(url, headers=headers, timeout=5)
        return result

    def add_image(self, json_data):
        result = self.image_server(json_data)
        try:
            image_way = json.loads(result).get("image_dir")
            return image_way
        except Exception, e:
            raise e

    def inner_image(self, json_data):
        pass
