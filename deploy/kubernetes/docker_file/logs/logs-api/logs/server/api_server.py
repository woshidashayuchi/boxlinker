#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

from time import sleep

from common.logs import logging as log
from logs.api.restful_api import rest_app_run


if __name__ == "__main__":

    while True:
        try:
            rest_app_run()
        except Exception, e:
            log.warning('Storage RESTful API Server running error, reason=%s'
                        % (e))
        sleep(10)
