# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.logs import logging as log
from common.single import Singleton

#from api import center_manager
from k8sapi import k8s_manager


class RabbitmqResponse(object):

    __metaclass__ = Singleton

    def __init__(self, queue_name):
        log.info('gonginginginginging*********')
        self.k8s_manager = k8s_manager.KubernetesManagerAPI()
       
    def rpc_exec(self, json_data):
        try:
            log.info("***********111111***********")
            log.info(json_data)
            response = self.k8s_manager.kubernetes_manager(json_data)
            log.info("*************2222222222**********")
            log.info(response)
            return response

        except Exception, e:
            log.error('RPC Server exec error: %s' % (e))
            return '系统维护中，请稍后再试。'
