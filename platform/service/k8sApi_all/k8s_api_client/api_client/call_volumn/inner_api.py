#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/26
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from data import DataOrm
from common.logs import logging as log
from data_controller import LogicModel
from change_status import StorageStatus


class InnerApi(object):
    def __init__(self):
        pass

    # 更新volume状态--在更新服务时
    # 步骤:1 将以前使用的volume全部更新为unused
    #      2 将新加进来的volume状态设置为using
    @classmethod
    def using_volume(cls, json_list):
        volume = []
        get_sql = ""
        try:
            get_sql = DataOrm.get_using_volume(json_list)
        except Exception, e:
            log.error("the sql for get volume create error,reason=%s" % e)
        logical = LogicModel()
        conn, cur = logical.connection()
        try:
            resu = logical.exeQuery(cur, get_sql)
            for i in resu:
                i["disk_name"] = i.get("volume_name")
                volume.append(i)
        except Exception, e:
            log.error("query the volume error,reason=%s" % e)
        result = {"volume": volume}
        return result

    @classmethod
    def change_status(cls, json_list):
        if json_list.get("volume") != "":
            storage_status = {"action": "post"}
            json_list.update(storage_status)
            try:
                json_volume = StorageStatus.storage_json(json_list)
                json_volume.update(storage_status)
                json_list.update(json_volume)
                response = StorageStatus.storage_status(json_list)
                return response
            except Exception, e:
                log.error("storage update error,reason=%s" % e)
        else:
            return "ok"

    @classmethod
    def change_status1(cls, json_list):
        storage_status = {"action": "put"}
        json_list.update(storage_status)
        try:
            json_volume = StorageStatus.storage_json(json_list)
            json_volume.update(storage_status)
            json_list.update(json_volume)
            response = StorageStatus.storage_status(json_list)
            return response
        except Exception, e:
            log.error("storage update error,reason=%s" % e)
            return "error"

