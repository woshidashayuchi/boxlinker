# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

import resources_manager
import vouchers_manager
import bills_manager
import balances_manager
import orders_manager

from common.logs import logging as log
from common.code import request_result
from common.token_auth import token_check


class BillingManagerAPI(object):

    def __init__(self):

        self.resources_manager = resources_manager.ResourcesManager()
        self.vouchers_manager = vouchers_manager.VouchersManager()
        self.bills_manager = bills_manager.BillsManager()
        self.balances_manager = balances_manager.BalancesManager()
        self.orders_manager = orders_manager.OrdersManager()

    @token_check
    def resource_create(self, context, parameters):

        try:
            resource_uuid = parameters['resource_uuid']
            resource_name = parameters['resource_name']
            resource_type = parameters['resource_type']
            resource_conf = parameters['resource_conf']
            resource_status = parameters['resource_status']
            resource_orga = parameters['resource_orga']
            resource_user = parameters['resource_user']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_create(
                    resource_uuid, resource_name, resource_type,
                    resource_conf, resource_status, resource_orga,
                    resource_user)

    @token_check
    def resource_delete(self, context, parameters):

        try:
            resource_uuid = context['resource_uuid']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_delete(resource_uuid)

    @token_check
    def resource_update(self, context, parameters):

        try:
            resource_uuid = context['resource_uuid']
            resource_conf = parameters['resource_conf']
            resource_status = parameters['resource_status']
            resource_orga = parameters['resource_orga']
            resource_user = parameters['resource_user']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_update(
                    resource_uuid, resource_conf,
                    resource_status, resource_orga,
                    resource_user)

    @token_check
    def resource_get(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
            role_uuid = user_info['role_uuid']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_get(
                    user_uuid, orga_uuid, role_uuid)

    @token_check
    def voucher_create(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            denomination = parameters['denomination']
            invalid_time = parameters['invalid_time']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.vouchers_manager.voucher_create(
                    user_uuid, denomination, invalid_time)

    @token_check
    def voucher_update(self, context, parameters):

        try:
            user_info = context['user_info']
            orga_uuid = user_info['orga_uuid']
            user_uuid = user_info['user_uuid']
            voucher_uuid = parameters['voucher_uuid']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.vouchers_manager.voucher_update(
                    voucher_uuid, orga_uuid, user_uuid)

    @token_check
    def voucher_get(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
            role_uuid = user_info['role_uuid']
            start_time = parameters['start_time']
            end_time = parameters['end_time']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.vouchers_manager.voucher_get(
                    user_uuid, orga_uuid, role_uuid,
                    start_time, end_time)

    @token_check
    def bill_get(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
            role_uuid = user_info['role_uuid']
            start_time = parameters['start_time']
            end_time = parameters['end_time']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.bills_manager.bill_get(
                    user_uuid, orga_uuid, role_uuid,
                    start_time, end_time)

    @token_check
    def balance_init(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.balances_manager.balance_init(user_uuid, orga_uuid)

    @token_check
    def balance_update(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
            amount = parameters['amount']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.balances_manager.balance_update(user_uuid, orga_uuid, amount)

    @token_check
    def balance_get(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.balances_manager.balance_get(user_uuid, orga_uuid)

    @token_check
    def order_create(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
            resource_uuid = parameters['resource_uuid']
            cost = parameters['cost']
            status = parameters['status']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.orders_manager.order_create(
                    user_uuid, orga_uuid, resource_uuid,
                    cost, status)

    @token_check
    def order_update(self, context, parameters):

        try:
            order_uuid = context['resource_uuid']
            cost = parameters['cost']
            status = parameters['status']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.orders_manager.order_update(
                    order_uuid, cost, status)

    @token_check
    def order_get(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']
            role_uuid = user_info['role_uuid']
            start_time = parameters['start_time']
            end_time = parameters['end_time']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.orders_manager.order_get(
                    user_uuid, orga_uuid, role_uuid,
                    start_time, end_time)


    def billing_manager(self, json_data):

        try:
            dict_data = json.loads(json_data)
            api = dict_data['api']
            context = dict_data['context']
            parameters = dict_data['parameters']
        except Exception, e:
            log.error('parameters error: %s' % (e))
            return json.dumps(request_result(101))

        try:
            func = {
                "bil_rss_rss_crt": self.resource_create,
                "bil_rss_rss_del": self.resource_delete,
                "bil_rss_rss_put": self.resource_update,
                "bil_rss_rss_get": self.resource_get,
                "bil_voc_voc_crt": self.voucher_create,
                "bil_voc_voc_act": self.voucher_update,
                "bil_voc_voc_get": self.voucher_get,
                "bil_bls_bls_get": self.bill_get,
                "bil_blc_blc_add": self.balance_init,
                "bil_blc_blc_put": self.balance_update,
                "bil_blc_blc_get": self.balance_get,
                "bil_odr_odr_crt": self.order_create,
                "bil_odr_odr_put": self.order_update,
                "bil_odr_odr_get": self.order_get
            }

            return json.dumps(func[api](context, parameters))
        except Exception, e:
            log.error('RPC API routing error: %s' % (e))
            return json.dumps(request_result(102))
