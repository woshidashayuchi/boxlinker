#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/4
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from database_call.controller import LogicModel
from database_call import data

def get_pods(pods):
    logicmodel = LogicModel()
    conn, cur = logicmodel.connection()
    res = []
    for i in pods:
        get_sql = data.get_pod(i)
        resu = logicmodel.exeQuery(cur, get_sql)
        for j in resu:
            result = {"pod_name": i, "limits_cpu": j.get("limits_cpu"), "limits_memory":j.get("limits_memory")}
            res.append(result)
    return res