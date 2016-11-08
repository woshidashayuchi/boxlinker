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
from storage.manage.ceph import disk_manager


class StorageVolumesApi(Resource):

    def __init__(self):

        self.disk_manager = disk_manager.DiskManager()

    def post(self):
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
            parameters = parameters_check(parameters)

            resource_name = 'stg_ceh_dsk_add'
            resource_type = 'api'

            disk_name = parameters['disk_name']
            disk_size = parameters['disk_size']
            fs_type = parameters['fs_type']
            if (fs_type != 'xfs') and (fs_type != 'ext4'):
                raise
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        try:

            return self.disk_manager.disk_create(token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, disk_name, disk_size, fs_type)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)

    def get(self):
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
            resource_name = 'stg_ceh_dsk_get'
            resource_type = 'api'
            get_resource_type = 'volume'

            return self.disk_manager.disk_list(token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, get_resource_type)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)


class StorageVolumeApi(Resource):
    def __init__(self):
        self.disk_manager = disk_manager.DiskManager()

    def get(self, volume_name):
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
            resource_name = volume_name
            resource_type = 'volume'
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        try:

            return self.disk_manager.disk_info(token, user_name, user_role, user_orag, user_ip, resource_name, resource_type)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)

    def put(self, volume_name):
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
            parameters = parameters_check(parameters)

            resource_name = volume_name
            resource_type = 'volume'

            disk_size = parameters['disk_size']
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        try:

            return self.disk_manager.disk_resize(token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, disk_size)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)

    def delete(self, volume_name):
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
            resource_name = volume_name
            resource_type = 'volume'
        except Exception, e:
            log.error('Parameters error, reason=%s' % (e))

            return request_result(101)

        try:

            return self.disk_manager.disk_delete(token, user_name, user_role, user_orag, user_ip, resource_name, resource_type)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)


class StorageVolumeStatusApi(Resource):

    def __init__(self):
        self.disk_manager = disk_manager.DiskManager()

    def put(self, volume_name):
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
            parameters = parameters_check(parameters)

            resource_name = volume_name
            resource_type = 'volume'

            disk_status = parameters['disk_status']
            if (disk_status != 'using') and (disk_status != 'unused'):
                raise
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        try:

            return self.disk_manager.disk_status(token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, disk_status)

        except Exception, e:
            log.error('System error, reason=%s' % (e))

            return request_result(601)
