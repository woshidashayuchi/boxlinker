#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/23
# Author:王晓峰


from create_volume import CreateVolume
from common.logs import logging as log


class StorageStatus(object):

    @classmethod
    def storage_json(cls, json_list):

        action = json_list.get("action")
        volume = json_list.get("volume")
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

    @classmethod
    def storage_status(cls, json_list):
        response = ""
        volume = json_list.get("volume")

        if json_list.get("action").upper() == "POST":
            for i in volume:
                disk_name = i.get("disk_name")
                json_status = {"disk_name": disk_name, "disk_status": "using"}
                json_list.update(json_status)
                response = CreateVolume.put_using(json_list)

        elif json_list.get("action").upper() == "PUT":
            for i in volume:
                disk_name = i.get("disk_name")
                json_status = {"disk_name": disk_name, "disk_status": "unused"}
                json_list.update(json_status)
                response = CreateVolume.put_using(json_list)

        return response
