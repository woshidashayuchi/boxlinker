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

    def voucher_active(self, voucher_uuid, orga_uuid, user_uuid):

        try:
            self.billing_db.voucher_active(voucher_uuid, orga_uuid, user_uuid)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        result = {
                     "voucher_uuid": voucher_uuid,
                     "orga_uuid": orga_uuid,
                     "user_uuid": user_uuid
                 }

        return request_result(0, result)

    def voucher_check(self, user_uuid, orga_uuid, amount):

        try:
            user_voucher = self.billing_db.voucher_check(user_uuid, orga_uuid, amount)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))

        try:
            voucher_uuid = user_voucher[0][0]
        except Exception:
            voucher_uuid = False

        return voucher_uuid

    def voucher_update(self, voucher_uuid, amount):

        try:
            self.billing_db.voucher_update(voucher_uuid, amount)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))

        return

    def voucher_get(self, user_uuid, orga_uuid,
                    role_uuid, start_time, end_time):

        try:
            start_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                       time.gmtime(float(start_time)))
            end_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                     time.gmtime(float(end_time)))
            vouchers_list_info = self.billing_db.voucher_get(
                                      user_uuid, orga_uuid, role_uuid,
                                      start_time, end_time)
        except Exception, e:
            log.error('Database select error')
            return request_result(404)

        vouchers_list = []
        role_uuid = int(role_uuid)
        if (role_uuid/100 == 1):
            for vouchers_info in vouchers_list_info:
                voucher_uuid = vouchers_info[0]
                createuser_uuid = vouchers_info[1]
                denomination = vouchers_info[2]
                invalid_time = vouchers_info[3]
                create_time = vouchers_info[4]
                update_time = vouchers_info[5]

                v_vouchers_info = {
                                      "voucher_uuid": voucher_uuid,
                                      "createuser_uuid": createuser_uuid,
                                      "denomination": denomination,
                                      "invalid_time": invalid_time,
                                      "create_time": create_time,
                                      "update_time": update_time
                                  }
                v_vouchers_info = json.dumps(v_vouchers_info, cls=CJsonEncoder)
                v_vouchers_info = json.loads(v_vouchers_info)
                vouchers_list.append(v_vouchers_info)
        elif (role_uuid/100 == 2):
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
        else:
            for vouchers_info in vouchers_list_info:
                voucher_uuid = vouchers_info[0]
                denomination = vouchers_info[1]
                balance = vouchers_info[2]
                active_time = vouchers_info[3]
                invalid_time = vouchers_info[4]

                v_vouchers_info = {
                                      "voucher_uuid": voucher_uuid,
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
