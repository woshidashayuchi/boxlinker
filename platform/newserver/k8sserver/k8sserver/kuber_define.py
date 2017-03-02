# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

import json
from common.logs import logging as log
from kubernetes.kapi import KApiMethods
from es_manager.to_es import post_es


class KubernetesRpcAPIs(object):

    def __init__(self):
        self.kubernetes = KApiMethods()

    def service_crea(self, context, parameters=None):
        try:
            token = context.pop('token')
            ret = self.kubernetes.post_namespace_resource(context)
            ret = json.loads(ret)

            context['token'] = token
            if ret.get('kind') != 'ReplicationController' and ret.get('kind') != 'Service':

                log.info('CREATE SERVICE ERROR WHEN USE KUBERNETES API TO CREATE... result is:%s,'
                         'type is:%s' % (ret, type(ret)))
                post_es(context, 'service create failure')

            log.info('create service success, result is:%s, type is: %s' % (ret, type(ret)))

            es = post_es(context, 'service create success')
            log.info('zzzzzzzzzaaaaaaaaaaaaaa%s' % es)
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

    def svc_update(self, context, parameters=None):
        try:
            return self.kubernetes.put_name_resource(context)
        except Exception, e:
            log.error('update service(%s) error, reason=%s' % (context.get('rtype'), e))

    def get_one_re(self, context, parameters=None):
        try:
            return self.kubernetes.get_name_resource(context)
        except Exception, e:
            log.error('get resource(%s) error, reason=%s' % (context.get('rtype'), e))
