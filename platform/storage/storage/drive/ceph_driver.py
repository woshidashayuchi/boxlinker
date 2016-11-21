#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from common.logs import logging as log
from common.rabbitmq_client import RabbitmqClient
from common.code import request_result


class CephDriver(object):

    def __init__(self):

        self.rmq_client = RabbitmqClient()
        self.queue_name = 'storage_drive'
        self.exchange_name = 'storage_node'
        self.notification_queue = 'boxlinker-notification'
        self.timeout = 60

    def disk_create(self, token, pool_name, disk_name, disk_size):

        try:

            disk_size = int(disk_size) * 1024
            api = 'drv_ceh_dsk_crt'

            parameters = {
                             "pool_name": pool_name,
                             "disk_name": disk_name,
                             "disk_size": disk_size
                         }

            dict_data = {
                            "api": "drv_ceh_dsk_crt",
                            "token": token,
                            "parameters": parameters
                        }

            return self.rmq_client.rpc_call_client(
                        self.queue_name, self.timeout, dict_data)

        except Exception, e:

            return request_result(598)

    def disk_delete(self, token, pool_name, disk_name):

        try:

            api = 'drv_ceh_dsk_del'

            parameters = {
                             "pool_name": pool_name,
                             "disk_name": disk_name
                         }

            dict_data = {
                            "api": api,
                            "token": token,
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

            parameters = {
                             "pool_name": pool_name,
                             "disk_name": disk_name,
                             "disk_size": disk_size
                         }

            dict_data = {
                            "api": api,
                            "token": token,
                            "parameters": parameters
                        }

            return self.rmq_client.rpc_call_client(
                        self.queue_name, self.timeout, dict_data)

        except Exception, e:

            return request_result(598)

    def disk_growfs(self, token, image_name):

        try:

            api = 'drv_ceh_dsk_gow'

            parameters = {"image_name": image_name}

            dict_data = {
                            "api": api,
                            "token": token,
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
