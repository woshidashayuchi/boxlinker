#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/4
# Author:wang-xf

def get_pod(all_name):

    get_sql = "select limits_cpu,limits_memory from replicationcontrollers where uuid=(select rc_id from font_service where all_name=\'%s\')" % all_name
    return get_sql