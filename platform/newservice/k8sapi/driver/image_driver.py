# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/20
import json
import requests
from conf import conf
from common.logs import logging as log


def image_dir(dict_data):
    url = conf.IMAGE_SERVER
    headers = {"token": dict_data.get("token")}
    json_image = {"name": dict_data.get("service_name")}
    try:
        ret = requests.post(url, headers=headers, timeout=5, json=json_image)
        log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>========%s,type:%s' % (ret, type(ret)))
        result = json.loads(ret.text)
        log.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>========%s,type:%s' % (result, type(result)))
        dict_data["image_dir"] = result.get("result").get("image_url")
        return dict_data
    except Exception, e:
        log.error("image create error, reason=%s" % e)
        return False