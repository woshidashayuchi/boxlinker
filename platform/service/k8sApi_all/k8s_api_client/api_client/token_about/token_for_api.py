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
        log.info("test1--...................")
        user_info = get_userinfo(token)['user_info']
        log.info(user_info)

        user_info = json.loads(user_info)
        user_name = user_info['user_orga']
        user_id = user_info['user_uuid']
        user_orga = user_info["orga_uuid"]
        role_uuid = user_info["role_uuid"]
        return user_id, user_name, user_orga, role_uuid
