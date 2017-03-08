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

    def balance_init(self, team_uuid, balance):

        try:
            self.billing_db.balance_init(team_uuid, balance)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "team_uuid": team_uuid,
                     "balance": balance
                 }

        return request_result(0, result)

    def balance_update(self, team_uuid, amount):

        try:
            self.billing_db.balance_update(team_uuid, amount)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "team_uuid": team_uuid,
                     "amount": amount
                 }

        return request_result(0, result)

    def balance_info(self, team_uuid):

        try:
            balance_info = self.billing_db.balance_info(team_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        balance = balance_info[0][0]
        update_time = balance_info[0][1]

        result = {
                     "team_uuid": team_uuid,
                     "balance": balance,
                     "update_time": update_time
                 }

        result = json.dumps(result, cls=CJsonEncoder)
        result = json.loads(result)

        return request_result(0, result)
