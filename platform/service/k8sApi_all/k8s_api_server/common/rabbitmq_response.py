# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.logs import logging as log
from common.single import Singleton

#from api import center_manager
from k8sapi import k8s_manager


class RabbitmqResponse(object):

    __metaclass__ = Singleton

    def __init__(self, queue_name):

        if queue_name == 'center_control':

            self.center_manager = center_manager.CenterManagerAPI()

        elif queue_name == 'kubernetes_control':

            self.k8s_manager = k8s_manager.KubernetesManagerAPI()

        else:
            log.warning('There is no queue_name %s.' % (queue_name))

    def rpc_exec(self, json_data):
        try:
            response = self.k8s_manager.kubernetes_manager(json_data)

            return response

        except Exception, e:
            log.error('RPC Server exec error: %s' % (e))
            return '系统维护中，请稍后再试。'


