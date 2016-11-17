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
            dict_data = {"api":"drv_ceh_dsk_crt", "token":token, "parameters":{"pool_name":pool_name, "disk_name":disk_name, "disk_size":disk_size}}
            json_data = json.dumps(dict_data)
            ret = self.rmq_client.rpc_call_client(self.queue_name, self.timeout, json_data)
            return ret
        except Exception, e:
            return request_result(598)

    def disk_delete(self, token, pool_name, disk_name):

        try:
            dict_data = {"api":"drv_ceh_dsk_del", "token":token, "parameters":{"pool_name":pool_name, "disk_name":disk_name}}
            json_data = json.dumps(dict_data)
            ret = self.rmq_client.rpc_call_client(self.queue_name, self.timeout, json_data)
            return ret
        except Exception, e:
            return request_result(598)

    def disk_resize(self, token, pool_name, disk_name, disk_size):

        try:
            dict_data = {"api":"drv_ceh_dsk_rsz", "token":token, "parameters":{"pool_name":pool_name, "disk_name":disk_name, "disk_size":disk_size}}
            json_data = json.dumps(dict_data)
            ret = self.rmq_client.rpc_call_client(self.queue_name, self.timeout, json_data)
            return ret
        except Exception, e:
            return request_result(598)

    def disk_growfs(self, token, image_name):

        try:
            dict_data = {"api":"drv_ceh_dsk_gow", "token":token, "parameters":{"image_name":image_name}}
            json_data = json.dumps(dict_data)
            self.rmq_client.broadcast_client(self.exchange_name, json_data)
            return request_result(0)
        except Exception, e:
            return request_result(598)

    def notification(self, status, namespace, data=None):

        try:
            dict_data = {"status": status, "namespace": namespace, "data": data}
            json_data = json.dumps(dict_data)
            self.rmq_client.rpc_cast_client(self.notification_queue, json_data)
            return request_result(0)
        except Exception, e:
            return request_result(598)
