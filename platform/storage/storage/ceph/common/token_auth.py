# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import time
import inspect
import requests

from common.logs import logging as log
from common.local_cache import LocalCache
from common.code import request_result


requests.adapters.DEFAULT_RETRIES = 5
caches = LocalCache(100)
url = 'https://auth.boxlinker.com/api/v1.0/usercenter/tokens'


def token_auth(token):

    token_info = caches.get(token)
    log.debug('token_info = %s' % (token_info))
    if (token_info is LocalCache.notFound):
        headers = {'token': token}

        try:
            r = requests.get(url, headers=headers, timeout=5)
            status = r.json()['status']
        except Exception, e:
            log.error('Token auth api error: reason=%s' % (e))

            raise

        expire = int(time.time()) + 300
        caches.set(token, {"status": status, "expire": expire})
    else:
        status = token_info['status']

    log.debug('status = %d' % (status))

    return status


def token_check(func):

    def _tokenauth(*args, **kwargs):

        try:
            func_args = inspect.getcallargs(func, *args, **kwargs)
            token = func_args.get('token')
            if token is None:
                token = func_args.get('context')['token']

            log.debug('token=%s' % (token))

            userinfo_auth = token_auth(token)
            if userinfo_auth == 0:
                try:
                    result = func(*args, **kwargs)
                except Exception, e:
                    log.error('function(%s) exec error, reason = %s'
                              % (func.__name__, e))
                    return request_result(601)
            else:
                log.warning('User token auth denied: token = %s' % (token))
                raise

            return result
        except Exception, e:
            log.error('Token auth error, reason=%s' % (e))
            return request_result(201)

    return _tokenauth
