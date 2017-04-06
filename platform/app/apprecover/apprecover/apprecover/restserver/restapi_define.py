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
            pass
        if request.method == 'GET':
            token_rets = token_ret.get('result')
            parameters.update(token_rets)

            context = context_data(token, "service_list", "read")
            ret = cls.kuber.query_service(context, parameters)

            return json.dumps(ret)
