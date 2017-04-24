# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/14 下午6:06

import sys
p_path = sys.path[0] + '/../..'
p_path1 = sys.path[0] + '/..'
sys.path.insert(1, p_path)
sys.path.append(p_path1)
from common.logs import logging as log
from manager.alarm_manager import AlarmManager
from time import sleep


def alarm_server(alarm):
    alarm_manager = AlarmManager()
    while True:
        try:
            log.info('^^^^^^^^^xxxxxxx')
            alarm_manager.alarm_svc_manager()

        except Exception, e:
            log.error('start the service of %s error, reason is: %s' % (alarm, e))

        sleep(3600)

if __name__ == '__main__':
    alarm_server('alarming')
