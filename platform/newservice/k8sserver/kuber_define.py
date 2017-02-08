# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from common.logs import logging as log
from kubernetes.kapi import KApiMethods


class KubernetesRpcAPIs(object):
    def __init__(self):
        self.kubernetes = KApiMethods()

    def service_crea(self, context, parameters=None):
        log.info("create context is: %s(%s)" % (context, type(context)))
        return self.kubernetes.test(context)
