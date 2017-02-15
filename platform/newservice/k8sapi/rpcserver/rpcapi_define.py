# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from common.logs import logging as log
from manager.create_manager import CreateManager
from manager.query_manager import QueryManager
from manager.delete_manager import DeleteManager


class KubernetesRpcAPI(object):

    def __init__(self):
        self.create_manager = CreateManager()
        self.query_manager = QueryManager()
        self.delete_manager = DeleteManager()

    def service_create(self, context, parameters=None):
        # log.info("create context data is: %s(%s)" % (context, type(context)))
        return self.create_manager.service_create(context)

    def service_query(self, context, parameters=None):
        return self.query_manager.service_list(context)

    def service_detail(self, context, parameters=None):
        return self.query_manager.service_detail(context)

    def service_delete(self, context, parameters=None):
        return self.delete_manager.service_delete(context)
