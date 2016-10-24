#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/29
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
import json


class SuccessOrFailed(object):
    def __init__(self):
        pass

    @classmethod
    def pod_delete_result(cls, result):
        result = json.loads(result)

        log.info(result)

        if result.get("code") is None and result.get("kind") == "Pod":
            return "success"
        else:
            return "failed"
