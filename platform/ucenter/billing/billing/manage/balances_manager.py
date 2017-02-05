# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from billing.db.billing_db import BillingDB


class BalancesManager(object):

    def __init__(self):
        self.billing_db = BillingDB()

    def balance_init(self, user_uuid, orga_uuid):

        try:
            self.billing_db.balance_insert(user_uuid, orga_uuid)
        except Exception, e:
            log.error('Database insert error')
            return request_result(401)

        result = {
                     "user_uuid": user_uuid,
                     "orga_uuid": orga_uuid,
                     "balance": 0
                 }

        return request_result(0, result)

    def balance_update(self, user_uuid, orga_uuid, amount):

        try:
            self.billing_db.balance_update(user_uuid, orga_uuid, amount)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        result = {
                     "user_uuid": user_uuid,
                     "orga_uuid": orga_uuid,
                     "amount": amount
                 }

        return request_result(0, result)

    def balance_get(self, user_uuid, orga_uuid):

        try:
            balance_info = self.billing_db.balance_get(user_uuid, orga_uuid)
        except Exception, e:
            log.error('Database select error')
            return request_result(404)

        balance = balance_info[0][0]
        update_time = balance_info[0][1]

        result = {
                     "user_uuid": user_uuid,
                     "orga_uuid": orga_uuid,
                     "balance": balance,
                     "update_time": update_time
                 }

        result = json.dumps(result, cls=CJsonEncoder)
        result = json.loads(result)

        return request_result(0, result)

    def balances_update(self):


        return
