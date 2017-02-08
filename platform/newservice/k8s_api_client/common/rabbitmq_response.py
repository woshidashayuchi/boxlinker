# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from api_client import podstatus
from common.logs import logging as log
from common.single import Singleton


class RabbitmqResponse(object):

    __metaclass__ = Singleton

    def __init__(self, queue_name):

        self.pod_statu = podstatus.PodStatus()

    def rpc_exec(self, json_data):
        try:
            log.info(json_data)
            response = self.pod_statu.update_podstatus(json_data)
            return response

        except Exception, e:
            log.error('RPC Server exec error: %s' % e)
            return '系统维护中，请稍后再试'
