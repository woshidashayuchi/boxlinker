#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/11
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from update_model import GetAll
from common.logs import logging as log


def choice_up(json_list):
    alls = GetAll.get_all(json_list)
    try:
        if json_list.get("type") == "container":
            alls.pop("container")
            log.info("######:::::")
            log.info(alls)
            json_list.update(alls)
            return json_list
        elif json_list.get("type") == "env":
            alls.pop("env")
            json_list.update(alls)
            return json_list
        elif json_list.get("type") == "volume":
            alls.pop("volume")
            json_list.update(alls)
            return json_list
        elif json_list.get("type") == "auto_startup":
            alls.pop("auto_startup")
            json_list.update(alls)
            return json_list
        elif json_list.get("type") == "limits":
            alls.pop("container_cpu")
            alls.pop("container_memory")
            json_list.update(alls)
            return json_list
        elif json_list.get("image_name") is not None:
            json_list.update(alls)
            return json_list
        elif json_list.get("command") is not None and json_list.get("command") != "":
            json_list.update(alls)
            return json_list
        elif json_list.get("operate") == "start":
            return alls
        else:
            pass
    except Exception, e:
        log.error("can't get the correct params, reason=%s" % e)

