#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

from time import sleep

from common.logs import logging as log
from storage.manager.clouddisk_manager import CloudDiskManager


def storage_service():

    clouddisk_manager = CloudDiskManager()

    log.critical('Starting Storage Service')
    while True:
        sleep(3600)
        try:
            log.info('Start storage resource check')
            clouddisk_manager.volume_check()
            log.info('Finish storage resource check')

            log.info('Start storage reclaim check')
            clouddisk_manager.volume_reclaim_check()
            log.info('Finish storage reclaim check')

            log.info('Start storage reclaim delete')
            clouddisk_manager.volume_reclaim_delete()
            log.info('Finish storage reclaim delete')
        except Exception, e:
            log.error('Storage Service running error, reason=%s'
                      % (e))


if __name__ == "__main__":

    storage_service()
