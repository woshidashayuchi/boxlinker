# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/06

import json
from flask import request
from common.logs import logging as log
from common.code import request_result
from common.parameters import context_data
from common.token_ucenterauth import token_auth
from rpcapi.rpc_client import KubernetesRpcClient


class KubernetesClientApi(object):
    def __init__(self):
        pass

    kuber = KubernetesRpcClient()

    @classmethod
    def create_service(cls):

        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return json.dumps(request_result(201))

        try:
            parameters = json.loads(request.get_data())
            log.info('parameters body is: %s' % parameters)
            parameters['token'] = token
            log.info('token result is: %s' % token_ret.get('result'))
            parameters = dict(parameters.items() + token_ret.get('result').items())
            log.info('parameters body(1) is:%s' % parameters)
            if parameters.get('service_name') is None:
                return json.dumps(request_result(101))
        except Exception, e:
            log.error("parameters error,reason=%s" % e)
            return json.dumps(request_result(101))

        context = context_data(token, "service_create", "create")

        ret = cls.kuber.create_services(context, parameters)

        return json.dumps(ret)

    @classmethod
    def pod_message(cls, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return json.dumps(request_result(201))

        parameters = token_ret.get('result')
        parameters['service_uuid'] = service_uuid
        parameters['rtype'] = 'pods_msg'

        context = context_data(token, service_uuid, "read")

        try:
            ret = cls.kuber.pod_msg(context, parameters)
        except Exception, e:
            log.error('get the pods messages error, reason=%s' % e)
            return json.dumps(request_result(504))
        return json.dumps(request_result(0, ret))

    @classmethod
    def get_all_service(cls):

        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return json.dumps(request_result(201))

        parameters = token_ret.get('result')
        parameters['service_name'] = request.args.get('service_name',)

        context = context_data(token, "service_list", "read")

        ret = cls.kuber.query_service(context, parameters)

        return json.dumps(ret)

    @classmethod
    def detail_service(cls, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return json.dumps(request_result(201))

        if request.args.get('pod') == 'pod':
            return cls.pod_message(service_uuid)

        parameters = token_ret.get('result')
        parameters['service_uuid'] = service_uuid

        context = context_data(token, service_uuid, "read")

        ret = cls.kuber.detail_service(context, parameters)

        return json.dumps(ret)

    @classmethod
    def del_service(cls, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return json.dumps(request_result(201))

        parameters = token_ret.get('result')
        parameters['token'] = token
        parameters['service_uuid'] = service_uuid

        context = context_data(token, service_uuid, 'delete')

        ret = cls.kuber.delete_service(context, parameters)

        return json.dumps(ret)

    @classmethod
    def put_service(cls, service_uuid):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return json.dumps(request_result(201))

        parameters = token_ret.get('result')
        rtype = request.args.get('rtype',)
        parameters['rtype'] = rtype
        parameters['service_uuid'] = service_uuid
        parameters['token'] = token

        try:
            in_data = json.loads(request.get_data())
            if not in_data and rtype == 'container':
                return json.dumps(request_result(101))
            parameters.update(in_data)
        except Exception, e:
            log.error('parameters error, reason is: %s' % e)
            return json.dumps(request_result(101))

        context = context_data(token, service_uuid, "update")

        ret = cls.kuber.update_service(context, parameters)
        return json.dumps(ret)
