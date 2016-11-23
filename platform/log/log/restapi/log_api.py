#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from time import sleep

from flask import request
from flask import Response
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.token_decode import get_userinfo
from common.time_log import time_log
from log.rpcapi import rpc_api


class LabelLogApi(Resource):

    def __init__(self):

        self.log_api = rpc_api.LogRpcApi()

    @time_log
    def get(self, label_value):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            date_time = request.args.get('date_time')
            start_time = request.args.get('start_time')
            end_time = request.args.get('end_time')
            parameters = {
                             "label_value": label_value,
                             "date_time": date_time,
                             "start_time": start_time,
                             "end_time": end_time
                         }
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "log_lab_log_get"
                  }

        return self.log_api.label_log(context, parameters)


class PodLogApi(Resource):

    def __init__(self):

        self.log_api = rpc_api.LogRpcApi()

    @time_log
    def get(self, pod_name):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            date_time = request.args.get('date_time')
            start_time = request.args.get('start_time')
            end_time = request.args.get('end_time')
            parameters = {
                             "pod_name": pod_name,
                             "date_time": date_time,
                             "start_time": start_time,
                             "end_time": end_time
                         }
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "log_pod_log_get"
                  }

        return self.log_api.pod_log(context, parameters)


class LogPollApi(Resource):

    def __init__(self):

        self.log_api = rpc_api.LogRpcApi()

    def log_producer(self, context, parameters):

        start_time = parameters['start_time']
        cnt = 0
        while True:
            cnt += 1
            if cnt >= 12:
                end_time = {"status": 1, "end_time": start_time}
                yield json.dumps(end_time) + '\n'

                return

            try:
                log.debug('log_api_start_time=%s' % (start_time))
                log_res = self.log_api.pod_log_list(context, parameters)
            except Exception, e:
                log.error('Get log from kibana error, reason=%s' % (e))
                sleep(5)
                continue

            try:
                log.debug('log_res=%s' % (log_res))
                status = log_res['status']
                logs_list = log_res['result']['logs_list']
                if (status == 0) and (len(logs_list) != 0):
                    log.debug('update start_time')
                    start_time = log_res['result']['end_time']
                    parameters['start_time'] = start_time

                    yield json.dumps(log_res) + '\n'

                else:

                    yield '\n'

            except Exception, e:
                log.error('Log format error, reason=%s' % (e))
                yield '\n'

            sleep(5)

    def get(self, label_value):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            start_time = request.args.get('start_time')
            parameters = {
                             "label_value": label_value,
                             "start_time": start_time
                         }
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "log_pol_log_lst"
                  }

        try:
            return Response(self.log_producer(context, parameters))
        except Exception, e:
            log.warning('Log polling exec error, reason=%s'
                        % (e))
            return request_result(601)