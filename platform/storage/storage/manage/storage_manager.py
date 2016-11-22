# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import ceph_manager

from common.logs import logging as log
from common.code import request_result
from common.token_auth import token_check
from common.parameters import parameter_check


class StorageManagerAPI(object):

    def __init__(self):

        self.ceph_manager = ceph_manager.DiskManager()

    @token_check
    def volume_create(self, context, parameters):

        try:
            token = context['token']
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']

            volume_name = parameters['volume_name']
            volume_size = parameters['volume_size']
            fs_type = parameters['fs_type']

            volume_name = parameter_check(volume_name, ptype='pnam')
            volume_size = parameter_check(volume_size, ptype='pint')
            if (fs_type != 'xfs') and (fs_type != 'ext4'):
                raise
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.ceph_manager.volume_create(
                    token, user_uuid, orga_uuid,
                    volume_name, volume_size, fs_type)

    @token_check
    def volume_delete(self, context, parameters):

        try:
            token = context['token']
            volume_uuid = context['resource_uuid']

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.ceph_manager.volume_delete(token, volume_uuid)

    @token_check
    def volume_resize(self, context, parameters):

        try:
            token = context['token']
            user_info = context['user_info']
            user_uuid = user_info['user_uuid']
            orga_uuid = user_info['orga_uuid']

            volume_uuid = context['resource_uuid']
            volume_size = parameters['volume_size']

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
            volume_size = parameter_check(volume_size, ptype='pint')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.ceph_manager.volume_resize(
                    token, volume_uuid, volume_size, user_uuid, orga_uuid)

    @token_check
    def volume_info(self, context, parameters):

        try:
            volume_uuid = context['resource_uuid']

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.ceph_manager.volume_info(volume_uuid)

    @token_check
    def volume_list(self, context, parameters):

        try:
            user_info = context['user_info']
            orga_uuid = user_info['orga_uuid']
            user_uuid = user_info['user_uuid']
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.ceph_manager.volume_list(user_uuid, orga_uuid)

    @token_check
    def volume_update(self, context, parameters):

        try:
            volume_uuid = context['resource_uuid']
            volume_status = parameters['volume_status']

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
            if (volume_status != 'using') and (volume_status != 'unused'):
                raise
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.ceph_manager.volume_status(volume_uuid, volume_status)

    def storage_manager(self, dict_data):

        try:
            api = dict_data['api']
            context = dict_data['context']
            parameters = dict_data['parameters']
        except Exception, e:
            log.error('parameters error: %s' % (e))
            return request_result(101)

        try:
            func = {
                "stg_ceh_dsk_crt": self.volume_create,
                "stg_ceh_dsk_del": self.volume_delete,
                "stg_ceh_dsk_rsz": self.volume_resize,
                "stg_ceh_dsk_get": self.volume_info,
                "stg_ceh_dsk_lst": self.volume_list,
                "stg_ceh_dsk_sts": self.volume_update
            }

            return func[api](context, parameters)
        except Exception, e:
            log.error('RPC API routing error: %s' % (e))
            return request_result(102)
