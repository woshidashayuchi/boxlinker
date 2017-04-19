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

from security.rpcapi import rpc_api as security_rpcapi


class OperationsApi(Resource):

    def __init__(self):

        self.security_rpcapi = security_rpcapi.SecurityRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.warning('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.warning('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, "sec_sec_usr_com", "create")

        return self.security_rpcapi.operation_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.warning('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            start_time = request.args.get('start_time')
            end_time = request.args.get('end_time')
            page_size = request.args.get('page_size')
            page_num = request.args.get('page_num')
            parameters = {
                             "start_time": start_time,
                             "end_time": end_time,
                             "page_size": page_size,
                             "page_num": page_num
                         }
        except Exception, e:
            log.warning('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = context_data(token, "opr_rcd_adm_com", "read")

        return self.security_rpcapi.operation_list(context, parameters)


class OperationApi(Resource):

    def __init__(self):

        self.security_rpcapi = security_rpcapi.SecurityRpcApi()

    @time_log
    def get(self, user_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.warning('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            start_time = request.args.get('start_time')
            end_time = request.args.get('end_time')
            parameters = {
                             "start_time": start_time,
                             "end_time": end_time
                         }
        except Exception, e:
            log.warning('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = context_data(token, "sec_sec_usr_com", "read")

        return self.security_rpcapi.operation_info(context)

    @time_log
    def put(self, user_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.warning('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.warning('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, "sec_sec_usr_com", "update")

        return self.security_rpcapi.operation_update(context, parameters)
