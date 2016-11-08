#!/usr/bin/env python

import json

from time import sleep
from flask import request
from flask import Response
from flask_restful import Resource

from common.logs import logging as log
from common.token_decode import get_userinfo
from logs.manage import log_manager
from common.code import request_result


class LogPollApi(Resource):

    def __init__(self):

        self.log_manager = log_manager.LogManager()

    def producer(self, token, user_name, user_role,
                 user_orag, user_ip, resource_name,
                 resource_type, label_value, start_time):
        cnt = 0
        while True:
            cnt += 1
            if cnt >= 12:
                end_time = {"end_time": start_time}
                yield json.dumps(end_time) + '\n'

                return

            try:
                log.debug('log_api_start_time=%s' % (start_time))
                log_res = self.log_manager.pod_log_list(
                          token, user_name, user_role,
                          user_orag, user_ip, resource_name,
                          resource_type, label_value,
                          None, None, start_time, None)
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

                    yield json.dumps(log_res) + '\n'

                else:

                    yield '\n'

            except Exception, e:
                log.error('Log format error, reason=%s' % (e))
                yield '\n'

            sleep(5)

    def post(self, label_value):

        log.debug('label_value=%s' % (label_value))

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)

            user_name = user_info['user_name']
            user_role = user_info['user_role']
            user_orag = user_info['user_orag']
            user_ip = user_info['user_ip']
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
            # parameters = parameters_check(parameters)

            start_time = parameters['start_time']
            if (start_time == 'None') or (start_time == ''):
                start_time = None
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        try:

            resource_name = 'log_lab_log_get'
            resource_type = 'api'

            return Response(self.producer(token, user_name, user_role,
                                          user_orag, user_ip, resource_name,
                                          resource_type, label_value, start_time))

        except Exception, e:
            log.warning('Log polling exec error, reason=%s'
                        % (e))
            return request_result(601)

        return
