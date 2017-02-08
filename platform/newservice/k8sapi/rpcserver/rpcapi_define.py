# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from common.logs import logging as log
from manager.create_manager import CreateManager


class KubernetesRpcAPI(object):
    def __init__(self):
        self.create_manager = CreateManager()

    def service_create(self, context, parameters=None):
        log.info("create context data is: %s(%s)" % (context, type(context)))
        return self.create_manager.service_create(context)
