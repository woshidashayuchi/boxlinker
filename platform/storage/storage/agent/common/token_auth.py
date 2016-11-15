# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import time
import inspect
import requests

from common.logs import logging as log
from common.local_cache import LocalCache


caches = LocalCache(100)


def u_token_auth(token):

    token_info = caches.get(token)
    log.debug('token_info = %s' % (token_info))
    if (token_info is LocalCache.notFound):
        # url = 'http://auth.boxlinker.com/user/check_token_get'
        url = 'http://registry-api:8080/user/check_token_get'
        headers = {'token': token}

        try:
            r = requests.get(url, headers=headers)
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

        func_args = inspect.getcallargs(func, *args, **kwargs)
        token = func_args.get('token')

        log.debug('token=%s' % (token))

        userinfo_auth = u_token_auth(token)
        if userinfo_auth == 0:
            result = func(*args, **kwargs)
        else:
            log.warning('User token auth denied: token = %s' % (token))

            raise

        return result

    return _tokenauth
