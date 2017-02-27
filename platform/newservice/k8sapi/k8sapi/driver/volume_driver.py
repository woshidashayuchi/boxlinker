# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/10
from common.logs import logging as log
from storage_api import StorageRpcApi
from common.parameters import context_data
from conf import conf
import requests
import json


class VolumeDriver(object):

    def __init__(self):
        self.storage_api = StorageRpcApi()

    def storage_json(self, dict_data):

        action = dict_data.get("action")
        volume = dict_data.get("volume")
        volume_array = []

        for i in volume:
            if action.upper() == "POST":
                i["status"] = "using"
            elif action.upper() == "PUT":
                i["status"] = "unused"
            volume_array.append(i)
        json_volume = {"volume": volume_array}
        log.info(json_volume)
        return json_volume

    def put_using(self, dict_data):

        headers = {"token": dict_data.get("token")}
        put_url = "%s/%s/status" % (conf.STORAGE_HOST, dict_data.get("volume_uuid"))
        log.info("inner parameters========================%s" % headers)
        log.info(dict_data)
        using = {"volume_status": dict_data.get("volume_status")}
        resu = ""
        try:
            resu = requests.put(put_url, headers=headers, data=json.dumps(using))

            log.info(resu.text)
        except Exception, e:
            log.error("update storage error, reason=%s" % e)
        return resu

    def storage_status(self, json_list):
        response = ""
        volume = json_list.get("volume")

        if json_list.get("action").upper() == "POST":
            for i in volume:
                volume_id = i.get("volume_id")
                json_status = {"volume_id": volume_id, "volume_status": "using"}
                json_list.update(json_status)
                response = self.put_using(json_list)

        elif json_list.get("action").upper() == "PUT":
            for i in volume:
                disk_name = i.get("volume_id")
                json_status = {"volume_id": disk_name, "volume_status": "unused"}
                json_list.update(json_status)
                response = self.put_using(json_list)

        return response

    def change_status(self, dict_data):

        volume = dict_data.get('volume')
        if len(volume) != 0 and volume is not None:
            dict_data.update({'action': 'post'})

            try:
                dict_volume = self.storage_json(dict_data)
                dict_volume.update({'action': 'post'})
                dict_data.update(dict_volume)
                response = self.storage_status(dict_data)
                return response
            except Exception, e:
                log.error("storage update error,reason=%s" % e)
                return False

        return True

    def get_message(self, dict_data):
        token = dict_data.get('token')
        volume_uuid = dict_data.get('volume_uuid')
        context = context_data(token, 'e7fea3e6-bd88-4ed8-b0e6-4b65d418d4dd', "read")

        # parameters = {'volume_uuid': volume_uuid}
        log.info('1111111111111')
        log.info('context=%s' % context)
        log.info('')
        ret = self.storage_api.disk_info(context)
        log.info('2222222222222')
        log.info('aaaaaaaaaaaaaaa%s' % ret)
        return ret
