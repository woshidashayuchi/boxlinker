# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from common.logs import logging as log
from common.code import request_result
from common.acl import acl_check
from common.parameters import parameter_check
from common.token_ucenterauth import token_auth

from billing.manager import resources_manager
from billing.manager import vouchers_manager
from billing.manager import bills_manager
from billing.manager import balances_manager
from billing.manager import orders_manager


class BillingRpcManager(object):

    def __init__(self):

        self.resources_manager = resources_manager.ResourcesManager()
        self.vouchers_manager = vouchers_manager.VouchersManager()
        self.bills_manager = bills_manager.BillsManager()
        self.balances_manager = balances_manager.BalancesManager()
        self.orders_manager = orders_manager.OrdersManager()

    @acl_check
    def resource_create(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            team_uuid = user_info.get('team_uuid')
            project_uuid = user_info.get('project_uuid')

            resource_uuid = parameters.get('resource_uuid')
            resource_name = parameters.get('resource_name')
            resource_type = parameters.get('resource_type')
            resource_conf = parameters.get('resource_conf')
            resource_status = parameters.get('resource_status')

            resource_uuid = parameter_check(resource_uuid, ptype='pstr')
            resource_name = parameter_check(resource_name, ptype='pnam')
            resource_type = parameter_check(resource_type, ptype='pstr')
            resource_conf = parameter_check(resource_conf, ptype='pstr')
            resource_status = parameter_check(resource_status, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_create(
                    resource_uuid, resource_name, resource_type,
                    resource_conf, resource_status, user_uuid,
                    team_uuid, project_uuid)

    @acl_check
    def resource_delete(self, context, parameters):

        try:
            resource_uuid = context.get('resource_uuid')

            resource_uuid = parameter_check(resource_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_delete(resource_uuid)

    @acl_check
    def resource_update(self, context, parameters):

        try:
            resource_uuid = context.get('resource_uuid')

            resource_conf = parameters.get('resource_conf')
            resource_status = parameters.get('resource_status')
            user_uuid = parameters.get('user_uuid')
            team_uuid = parameters.get('team_uuid')
            project_uuid = parameters.get('project_uuid')


            resource_uuid = parameter_check(resource_uuid, ptype='pstr')
            resource_conf = parameter_check(resource_conf, ptype='pstr')
            resource_status = parameter_check(resource_status, ptype='pstr')
            user_uuid = parameter_check(user_uuid, ptype='pstr')
            team_uuid = parameter_check(team_uuid, ptype='pstr')
            project_uuid = parameter_check(project_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_update(
                    resource_uuid, resource_conf, resource_status,
                    user_uuid, team_uuid, project_uuid)

    @acl_check
    def resource_list(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            team_uuid = user_info.get('team_uuid')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.resources_manager.resource_list(team_uuid)

    @acl_check
    def voucher_create(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')

            denomination = parameters.get('denomination')
            invalid_time = parameters.get('invalid_time')

            denomination = parameter_check(denomination, ptype='pint')
            invalid_time = parameter_check(invalid_time, ptype='pflt')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.vouchers_manager.voucher_create(
                    user_uuid, denomination, invalid_time)

    @acl_check
    def voucher_active(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            orga_uuid = user_info.get('orga_uuid')
            user_uuid = user_info.get('user_uuid')

            voucher_uuid = parameters.get('voucher_uuid')

            voucher_uuid = parameter_check(voucher_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.vouchers_manager.voucher_active(
                    voucher_uuid, orga_uuid, user_uuid)

    @acl_check
    def voucher_list(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            orga_uuid = user_info.get('orga_uuid')
            role_uuid = user_info.get('role_uuid')

            start_time = parameters.get('start_time')
            end_time = parameters.get('end_time')

            start_time = parameter_check(start_time, ptype='pflt')
            end_time = parameter_check(end_time, ptype='pflt')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.vouchers_manager.voucher_list(
                    user_uuid, orga_uuid, role_uuid,
                    start_time, end_time)

    @acl_check
    def bill_list(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')

            start_time = parameters.get('start_time')
            end_time = parameters.get('end_time')

            start_time = parameter_check(start_time, ptype='pflt')
            end_time = parameter_check(end_time, ptype='pflt')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.bills_manager.bill_list(
                    user_uuid, start_time, end_time)

    @acl_check
    def balance_init(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.balances_manager.balance_init(user_uuid)

    @acl_check
    def balance_update(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')

            amount = parameters.get('amount')

            amount = parameter_check(amount, ptype='pint')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.balances_manager.balance_update(
                    user_uuid, amount)

    @acl_check
    def balance_info(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.balances_manager.balance_info(user_uuid)

    @acl_check
    def order_create(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            team_uuid = user_info.get('team_uuid')
            project_uuid = user_info.get('project_uuid')

            resource_uuid = parameters.get('resource_uuid')
            cost = parameters.get('cost')
            status = parameters.get('status')

            resource_uuid = parameter_check(resource_uuid, ptype='pstr')
            cost = parameter_check(cost, ptype='pflt')
            status = parameter_check(status, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.orders_manager.order_create(
                    user_uuid, team_uuid, project_uuid,
                    resource_uuid, cost, status)

    @acl_check
    def order_update(self, context, parameters):

        try:
            order_uuid = context.get('resource_uuid')

            cost = parameters.get('cost')
            status = parameters.get('status')

            cost = parameter_check(cost, ptype='pflt')
            status = parameter_check(status, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.orders_manager.order_update(
                    order_uuid, cost, status)

    @acl_check
    def order_list(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')

            start_time = parameters.get('start_time')
            end_time = parameters.get('end_time')

            start_time = parameter_check(start_time, ptype='pflt')
            end_time = parameter_check(end_time, ptype='pflt')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.orders_manager.order_list(
                    user_uuid, start_time, end_time)
