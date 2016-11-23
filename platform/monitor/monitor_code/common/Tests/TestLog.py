#!/usr/bin/env python

import sys

sys.path.insert(1, '../..')

from common.logs import logging as log

def test_log():

    log.debug('log test')


if __name__ == '__main__':
    test_log()
