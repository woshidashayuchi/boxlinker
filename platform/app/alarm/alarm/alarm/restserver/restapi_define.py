# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/14 上午11:02

from common.logs import logging as log
from flask import request
from flask_restful import Resource
from common.token_ucenterauth import token_auth
from common.code import request_result
from common.parameters import context_data
from rpcapi.rpc_client import AlarmRpcClient
import json


class RestApiDefine(Resource):
    def __init__(self):
        self.alarm = AlarmRpcClient()

    def post(self):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)
        try:
            parameters = json.loads(request.get_data())
            parameters.update(token_ret.get('result'))
        except Exception, e:
            log.error('explain the parameters error, reason is: %s' % e)
            return request_result(101)

        context = context_data(token, "service_create", "create")
        ret = self.alarm.create_service_alarm(context, parameters)

        return ret

    def get(self):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        context = context_data(token, "service_list", "read")
        parameters = token_ret.get('result')
        ret = self.alarm.query_alarm(context, parameters)

        return ret


class UpApiDefine(Resource):
    def __init__(self):
        self.alarm = AlarmRpcClient()

    def puts(self, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        parameters = token_ret.get('result')
        parameters['service_uuid'] = service_uuid
        parameters.update(json.loads(request.get_data()))
        context = context_data(token, service_uuid, "update")

        ret = self.alarm.update_alarm(context, parameters)

        return ret

    def get(self, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        parameters = {'alarm_uuid': service_uuid}
        parameters.update(token_ret.get('result'))
        context = context_data(token, service_uuid, "read")
        ret = self.alarm.only_detail_alarm(context, parameters)

        return ret

    def put(self, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        parameters = json.loads(request.get_data())
        parameters['alarm_uuid'] = service_uuid
        parameters.update(token_ret.get('result'))

        context = context_data(token, service_uuid, "update")
        ret = self.alarm.only_update_alarm(context, parameters)

        return ret


class AlarmApiDefine(Resource):
    def __init__(self):
        self.alarm = AlarmRpcClient()

    def post(self):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        try:
            parameters = json.loads(request.get_data())
            parameters.update(token_ret.get('result'))
        except Exception, e:
            log.error('explain the parameters error, reason is: %s' % e)
            return request_result(101)

        context = context_data(token, "alarm_create", "create")
        ret = self.alarm.create_alarm(context, parameters)

        return ret

    def get(self):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        parameters = token_ret.get('result')
        context = context_data(token, "alarm_list", "create")

        ret = self.alarm.only_query_alarm(context, parameters)
        return ret

    def delete(self):
        pass
