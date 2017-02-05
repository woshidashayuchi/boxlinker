# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import time

from common.logs import logging as log
from common.code import request_result
from common.local_cache import LocalCache
from common.rabbitmq_client import RabbitmqClient

caches = LocalCache(1000)


class UcenterRpcClient(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()
        self.queue = 'ucentercall_api'
        self.timeout = 60

    def user_create(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_usr_crt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_activate(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_usr_act",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_status(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_usr_stu",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_list(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_usr_lst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_info(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_usr_inf",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_update(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_usr_udt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def role_create(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_rol_rol_crt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def role_list(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_rol_rol_lst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def role_info(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_rol_rol_inf",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def role_update(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_rol_rol_udt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def role_delete(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_rol_rol_del",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def password_change(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_pwd_chg",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def password_find(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_pwd_fnd",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def password_reset(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_pwd_rst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def token_login(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tkn_tkn_lgi",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def token_switch(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tkn_tkn_swc",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def token_check(self, context, parameters=None):

        token = context['token']

        log.debug('Ucenter start token check, token=%s' % (token))
        token_info = caches.get(token)
        if (token_info is LocalCache.notFound):
            log.debug('Cache token auth not hit, token=%s' % (token))
            try:
                dict_data = {
                                "api": "uct_tkn_tkn_chk",
                                "context": context,
                                "parameters": parameters
                            }
                ret = self.rbtmq.rpc_call_client(
                           self.queue, self.timeout, dict_data)
            except Exception, e:
                log.error('Rpc client exec error, reason=%s' % (e))
                return request_result(598)

            expire = int(time.time()) + 300
            caches.set(token, {"token_info": ret, "expire": expire})
        else:
            log.debug('Cache token auth hit, token=%s' % (token))
            ret = token_info['token_info']

        return ret

    def token_delete(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tkn_tkn_del",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def team_create(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tem_tem_crt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def team_list(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tem_tem_lst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def team_info(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tem_tem_inf",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def team_update(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tem_tem_udt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def team_delete(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_tem_tem_del",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def project_create(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_pro_pro_crt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def project_list(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_pro_pro_lst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def project_info(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_pro_pro_inf",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def project_update(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_pro_pro_udt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def project_delete(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_pro_pro_del",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_team_add(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_tem_add",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_team_list(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_tem_lst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_team_activate(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_tem_act",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_team_update(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_tem_udt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_team_delete(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_tem_del",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_project_add(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_pro_add",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_project_list(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_pro_lst",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_project_update(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_pro_udt",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def user_project_delete(self, context, parameters=None):

        try:
            dict_data = {
                            "api": "uct_usr_pro_del",
                            "context": context,
                            "parameters": parameters
                        }
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, dict_data)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)
