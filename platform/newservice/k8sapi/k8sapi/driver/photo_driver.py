# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/7 下午1:54
import json
import requests
from conf import conf
from common.logs import logging as log


def photo_dir(dict_data):
    photo_url = 'http://%s/api/v1.0/pictures' % conf.IMAGE_S
    service_name = dict_data.get('service_name')
    token = dict_data.get('token')

    photo_data = {'name': service_name}
    header = {'token': token}

    try:
        photo_ret = requests.post(photo_url, json.dumps(photo_data), headers=header, timeout=5).text
        log.info('make the photo,url is: %s result is: %s, type is: %s' % (photo_url, photo_ret, type(photo_ret)))
        photo_ret = json.loads(photo_ret)
        if photo_ret.get('status') == 0:
            photo_dir = photo_ret.get('result').get('image_url')
            dict_data['image_dir'] = photo_dir

            log.info('after make the photo, the parameters is: %s' % dict_data)
            return dict_data

        else:
            raise Exception('make the photo error')
    except Exception, e:
        log.error('make the photo error, reason is: %s' % e)
        raise Exception('request the photo url error')
