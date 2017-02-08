#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/25
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from data import DataOrm
from common.logs import logging as log


def add_second(json_data):
    try:
        DataOrm.add_method(json_data)
    except Exception, e:
        log.error("the second add error, reason=%s" % e)
        return False