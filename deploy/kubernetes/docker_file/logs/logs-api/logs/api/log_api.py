#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import json

from flask import request
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.token_decode import get_userinfo
from common.parameter import parameters_check
from logs.manage import log_manager


class LabelLogApi(Resource):

    def __init__(self):

        self.log_manager = log_manager.LogManager()

    def post(self, label_value):
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

            date_time = parameters['date_time']
            if (date_time == 'None') or (date_time == ''):
                date_time = None

            start_time = parameters['start_time']
            if (start_time == 'None') or (start_time == ''):
                start_time = None

            end_time = parameters['end_time']
            if (end_time == 'None') or (end_time == ''):
                end_time = None
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        try:
            resource_name = 'log_lab_log_get'
            resource_type = 'api'

            return self.log_manager.pod_log_list(
                       token, user_name, user_role,
                       user_orag, user_ip, resource_name,
                       resource_type, label_value,
                       date_time, start_time, end_time)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)


class PodLogApi(Resource):

    def __init__(self):

        self.log_manager = log_manager.LogManager()

    def post(self, pod_name):
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

            date_time = parameters['date_time']
            if (date_time == 'None') or (date_time == ''):
                date_time = None

            start_time = parameters['start_time']
            if (start_time == 'None') or (start_time == ''):
                start_time = None

            end_time = parameters['end_time']
            if (end_time == 'None') or (end_time == ''):
                end_time = None
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        try:
            resource_name = 'log_lab_log_get'
            resource_type = 'api'

            return self.log_manager.pod_log_list(
                       token, user_name, user_role,
                       user_orag, user_ip, resource_name,
                       resource_type, None, pod_name,
                       date_time, start_time, end_time)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)
