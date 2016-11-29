#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/10
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from data import DataOrm
from data_controller import LogicModel


def con_access(json_list):
    select_sql = ""
    con = []
    try:
        select_sql = DataOrm.con_one(json_list)
    except Exception, e:
        log.error("get the container mode error. reason=%s" % e)
    logic = LogicModel()
    conn, cur = logic.connection()

    resu = logic.exeQuery(cur, select_sql)

    logic.connClose(conn, cur)

    for i in resu:
        log.info("iiiiiiiiiiiiiiii")
        log.info(i)
        for j in json_list.get("ports"):
            log.info(j)
            if j.get("containerPort") is not None and i.get("containerPort") is not None:
                if int(j.get("containerPort")) == int(i.get("containerPort")):
                    access = {"container_port": j.get("containerPort"), "protocol": i.get("protocol"), "access_mode": i.get("access_mode")}
                    con.append(access)
                    log.info(con)

                else:
                    log.error("can't get the port")
    return con
