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
        try:
            return self.kubernetes.post_namespace_resource(context)
        except Exception, e:
            log.error('create the service(kubernetes) error, reason=%s' % e)

    def ns_show(self, context, parameters=None):
        try:
            log.info('getting the namespace message...')
            return self.kubernetes.show_namespace(context)
        except Exception, e:
            log.error('get the namespace(kubernetes) error, reason=%s' % e)

    def ns_cre(self, context, parameters=None):
        try:
            return self.kubernetes.post_namespace(context)
        except Exception, e:
            log.error('create the namespace(kubernetes) error, reason=%s' % e)

    def svc_account_show(self, context, parameters=None):

        try:
            return self.kubernetes.get_account(context)
        except Exception, e:
            log.error('get the service account(kubernetes) error, reason=%s' % e)

    def secret_cre(self, context, parameters=None):
        try:
            return self.kubernetes.post_secret(context)
        except Exception, e:
            log.error('create the secret(kubernetes) error, reason=%s' % e)

    def svc_account_create(self, context, parameters=None):
        try:
            return self.kubernetes.post_account(context)
        except Exception, e:
            log.error('create the account(kubernetes) error, reason=%s' % e)

    def svc_delete(self, context, parameters=None):
        try:
            return self.kubernetes.delete_name_resource(context)
        except Exception, e:
            log.error('delete the service(kubernetes) error, reason=%s' % e)

    def pods_messages(self, context, parameters=None):
        try:
            return self.kubernetes.get_namespace_resource(context)
        except Exception, e:
            log.error('get pods messages(kubernetes) error, reason=%s' % e)
