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

    @acl_check
    def alarm_update(self, context, parameters):
        return self.alarm_manager.update_manager(parameters)

    @acl_check
    def alarm_svc_delete(self, context, parameters):
        return self.alarm_manager.alarm_svc_delete(parameters)

    @acl_check
    def alarm_svc_update(self, context, parameters):
        return self.alarm_manager.alarm_svc_update(parameters)

    @acl_check
    def only_alarm_create(self, context, parameters):

        return self.alarm_manager.only_alarm_create(parameters)

    @acl_check
    def only_alarm_query(self, context, parameters):
        return self.alarm_manager.only_alarm_query(parameters)

    @acl_check
    def only_detail_alarm(self, context, parameters):
        return self.alarm_manager.only_detail_query(parameters)

    @acl_check
    def only_update_alarm(self, context, parameters):
        return self.alarm_manager.only_update_alarm(parameters)

    @acl_check
    def only_del_alarm(self, context, parameters):
        return self.alarm_manager.only_del_alarm(parameters)
