# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import time

from common.logs import logging as log


def time_log(func):

    def __wrapper(*args, **kwargs):

        log.info('function(%s) start execute' % (func.__name__))

        start_time = time.time()

        try:
            result = func(*args, **kwargs)
        except Exception, e:
            result = '系统维护中，请稍后再试。'
            log.error('function(%s) exec error, reason = %s'
                      % (func.__name__, e))

        end_time = time.time()
        exec_time = end_time - start_time
        log.info('function(%s) end execute, execute_time = %d'
                 % (func.__name__, exec_time))

        return result

    return __wrapper
