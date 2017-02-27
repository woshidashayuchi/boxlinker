# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import k8slog_manager

from common.logs import logging as log
from common.code import request_result
from common.token_auth import token_check
from common.parameters import parameter_check


class LogManagerAPI(object):

    def __init__(self):

        self.k8slog_manager = k8slog_manager.K8sLogManager()

    # @token_check
    def log_label(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            role_uuid = user_info['role_uuid']

            label_value = parameters['label_value']
            date_time = parameters['date_time']
            start_time = parameters['start_time']
            end_time = parameters['end_time']

            label_value = parameter_check(label_value, ptype='pnam')
            date_time = parameter_check(date_time, ptype='pflt', exist='no')
            start_time = parameter_check(start_time, ptype='pflt', exist='no')
            end_time = parameter_check(end_time, ptype='pflt', exist='no')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.k8slog_manager.pod_log_list(
                    user_uuid, role_uuid, label_value=label_value,
                    date_time=date_time, start_time=start_time,
                    end_time=end_time)

    # @token_check
    def log_pod(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            role_uuid = user_info['role_uuid']

            pod_name = parameters['pod_name']
            date_time = parameters['date_time']
            start_time = parameters['start_time']
            end_time = parameters['end_time']

            pod_name = parameter_check(pod_name, ptype='pnam')
            date_time = parameter_check(date_time, ptype='pflt', exist='no')
            start_time = parameter_check(start_time, ptype='pflt', exist='no')
            end_time = parameter_check(end_time, ptype='pflt', exist='no')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.k8slog_manager.pod_log_list(
                    user_uuid, role_uuid, pod_name=pod_name,
                    date_time=date_time, start_time=start_time,
                    end_time=end_time)

    # @token_check
    def log_poll(self, context, parameters):

        try:
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            role_uuid = user_info['role_uuid']

            label_value = parameters['label_value']
            start_time = parameters['start_time']

            label_value = parameter_check(label_value, ptype='pnam')
            start_time = parameter_check(start_time, ptype='pflt', exist='no')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.k8slog_manager.pod_log_list(
                    user_uuid, role_uuid,
                    label_value=label_value,
                    start_time=start_time)

    def log_manager(self, dict_data):

        try:
            api = dict_data['api']
            context = dict_data['context']
            parameters = dict_data['parameters']
        except Exception, e:
            log.error('parameters error: %s' % (e))
            return request_result(101)

        try:
            func = {
                       "log_lab_log_get": self.log_label,
                       "log_pod_log_get": self.log_pod,
                       "log_pol_log_lst": self.log_poll
            }

            return func[api](context, parameters)
        except Exception, e:
            log.error('RPC API routing error: %s' % (e))
            return request_result(102)
