# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import balances_manager
import vouchers_manager
import bills_manager

from common.logs import logging as log
from common.code import request_result
from common.time_log import time_log

from billing.db.billing_db import BillingDB


class CostsManager(object):

    def __init__(self):

        self.app_datum_cost = 0.2
        self.hdd_datum_cost = 0.1
        self.ssd_datum_cost = 0.4
        self.bwh_datum_cost = 0.5
        self.fip_datum_cost = 0.1

        self.balances_manager = balances_manager.BalancesManager()
        self.vouchers_manager = vouchers_manager.VouchersManager()
        self.bills_manager = bills_manager.BillsManager()
        self.billing_db = BillingDB()

    def cost_accounting(self, resource_type,
                        resource_conf, resource_status):

        resource_conf = float(resource_conf[:-1])

        if resource_type == 'app':
            if resource_status == 'off':
                resource_cost = 0
            else:
                resource_cost = resource_conf * self.app_datum_cost
        elif resource_type == 'storage':
            resource_cost = resource_conf * self.hdd_datum_cost
        else:
            resource_cost = resource_conf * 0.1

        return resource_cost

    def cost_statistics(self, resource_uuid, resource_type,
                        user_uuid, orga_uuid, resource_conf,
                        resource_status):

        resource_cost = self.cost_accounting(
                             resource_type, resource_conf, resource_status)

        voucher_uuid = self.vouchers_manager.voucher_check(
                       user_uuid, orga_uuid, resource_cost)

        if voucher_uuid is not False:
            voucher_cost = resource_cost
            self.vouchers_manager.voucher_update(voucher_uuid, voucher_cost)
        else:
            voucher_cost = 0
            self.balances_manager.balance_update(
                 user_uuid, orga_uuid, resource_cost)

        self.bills_manager.bill_create(user_uuid, orga_uuid, resource_uuid,
                                       resource_cost, voucher_cost)

        return

    @time_log
    def billing_statistics(self):

        try:
            resources_info_list = self.billing_db.resources_get()
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return

        for resource_info in resources_info_list:
            resource_uuid = resource_info[0]
            resource_type = resource_info[1]
            orga_uuid = resource_info[2]
            user_uuid = resource_info[3]
            resource_conf = resource_info[4]
            resource_status = resource_info[5]

            self.cost_statistics(resource_uuid, resource_type,
                                 user_uuid, orga_uuid, resource_conf,
                                 resource_status)

        return
