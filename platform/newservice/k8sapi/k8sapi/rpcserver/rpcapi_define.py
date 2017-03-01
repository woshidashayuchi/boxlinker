# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from common.logs import logging as log
from common.acl import acl_check
from manager.create_manager import CreateManager
from manager.query_manager import QueryManager
from manager.delete_manager import DeleteManager
from manager.update_manager import UpdateManager


class KubernetesRpcAPI(object):

    def __init__(self):
        self.create_manager = CreateManager()
        self.query_manager = QueryManager()
        self.delete_manager = DeleteManager()
        self.update_manager = UpdateManager()

    @acl_check
    def service_create(self, context, parameters):
        return self.create_manager.service_create(parameters)

    @acl_check
    def service_query(self, context, parameters):
        return self.query_manager.service_list(parameters)

    @acl_check
    def service_detail(self, context, parameters):
        return self.query_manager.service_detail(parameters)

    @acl_check
    def service_delete(self, context, parameters):
        return self.delete_manager.service_delete(parameters)

    @acl_check
    def service_update(self, context, parameters):
        return self.update_manager.service_update(parameters)

    @acl_check
    def pods_message(self, context, parameters):
        return self.query_manager.pod_message(parameters)
