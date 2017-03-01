# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from manager.monitor_manager import MonitorManager


class MonitorRpcAPI(object):

    def __init__(self):
        self.monitor_manager = MonitorManager()

    def monitor_get(self, parameters):
        log.info('in rpc server data is:' % parameters)
        return self.monitor_manager.monitor_message_manager(parameters)
