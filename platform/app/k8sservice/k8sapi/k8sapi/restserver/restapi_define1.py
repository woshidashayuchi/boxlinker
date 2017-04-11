# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/06

import json
from flask import request
from flask_restful import Resource
from common.logs import logging as log
from common.code import request_result
from common.time_log import time_log
from common.parameters import context_data
from common.token_ucenterauth import token_auth
from rpcapi.rpc_client import KubernetesRpcClient


class ServicesApi(Resource):
    def __init__(self):
        self.kubernetes = KubernetesRpcClient()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        try:
            parameters = json.loads(request.get_data())
            log.info('parameters body is: %s' % parameters)
            parameters['token'] = token
            token_rets = token_ret.get('result')
            if 'service_name' in token_rets.keys():
                del token_rets['service_name']
            parameters.update(token_rets)
            log.info('parameters body(1) is:%s' % parameters)
            if parameters.get('service_name') is None:
                return request_result(101)
        except Exception, e:
            log.error("parameters error,reason=%s" % e)
            return request_result(101)

        context = context_data(token, "service_create", "create")

        ret = self.kubernetes.create_services(context, parameters)

        return ret

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        parameters = token_ret.get('result')
        parameters['service_name'] = request.args.get('service_name',)
        parameters['page_size'] = request.args.get('page_size')
        parameters['page_num'] = request.args.get('page_num')

        context = context_data(token, "service_list", "read")

        ret = self.kubernetes.query_service(context, parameters)

        return ret


class ServiceApi(Resource):
    def __init__(self):
        self.kuber = KubernetesRpcClient()

    @time_log
    def get(self, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return request_result(201)

        if request.args.get('pod') == 'pod':
            parameters = token_ret.get('result')
            parameters['service_uuid'] = service_uuid
            parameters['rtype'] = 'pods_msg'

            context = context_data(token, service_uuid, "read")

            try:
                ret = self.kuber.pod_msg(context, parameters)
            except Exception, e:
                log.error('get the pods messages error, reason=%s' % e)
                return request_result(504)
            return request_result(0, ret)

        parameters = token_ret.get('result')
        parameters['service_uuid'] = service_uuid

        context = context_data(token, service_uuid, "read")

        ret = self.kuber.detail_service(context, parameters)

        return ret

    @time_log
    def delete(self, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return request_result(201)

        parameters = token_ret.get('result')
        parameters['token'] = token
        parameters['service_uuid'] = service_uuid

        context = context_data(token, service_uuid, 'delete')

        ret = self.kuber.delete_service(context, parameters)

        return ret

    @time_log
    def put(self, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return request_result(201)

        parameters = token_ret.get('result')
        rtype = request.args.get('rtype',)
        parameters['rtype'] = rtype
        parameters['service_uuid'] = service_uuid
        parameters['token'] = token

        try:
            in_data = json.loads(request.get_data())
            if not in_data and rtype == 'container':
                return request_result(101)
            parameters.update(in_data)
        except Exception, e:
            log.error('parameters error, reason is: %s' % e)
            return request_result(101)

        context = context_data(token, service_uuid, "update")

        ret = self.kuber.update_service(context, parameters)
        return ret


class ServiceName(Resource):
    def __init__(self):
        self.kuber = KubernetesRpcClient()

    @time_log
    def get(self, service_name):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return request_result(201)
        rtype = request.args.get('rtype')

        context = token_ret.get('result')
        if rtype == 'service':
            context['service_name'] = service_name
        elif rtype == 'domain':
            context['domain'] = service_name
        else:
            return request_result(101)

        context['rtype'] = rtype
        ret = self.kuber.service_name_get(context)

        return ret
