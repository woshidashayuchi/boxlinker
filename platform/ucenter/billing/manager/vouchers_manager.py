# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json
import time

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from billing.db.billing_db import BillingDB


class VouchersManager(object):

    def __init__(self):

        self.billing_db = BillingDB()

    def voucher_create(self, user_uuid, denomination, invalid_time):

        try:
            invalid_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                         time.gmtime(float(invalid_time)))
            self.billing_db.voucher_insert(
                 user_uuid, denomination, invalid_time)
        except Exception, e:
            log.error('Database insert error')
            return request_result(401)

        result = {
                     "denomination": denomination,
                     "invalid_time": invalid_time
                 }

        return request_result(0, result)

    def voucher_active(self, voucher_uuid, user_uuid,
                       team_uuid, project_uuid):

        try:
            self.billing_db.voucher_active(
                 voucher_uuid, user_uuid,
                 team_uuid, project_uuid)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        result = {
                     "voucher_uuid": voucher_uuid,
                     "user_uuid": user_uuid,
                     "team_uuid": team_uuid,
                     "project_uuid": project_uuid
                 }

        return request_result(0, result)

    def voucher_update(self, voucher_uuid, amount):

        try:
            self.billing_db.voucher_update(voucher_uuid, amount)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))

        return

    def voucher_list(self, team_uuid, start_time, end_time):

        try:
            start_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                       time.gmtime(float(start_time)))
            end_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                     time.gmtime(float(end_time)))
            vouchers_list_info = self.billing_db.voucher_list(
                                      team_uuid, start_time, end_time)
        except Exception, e:
            log.error('Database select error')
            return request_result(404)

        vouchers_list = []
        for vouchers_info in vouchers_list_info:
            voucher_uuid = vouchers_info[0]
            user_uuid = vouchers_info[1]
            denomination = vouchers_info[2]
            balance = vouchers_info[3]
            active_time = vouchers_info[4]
            invalid_time = vouchers_info[5]

            v_vouchers_info = {
                                  "voucher_uuid": voucher_uuid,
                                  "user_uuid": user_uuid,
                                  "denomination": denomination,
                                  "balance": balance,
                                  "active_time": active_time,
                                  "invalid_time": invalid_time
                              }
            v_vouchers_info = json.dumps(v_vouchers_info, cls=CJsonEncoder)
            v_vouchers_info = json.loads(v_vouchers_info)
            vouchers_list.append(v_vouchers_info)

        result = {"vouchers_list": vouchers_list}

        return request_result(0, result)
