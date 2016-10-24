#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/26
# Author:王晓峰
import sys
import requests
p_path = sys.path[0] + '/..'
sys.path.append(p_path)


def power_choice(json_list):
    power = json_list.get("user_power")
    if power == 'admin':

        pass
    elif power == 'orgination':

        pass

    elif power == 'user':

        pass

    else:

        return