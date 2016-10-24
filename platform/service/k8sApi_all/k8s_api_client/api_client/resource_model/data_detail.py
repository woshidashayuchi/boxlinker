#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/28
# Author:xiaofengwang

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from data import DataOrm
from data_controller import LogicModel
from common.logs import logging as log


class GetDetails(object):
    def __init__(self):
        pass

    @classmethod
    def get_details(cls, json_list):
        container = []
        env = []
        volume = []
        json_to = {}
        json_con = {}
        json_env = {}
        json_volume = {}
        log.info(json_list)
        select_rc = DataOrm.get_update_rc(json_list)
        con_sql = DataOrm.detail_container(json_list)
        env_sql = DataOrm.detail_env(json_list)
        volume_sql = DataOrm.detail_volume(json_list)
        log.info(select_rc)

        logic = LogicModel()
        conn, cur = logic.connection()
        resu = logic.exeQuery(cur, con_sql)
        logic.connClose(conn, cur)

        logic = LogicModel()
        conn, cur = logic.connection()
        resu_env = logic.exeQuery(cur, env_sql)
        logic.connClose(conn, cur)

        logic = LogicModel()
        conn, cur = logic.connection()
        resu_rc = logic.exeQuery(cur, select_rc)
        logic.connClose(conn, cur)

        logic = LogicModel()
        conn, cur = logic.connection()
        resu_volume = logic.exeQuery(cur, volume_sql)
        logic.connClose(conn, cur)

        for i in resu:
            log.info(i)
            json_con["container_port"] = i.get("containerPort")
            json_con["protocol"] = i.get("protocol")
            json_con["access_mode"] = i.get("access_mode")
            container.append(json_con)

        for i in resu_env:
            log.info(i)
            json_env["env_key"] = i.get("env_name")
            json_env["env_value"] = i.get("env_value")
            env.append(json_env)

        for i in resu_volume:
            log.info(i)
            json_volume["disk_name"] = i.get("volume_name")
            json_volume["disk_path"] = i.get("volume_path")
            json_volume["readonly"] = i.get("read_only")
            volume.append(json_volume)

        if len(env) == 0:
            env = ""
        if len(container) == 0:
            container = ""
        if len(volume) == 0:
            volume = ""

        json_to["container"] = container
        json_to["env"] = env
        json_to["volume"] = volume

        for i in resu_rc:

            json_to["image_name"] = i.get("image_name")
            json_to["image_version"] = i.get("image_version")
            json_to["container_cpu"] = i.get("limits_cpu")
            json_to["container_memory"] = i.get("limits_memory")
            json_to["pods_num"] = int(i.get("spec_replicas"))
            json_to["policy1"] = int(i.get("policy"))
            json_to["auto_startup"] = i.get("auto_startup")
        json_to.update(json_list)

        return json_to

