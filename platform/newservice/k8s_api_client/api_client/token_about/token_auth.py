#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/5
# Author:王晓峰

import requests
import inspect
import os
from common.logs import logging as log


def u_token_auth(token):
    url = "http://%s" % os.environ.get('AUTHOR_HOST')

    headers = {'token': token}

    try:
        r = requests.get(url, headers=headers)
        log.info(r)
        ret = r.json()['status']
        log.info(ret)
    except Exception, e:
        return e

    return ret


def token_check(func):

    def _tokenauth(*args, **kwargs):

        func_args = inspect.getcallargs(func, *args, **kwargs)
        token = func_args.get('token')

        userinfo_auth = u_token_auth(token)
        if userinfo_auth == 0:
            result = func(*args, **kwargs)
        else:
            return ('User token auth denied: token = %s' % (token))


        return result

    return _tokenauth