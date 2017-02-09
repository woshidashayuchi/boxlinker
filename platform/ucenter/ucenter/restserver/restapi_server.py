#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

from time import sleep

from conf import conf
from common.logs import logging as log
from ucenter.restserver.restapi_register import rest_app_run

reload(sys)
sys.setdefaultencoding('utf8')


def server_start():

    while True:
        try:
            log.info('Starting %s Restful API Server' % (conf.service_name))
            rest_app_run()
        except Exception, e:
            log.warning('%s RESTful API Server running error, reason=%s'
                        % (conf.service_name, e))
        sleep(10)


if __name__ == "__main__":

    server_start()
