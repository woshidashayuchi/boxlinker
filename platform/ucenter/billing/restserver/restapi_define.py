#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from flask import request
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.time_log import time_log
from common.parameters import context_data
from common.token_ucenterauth import token_auth

from billing.rpcapi import rpc_api as billing_rpcapi


class ResourcesApi(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, "bil_rss_rss_crt", "create")

        return self.billing_api.resource_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = context_data(token, "bil_rss_rss_lst", "read")

        return self.billing_api.resource_list(context)


class ResourceApi(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def delete(self, resource_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = context_data(token, resource_uuid, "delete")

        return self.billing_api.resource_delete(context)

    @time_log
    def put(self, resource_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, resource_uuid, "update")

        return self.billing_api.resource_update(context, parameters)


class VouchersApi(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, "bil_voc_voc_crt", "create")

        return self.billing_api.voucher_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            start_time = request.args.get('start_time')
            end_time = request.args.get('end_time')
            parameters = {
                             "start_time": start_time,
                             "end_time": end_time
                         }
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = context_data(token, "bil_voc_voc_lst", "read")

        return self.billing_api.voucher_list(context, parameters)


class VoucherApi(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def put(self, voucher_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        parameters = {
                         "voucher_uuid": voucher_uuid
                     }

        context = context_data(token, "bil_voc_voc_act", "update")

        return self.billing_api.voucher_active(context, parameters)


class BillsAPI(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            start_time = request.args.get('start_time')
            end_time = request.args.get('end_time')
            parameters = {
                             "start_time": start_time,
                             "end_time": end_time
                         }
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = context_data(token, "bil_bls_bls_lst", "read")

        return self.billing_api.bill_list(context, parameters)


class BalancesApi(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = context_data(token, "bil_blc_blc_add", "create")

        return self.billing_api.balance_init(context)

    @time_log
    def put(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, "bil_blc_blc_put", "update")

        return self.billing_api.balance_update(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = context_data(token, "bil_blc_blc_inf", "read")

        return self.billing_api.balance_info(context)


class OrdersApi(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, "bil_odr_odr_crt", "create")

        return self.billing_api.order_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            start_time = request.args.get('start_time')
            end_time = request.args.get('end_time')
            parameters = {
                             "start_time": start_time,
                             "end_time": end_time
                         }
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = context_data(token, "bil_odr_odr_lst", "read")

        return self.billing_api.order_list(context, parameters)


class OrderApi(Resource):

    def __init__(self):

        self.billing_api = billing_rpcapi.BillingRpcApi()

    @time_log
    def put(self, order_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, order_uuid, "update")

        return self.billing_api.order_update(context, parameters)
