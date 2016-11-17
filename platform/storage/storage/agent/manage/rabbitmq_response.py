# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json
import ceph_manager

from common.logs import logging as log
from common.code import request_result
from common.single import Singleton


class RabbitmqResponse(object):

    __metaclass__ = Singleton

    def __init__(self, queue_name):

        self.ceph_manager = ceph_manager.CephManagerAPI()

    def rpc_exec(self, json_data):

        try:
            response = self.ceph_manager.ceph_manager(json_data)

            return json.dumps(response)

        except Exception, e:
            log.error('RPC Server exec error: %s' % (e))
            return json.dumps(request_result(599))
