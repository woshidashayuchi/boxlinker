# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from common.acl import acl_check
from manager.alarm_manager import AlarmManager


class AlarmRpcAPI(object):

    def __init__(self):
        self.alarm_manager = AlarmManager()

    @acl_check
    def alarm_create(self, context, parameters):
        return self.alarm_manager.alarm_into_manager(parameters)

    @acl_check
    def alarm_query(self, context, parameters):
        return self.alarm_manager.query_manager(parameters)
