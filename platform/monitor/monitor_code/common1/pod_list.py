#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/21
# Author:wang-xf


def list_pod(pod_list):
    result = ""
    if pod_list is None or pod_list == "":
        result = False
    else:
        for i in pod_list:
            result = result + "," + i
        result = result[1:]
    return result
