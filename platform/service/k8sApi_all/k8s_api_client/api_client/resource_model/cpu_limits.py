#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/23
# Author:王晓峰


def limits_cm(json_list):
    cpu = json_list.get("limits_cpu")
    if cpu == "8":
        limits_cpu = "1"
    elif cpu == "16":
        limits_cpu = "2"
    else:
        limits_cpu = "0.2"

    return limits_cpu
