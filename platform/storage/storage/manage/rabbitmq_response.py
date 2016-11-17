# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import storage_manager

from common.logs import logging as log
from common.code import request_result
from common.single import Singleton


class RabbitmqResponse(object):

    __metaclass__ = Singleton

    def __init__(self, queue_name):

        self.storage_manager = storage_manager.StorageManagerAPI()

    def rpc_exec(self, json_data):

        try:
            response = self.storage_manager.storage_manager(json_data)

            return response

        except Exception, e:
            log.error('RPC Server exec error: %s' % (e))
            return request_result(599)
