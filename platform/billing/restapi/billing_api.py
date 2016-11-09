#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from flask import request
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.token_decode import get_userinfo
from common.time_log import time_log
from common.parameter import parameters_check
from billing.rpcapi import rpc_api


class ResourcesApi(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
            parameters = parameters_check(parameters)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_rss_rss_crt"
                  }

        return self.billing_api.resource_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_rss_rss_get"
                  }

        return self.billing_api.resource_get(context)


class ResourceApi(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def delete(self, resource_uuid):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": resource_uuid
                  }

        return self.billing_api.resource_delete(context)

    @time_log
    def put(self, resource_uuid):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
            # parameters = parameters_check(parameters)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": resource_uuid
                  }

        return self.billing_api.resource_update(context, parameters)


class VouchersApi(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
            parameters = parameters_check(parameters)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_voc_voc_crt"
                  }

        return self.billing_api.voucher_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
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

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_voc_voc_get"
                  }

        return self.billing_api.voucher_get(context, parameters)


class VoucherApi(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def put(self, voucher_uuid):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        parameters = {
                         "voucher_uuid": voucher_uuid
                     }

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_voc_voc_act"
                  }

        return self.billing_api.voucher_active(context, parameters)


class BillsAPI(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
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

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_bls_bls_get"
                  }

        return self.billing_api.bill_get(context, parameters)


class BalancesApi(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_blc_blc_add"
                  }

        return self.billing_api.balance_init(context)

    @time_log
    def put(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
            # parameters = parameters_check(parameters)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_blc_blc_put"
                  }

        return self.billing_api.balance_update(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_blc_blc_get"
                  }

        return self.billing_api.balance_get(context)


class OrdersApi(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
            parameters = parameters_check(parameters)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_odr_odr_crt"
                  }

        return self.billing_api.order_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
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

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "bil_odr_odr_get"
                  }

        return self.billing_api.order_get(context, parameters)


class OrderApi(Resource):

    def __init__(self):

        self.billing_api = rpc_api.BillingRpcApi()

    @time_log
    def put(self, order_uuid):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
            parameters = parameters_check(parameters)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": order_uuid
                  }

        return self.billing_api.order_update(context, parameters)
