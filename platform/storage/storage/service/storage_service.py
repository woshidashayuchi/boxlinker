#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

from time import sleep

from common.logs import logging as log
from storage.manager.storage_manager import StorageManager


def storage_service():

    storage_manager = StorageManager()

    log.critical('Starting Storage Service')
    while True:
        sleep(3600)
        try:
            log.info('Start storage resource check')
            storage_manager.volume_check()
            log.info('Finish storage resource check')

            log.info('Start storage reclaim check')
            storage_manager.volume_reclaim_check()
            log.info('Finish storage reclaim check')

            log.info('Start storage reclaim delete')
            storage_manager.volume_reclaim_delete()
            log.info('Finish storage reclaim delete')
        except Exception, e:
            log.error('Storage Service running error, reason=%s'
                      % (e))


if __name__ == "__main__":

    storage_service()
