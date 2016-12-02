#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import json
import requests

from common.logs import logging as log
from common.rabbitmq_client import RabbitmqClient
from common.code import request_result

requests.adapters.DEFAULT_RETRIES = 5


class StorageDriver(object):

    def __init__(self):

        self.rmq_client = RabbitmqClient()
        self.queue_name = 'ceph_call'
        self.exchange_name = 'ceph_bcast'
        self.notification_queue = 'boxlinker-notification'
        self.timeout = 60
        self.billing_api = os.environ.get('BILLING_API')

    def disk_create(self, token, pool_name, disk_name, disk_size):

        try:

            disk_size = int(disk_size) * 1024
            api = 'drv_ceh_dsk_crt'
            context = {"token": token}

            parameters = {
                             "pool_name": pool_name,
                             "disk_name": disk_name,
                             "disk_size": disk_size
                         }

            dict_data = {
                            "api": api,
                            "context": context,
                            "parameters": parameters
                        }

            return self.rmq_client.rpc_call_client(
                        self.queue_name, self.timeout, dict_data)

        except Exception, e:

            return request_result(598)

    def disk_delete(self, token, pool_name, disk_name):

        try:

            api = 'drv_ceh_dsk_del'
            context = {"token": token}

            parameters = {
                             "pool_name": pool_name,
                             "disk_name": disk_name
                         }

            dict_data = {
                            "api": api,
                            "context": context,
                            "parameters": parameters
                        }

            return self.rmq_client.rpc_call_client(
                        self.queue_name, self.timeout, dict_data)

        except Exception, e:

            return request_result(598)

    def disk_resize(self, token, pool_name, disk_name, disk_size):

        try:

            disk_size = int(disk_size) * 1024
            api = 'drv_ceh_dsk_rsz'
            context = {"token": token}

            parameters = {
                             "pool_name": pool_name,
                             "disk_name": disk_name,
                             "disk_size": disk_size
                         }

            dict_data = {
                            "api": api,
                            "context": context,
                            "parameters": parameters
                        }

            return self.rmq_client.rpc_call_client(
                        self.queue_name, self.timeout, dict_data)

        except Exception, e:

            return request_result(598)

    def disk_growfs(self, token, image_name):

        try:

            api = 'drv_ceh_dsk_gow'
            context = {"token": token}

            parameters = {"image_name": image_name}

            dict_data = {
                            "api": api,
                            "context": context,
                            "parameters": parameters
                        }

            self.rmq_client.broadcast_client(
                 self.exchange_name, dict_data)
            return request_result(0)

        except Exception, e:

            return request_result(598)

    def notification(self, status, namespace, data=None):

        try:

            dict_data = {
                            "status": status,
                            "namespace": namespace,
                            "data": data
                        }

            self.rmq_client.rpc_cast_client(
                 self.notification_queue, dict_data)
            return request_result(0)

        except Exception, e:

            return request_result(598)

    def billing_create(self, token, volume_uuid, volume_name,
                       volume_conf, orga_uuid, user_uuid):

        headers = {'token': token}
        body = {
                   "resource_uuid": volume_uuid,
                   "resource_name": volume_name,
                   "resource_type": "volume",
                   "resource_conf": volume_conf,
                   "resource_status": "using",
                   "resource_orga": orga_uuid,
                   "resource_user": user_uuid
               }

        try:
            url = '%s/api/v1.0/billing/resources' % (self.billing_api)
            r = requests.post(url, headers=headers,
                              data=json.dumps(body), timeout=5)
            status = r.json()['status']
        except Exception, e:
            log.error('Billing resource create error: reason=%s' % (e))
            self.volume_delete(token, volume_uuid)
            return request_result(601)

        if int(status) != 0:
            log.error('Billing info create error, request_code not equal 0')
            self.volume_delete(token, volume_uuid)
            return request_result(601)

        return request_result(0)

    def billing_delete(self, token, volume_uuid):

        headers = {'token': token}
        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            r = requests.delete(url, headers=headers, timeout=5)
            status = r.json()['status']
        except Exception, e:
            log.error('Billing info delete error: reason=%s' % (e))

        if int(status) != 0:
            log.error('Billing info delete error, request_code not equal 0')
            return request_result(601)

        return request_result(0)

    def billing_update(self, token, volume_uuid,
                       volume_conf, user_uuid, orga_uuid):

        headers = {'token': token}
        body = {
                   "resource_conf": volume_conf,
                   "resource_status": "using",
                   "resource_orga": orga_uuid,
                   "resource_user": user_uuid
               }

        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            r = requests.put(url, headers=headers,
                             data=json.dumps(body), timeout=5)
            status = r.json()['status']
        except Exception, e:
            log.error('Billing info update error: reason=%s' % (e))
            return request_result(601)

        if int(status) != 0:
            log.error('Billing info update error, request_code not equal 0')
            return request_result(601)

        return request_result(0)
