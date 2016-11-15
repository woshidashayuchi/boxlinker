#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import json

from flask import request
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.token_decode import get_userinfo
from common.time_log import time_log
from storage.rpcapi import rpc_api


class StorageVolumesApi(Resource):

    def __init__(self):

        self.storage_api = rpc_api.StorageRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "stg_ceh_dsk_add"
                  }

        return self.storage_api.disk_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": "stg_ceh_dsk_get"
                  }

        return self.storage_api.disk_list(context)


class StorageVolumeApi(Resource):

    def __init__(self):

        self.storage_api = rpc_api.StorageRpcApi()

    def get(self, resource_uuid):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": resource_uuid
                  }

        return self.storage_api.disk_info(context)

    def put(self, resource_uuid):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": resource_uuid
                  }

        return self.storage_api.disk_resize(context, parameters)

    def delete(self, resource_uuid):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": resource_uuid
                  }

        return self.storage_api.disk_delete(context)


class StorageVolumeStatusApi(Resource):

    def __init__(self):

        self.storage_api = rpc_api.StorageRpcApi()

    def put(self, volume_name):

        try:
            token = request.headers.get('token')
            user_info = get_userinfo(token)['user_info']
            user_info = json.loads(user_info)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": resource_uuid
                  }

        return self.storage_api.disk_status(context, parameters)
