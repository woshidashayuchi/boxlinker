#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/5
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from token_decode import get_userinfo
import json


class TokenForApi(object):
    def __init__(self):
        pass

    @classmethod
    def get_msg(cls, token):
        user_info = get_userinfo(token)['user_info']
        log.info("``````````````-----------%s" % user_info)
        user_info = json.loads(user_info)
        user_name = user_info['user_name']
        # user_role = user_info['user_role']
        # user_orag = user_info['user_orag']
        # user_ip = user_info['user_ip']
        user_id = user_info['uid']

        return user_id, user_name
