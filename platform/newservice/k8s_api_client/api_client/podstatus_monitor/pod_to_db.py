#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/26
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from data import DataOrm
from data_controller import LogicModel


class PodStatusUpdate(object):
    def __init__(self):
        pass

    @classmethod
    def anytime_update_pod_status(cls, json_list):
        update_sql = DataOrm.anytime_update_pod(json_list)
        logical = LogicModel()
        conn, cur = logical.connection()
        try:
            logical.exeQuery(cur, update_sql)
        except Exception, e:
            log.error("the pods status update error,reason=%s" % e)
        logical.connClose(conn, cur)
