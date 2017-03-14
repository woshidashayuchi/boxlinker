# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from conf import conf
from common.logs import logging as log
from common.code import request_result
from common.parameters import rpc_data
from common.rabbitmq_client import RabbitmqClient


class BillingRpcApi(object):

    def __init__(self):

        self.rbtmq = RabbitmqClient()
        self.queue = conf.billing_call_queue
        self.cast_queue = conf.billing_cast_queue
        self.timeout = 60

    def level_init(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_lvl_lvl_ini", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def level_info(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_lvl_lvl_inf", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def balance_init(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_blc_blc_add", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def balance_info(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_blc_blc_inf", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def recharge_precreate(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rcg_rcg_pcr", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def recharge_create(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rcg_rcg_crt", context, parameters)
            return self.rbtmq.rpc_cast_client(
                        self.cast_queue, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def recharge_list(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rcg_rcg_lst", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def recharge_info(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rcg_rcg_inf", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def cost_accounting(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_cst_cst_inf", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def limit_check(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_lmt_lmt_chk", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def limit_list(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_lmt_lmt_lst", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def limit_update(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_lmt_lmt_udt", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def resource_create(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rss_rss_crt", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def resource_delete(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rss_rss_del", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def resource_update(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rss_rss_put", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def resource_list(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_rss_rss_lst", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def voucher_create(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_voc_voc_crt", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def voucher_active(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_voc_voc_act", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def voucher_list(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_voc_voc_lst", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def bill_list(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_bls_bls_lst", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def order_create(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_odr_odr_crt", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def order_update(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_odr_odr_put", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)

    def order_list(self, context, parameters=None):

        try:
            rpc_body = rpc_data("bil_odr_odr_lst", context, parameters)
            return self.rbtmq.rpc_call_client(
                        self.queue, self.timeout, rpc_body)
        except Exception, e:
            log.error('Rpc client exec error, reason=%s' % (e))
            return request_result(598)
