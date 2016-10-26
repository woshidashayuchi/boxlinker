#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/5
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from flask import request
from token_for_api import TokenForApi
from common.logs import logging as log


def p_out():
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        return user_id, user_name, user_orga, role_uuid
    except Exception, e:
        log.error("User authentication failed, reason=%s" % e)
        return {"status": "failed"}

