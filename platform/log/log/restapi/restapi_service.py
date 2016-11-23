#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

from time import sleep

from common.logs import logging as log
from restful_api import rest_app_run


def log_server():

    while True:
        try:
            log.info('Starting Log Restful API Server')
            rest_app_run()
        except Exception, e:
            log.warning('Log RESTful API Server running error, reason=%s'
                        % (e))
        sleep(10)


if __name__ == "__main__":

    log_server()
