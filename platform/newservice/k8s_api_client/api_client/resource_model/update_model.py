#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from data import DataOrm
from data_controller import LogicModel
from common.logs import logging as log


class GetAll(object):
    def __init__(self):
        pass
    @classmethod
    def get_cname_and_domain(cls, json_list):
        cname = ""
        domain = ""
        containerPort = ""

        sql = DataOrm.get_cname_and_domain(json_list)
        log.info("sql===>>>>>>>%s" % sql)
        logic = LogicModel()
        conn, cur = logic.connection()
        res = logic.exeQuery(cur, sql)
        for i in res:
            cname = i.get("cname")
            domain = i.get("domain")
            containerPort = i.get("containerPort")
        log.info("cname===>>>>>>>%s,domain===>>>>>>>%s" % (cname, domain))
        return cname, domain, containerPort

    @classmethod
    def get_all(cls, json_list):
        con = []
        env = []
        volume = []
        auto_startup = 1
        container_cpu = ""
        container_memory = ""
        logic = LogicModel()
        conn, cur = logic.connection()
        try:
            con_sql = DataOrm.con_one(json_list)
            env_sql = DataOrm.detail_env(json_list)
            volume_sql = DataOrm.detail_volume(json_list)
            rc_sql = DataOrm.get_update_rc(json_list)
        except Exception, e:
            log.error("get all sql create error, reason=%s" % e)

        try:
            log.info(con_sql)
            con_resu = logic.exeQuery(cur, con_sql)
            logic.connClose(conn, cur)

            logic = LogicModel()
            conn, cur = logic.connection()
            env_resu = logic.exeQuery(cur, env_sql)
            logic.connClose(conn, cur)

            logic = LogicModel()
            conn, cur = logic.connection()
            volume_resu = logic.exeQuery(cur, volume_sql)
            logic.connClose(conn, cur)

            logic = LogicModel()
            conn, cur = logic.connection()
            rc_resu = logic.exeQuery(cur, rc_sql)
            logic.connClose(conn, cur)
            for i in con_resu:
                x = {"container_port":str(i.get("containerPort")), "protocol":i.get("protocol"),"access_mode":i.get("access_mode"),"access_scope":i.get("access_scope")}
                con.append(x)
            for j in env_resu:
                x = {"env_key":j.get("env_name"), "env_value":j.get("env_value")}
                env.append(x)
            for m in volume_resu:
                x = {"volume_id":m.get("volume_id"),"disk_path":m.get("volume_path"),"readonly":m.get("read_only")}
                volume.append(x)
            for n in rc_resu:
                auto_startup = n.get("auto_startup")
                container_cpu = n.get("limits_cpu")
                container_memory = n.get("limits_memory")
        except Exception, e:
            log.error("get all error, reason=%s" % e)
        if len(con) == 0:
            con = ""
        if len(env) == 0:
            env = ""
        if len(volume) == 0:
            volume = ""
        alls = {"container": con, "env": env, "volume": volume, "auto_startup": auto_startup, "container_cpu": container_cpu,"container_memory": container_memory}
        log.info(alls)
        log.info(volume)
        return alls
