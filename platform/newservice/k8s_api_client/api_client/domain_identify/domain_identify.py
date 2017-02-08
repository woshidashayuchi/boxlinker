#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/12/20
# Author:wang-xf

import sys
p_path = sys.path[0] + '/../..'
x_path = sys.path[0] + '/..'
sys.path.append(p_path)
sys.path.append(x_path)
from data import DataOrm
from data_controller import LogicModel


class DomainIdentify(object):

    def __init__(self):
        pass

    @classmethod
    def get_identify(cls, json_list):
        sql = DataOrm.detail_containers(json_list)
        logical = LogicModel()
        conn, cur = logical.connection()
        result = logical.exeQuery(cur, sql)
        a = 0
        for i in result:
            if i.get("identify") is None or int(i.get("identify")) == 0:
                a = 0
            else:
                a = 1
        logical.connClose(conn, cur)
        return a

