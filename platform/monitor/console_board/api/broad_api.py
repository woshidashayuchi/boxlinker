#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/4
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from console_model.base_call import pod_messages
from console_model.console_k import ConsoleAct


def for_rest(json_data):
    rest = pod_messages(json_data)
    return rest
