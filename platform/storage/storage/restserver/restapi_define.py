#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from flask import request
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.time_log import time_log
from common.parameters import context_data
from common.token_ucenterauth import token_auth

from storage.rpcapi import rpc_api as storage_rpcapi


class VolumesApi(Resource):

    def __init__(self):

        self.storage_api = storage_rpcapi.StorageRpcApi()

    @time_log
    def post(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, "stg_ceh_dsk_add", "create")

        return self.storage_api.disk_create(context, parameters)

    @time_log
    def get(self):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = context_data(token, "stg_ceh_dsk_lst", "read")

        return self.storage_api.disk_list(context)


class VolumeApi(Resource):

    def __init__(self):

        self.storage_api = storage_rpcapi.StorageRpcApi()

    @time_log
    def get(self, volume_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = context_data(token, volume_uuid, "read")

        return self.storage_api.disk_info(context)

    @time_log
    def put(self, volume_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, volume_uuid, "update")
        context = {
                      "token": token,
                      "user_info": user_info,
                      "resource_uuid": volume_uuid
                  }

        return self.storage_api.disk_resize(context, parameters)

    @time_log
    def delete(self, volume_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        context = context_data(token, volume_uuid, "delete")

        return self.storage_api.disk_delete(context)


class VolumeStatusApi(Resource):

    def __init__(self):

        self.storage_api = storage_rpcapi.StorageRpcApi()

    @time_log
    def put(self, volume_uuid):

        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))

            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))

            return request_result(101)

        context = context_data(token, volume_uuid, "update")

        return self.storage_api.disk_status(context, parameters)
