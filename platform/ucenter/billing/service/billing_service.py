#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import sys
p_path = sys.path[0] + '/../..'
sys.path.insert(1, p_path)

from time import sleep

from common.logs import logging as log
from billing.manager.cost_manager import CostsManager


def billing_service():

    cost_manager = CostsManager()

    while True:
        log.info('Starting Billing Service')
        sleep(3600)
        try:
            log.info('Start billing')
            cost_manager.billing_statistics()
            log.info('Finish billing')
        except Exception, e:
            log.warning('Billing Service running error, reason=%s'
                        % (e))


if __name__ == "__main__":

    billing_service()
