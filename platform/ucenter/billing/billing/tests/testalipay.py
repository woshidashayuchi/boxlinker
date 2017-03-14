#!/usr/bin/env python

import sys
from time import sleep

sys.path.insert(1, '../..')

from billing.driver import billing_driver


def test_alipay_precreate(recharge_uuid, amount):

    alipay_driver = billing_driver.BillingDriver()

    return alipay_driver.ali_precreate(
                         recharge_uuid, amount)

if __name__ == '__main__':

    recharge_uuid = 'xxx'
    amount = 10

    print test_alipay_precreate(recharge_uuid, amount)
