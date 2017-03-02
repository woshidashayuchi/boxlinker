# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/20
import json
import requests
from conf import conf
from common.logs import logging as log


def image_dir(dict_data):
    image_server = conf.IMAGE_SERVER
    url = image_server.replace('image_uuid', dict_data.get('image_id'))
    headers = {"token": dict_data.get("token")}

    try:
        result = requests.get(url, headers=headers, timeout=5)

        log.info('the image message is:%s, type is: %s' % (result, type(result)))
        if result.get('status') != 0:
            return False
    except Exception, e:
        log.error('get the image name and version based on image id error, reason=%s' % e)
        return False

    # image_name = result.get('result').get

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


def images_message_get(dict_data):
    image_id = dict_data.get('image_id')
    image_server = conf.IMAGE_S

    url = 'http://%s/api/v1.0/imagerepo/image/tagid/%s' % (image_server, image_id)
    token = dict_data.get('token')
    headers = {'token': token}

    try:
        image_message = requests.get(url, headers=headers, timeout=5).text
        image_result = json.loads(image_message)
        log.info('the image message from image_id is: %s, type is: %s' % (image_message, type(image_message)))
        if image_result.get('status') != 0:
            return False

        image_name = conf.IMAGE_H + image_result.get('result').get('image_name')
        image_version = image_result.get('result').get('tag')
    except Exception, e:
        log.error('get the images message error, reason is: %s' % e)
        return False

    return image_name, image_version
