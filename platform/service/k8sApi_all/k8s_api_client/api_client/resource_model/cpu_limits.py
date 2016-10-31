#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/23
# Author:王晓峰


def limits_cm(json_list):
    cpu = json_list.get("container_cpu")
    if cpu == "8":
        limits_cpu = "1"
        limits_memory = "500M"
    elif cpu == "16":
        limits_cpu = "2"
        limits_memory = "1024M"
    else:
        limits_cpu = "0.2"
        limits_memory = "128M"
    return limits_cpu, limits_memory
