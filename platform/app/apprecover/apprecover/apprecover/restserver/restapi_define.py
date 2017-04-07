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
    def services_server(cls):
        parameters = dict()

        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return json.dumps(request_result(201))

        if request.method == 'POST':
            try:
                parameters = json.loads(request.get_data())
                parameters.update(token_ret.get('result'))
                parameters['token'] = token
            except Exception, e:
                log.error('explain the parameters error, reason is: %s' % e)
                return json.dumps(request_result(101))

            context = context_data(token, "service_create", "create")
            ret = cls.kuber.create_services(context, parameters)

            return json.dumps(ret)
        if request.method == 'GET':
            token_rets = token_ret.get('result')
            parameters.update(token_rets)

            context = context_data(token, "service_list", "read")
            ret = cls.kuber.query_service(context, parameters)

            return json.dumps(ret)

        if request.method == 'DELETE':
            datas = json.loads(request.get_data())
            service_uuids = datas.get('service_uuid')
            ret = {}
            for i in service_uuids:
                parameters = i
                context = context_data(token, i, 'delete')
                try:
                    ret = cls.kuber.delete_service(context, parameters)
                except Exception, e:
                    log.error('get error, reason is: %s' % e)
                    return request_result(402)

            return json.dumps(ret)
