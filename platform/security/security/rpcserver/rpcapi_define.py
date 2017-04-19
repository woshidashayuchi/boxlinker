# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from common.logs import logging as log
from common.code import request_result
from common.acl import acl_check
from common.parameters import parameter_check
from common.token_ucenterauth import token_auth

from security.manager import operation_manager


class SecurityRpcManager(object):

    def __init__(self):

        self.operation_manager = operation_manager.OperationManager()

    @acl_check
    def operation_create(self, context, parameters):

        try:
            token = context['token']
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            user_name = user_info.get('user_name')

            record_uuid = parameters.get('record_uuid')
            source_ip = parameters.get('source_ip')
            resource_uuid = parameters.get('resource_uuid')
            resource_name = parameters.get('resource_name')
            resource_type = parameters.get('resource_type')
            action = parameters.get('action')

            record_uuid = parameter_check(record_uuid, ptype='pstr')
            source_ip = parameter_check(source_ip, ptype='pnip')
            resource_uuid = parameter_check(resource_uuid, ptype='pstr')
            resource_name = parameter_check(resource_name, ptype='pnam')
            resource_type = parameter_check(resource_type, ptype='pstr')
            if action not in ('create', 'delete', 'update'):
                raise(Exception('Parameter error'))
        except Exception, e:
            log.warning('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.operation_manager.operation_create(
                    record_uuid, user_uuid, user_name,
                    source_ip, resource_uuid, resource_name,
                    resource_type, action)

    @acl_check
    def operation_list(self, context, parameters):

        try:
            start_time = parameters.get('start_time')
            end_time = parameters.get('end_time')
            page_size = parameters.get('page_size')
            page_num = parameters.get('page_num')

            start_time = parameter_check(start_time, ptype='pflt')
            end_time = parameter_check(end_time, ptype='pflt')
            page_size = parameter_check(page_size, ptype='pint')
            page_num = parameter_check(page_num, ptype='pint')
        except Exception, e:
            log.warning('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.operation_manager.operation_list(
                    start_time, end_time, page_size, page_num)

    @acl_check
    def operation_info(self, context, parameters):

        try:
            token = context['token']
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')

            start_time = parameters.get('start_time')
            end_time = parameters.get('end_time')

            start_time = parameter_check(start_time, ptype='pflt')
            end_time = parameter_check(end_time, ptype='pflt')
        except Exception, e:
            log.warning('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.operation_manager.operation_info(
                    user_uuid, start_time, end_time)

    @acl_check
    def operation_update(self, context, parameters):

        try:
            record_uuid = parameters.get('record_uuid')
            result = parameters.get('result')

            record_uuid = parameter_check(record_uuid, ptype='pstr')
        except Exception, e:
            log.warning('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.operation_manager.operation_update(
                    record_uuid, result)
