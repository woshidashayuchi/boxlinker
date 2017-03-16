# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from conf import conf
from common.logs import logging as log
from common.code import request_result
from common.acl import acl_check
from common.parameters import parameter_check
from common.token_ucenterauth import token_auth

from storage.manager import storage_manager


class StorageRpcManager(object):

    def __init__(self):

        self.balancecheck = conf.balance_check
        self.storage_manager = storage_manager.StorageManager()

    @acl_check
    def volume_create(self, context, parameters):

        try:
            token = context['token']
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            team_uuid = user_info.get('team_uuid')
            project_uuid = user_info.get('project_uuid')

            volume_name = parameters.get('volume_name')
            volume_size = parameters.get('volume_size')
            fs_type = parameters.get('fs_type')
            cost = parameters.get('cost')

            token = parameter_check(token, ptype='pstr')
            volume_name = parameter_check(volume_name, ptype='pnam')
            volume_size = parameter_check(volume_size, ptype='pint')
            if self.balancecheck is True:
                cost = parameter_check(cost, ptype='pflt')
                if float(cost) < 0:
                    raise(Exception('Parameter cost error, '
                                    'cost must greater than 0'))
            else:
                cost = parameter_check(cost, ptype='pflt', exist='no')
            if (fs_type != 'xfs') and (fs_type != 'ext4'):
                raise
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.storage_manager.volume_create(
                    token, team_uuid, project_uuid, user_uuid,
                    volume_name, volume_size, fs_type, cost)

    @acl_check
    def volume_delete(self, context, parameters):

        try:
            token = context['token']
            volume_uuid = context['resource_uuid']

            token = parameter_check(token, ptype='pstr')
            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.storage_manager.volume_delete(token, volume_uuid)

    @acl_check
    def volume_info(self, context, parameters):

        try:
            volume_uuid = context['resource_uuid']

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.storage_manager.volume_info(volume_uuid)

    @acl_check
    def volume_list(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            team_uuid = user_info.get('team_uuid')
            team_priv = user_info.get('team_priv')
            project_uuid = user_info.get('project_uuid')
            project_priv = user_info.get('project_priv')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.storage_manager.volume_list(
                    user_uuid, team_uuid, team_priv,
                    project_uuid, project_priv)

    @acl_check
    def volume_update(self, context, parameters):

        try:
            token = context['token']
            volume_uuid = context['resource_uuid']

            update = parameters.get('update')
            volume_size = parameters.get('volume_size')
            volume_status = parameters.get('volume_status')

            token = parameter_check(token, ptype='pstr')
            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
            if update == 'size':
                volume_size = parameter_check(volume_size, ptype='pint')
            elif update == 'status':
                if (volume_status != 'using') and (volume_status != 'unused'):
                    raise
            else:
                raise
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.storage_manager.volume_update(
                    token, volume_uuid, update,
                    volume_size, volume_status)
