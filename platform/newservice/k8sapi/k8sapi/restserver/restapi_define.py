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
            parameters['token'] = token
            parameters.update(token_ret.get('result'))
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

    @classmethod
    def put_policy(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name,
                     "user_orga": user_orga, "role_uuid": role_uuid}
        json_list["token"] = token_get1
        json_list.update(json_name)
        try:
            controller = SheetController()
            response = controller.update_service(json_list)
            return json.dumps(response)
        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def domain_identify(cls):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_data = json.loads(request.get_data())
        change_info = {"domain": json_data.get("domain"), "identify": json_data.get("identify"), "user_name": user_name,
                       "user_orga": user_orga, "role_uuid": role_uuid, "user_id": user_id, "token": token_get1}
        change = ChangeDomain()
        try:
            return json.dumps(change.change_identify(change_info))
        except Exception, e:
            log.error("change the domain identify error, reason=%s" % e)
            return code.request_result(502)
    '''