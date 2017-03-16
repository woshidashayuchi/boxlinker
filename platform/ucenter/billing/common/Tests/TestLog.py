#!/usr/bin/env python

import sys
from time import sleep

sys.path.insert(1, '../..')

from common.logs import logging as log


def test_log():

    log.debug('####### debug log #######')
    log.info('####### info log #######')
    log.warning('####### warning log #######')
    log.error('####### error log #######')

if __name__ == '__main__':
    test_log()
