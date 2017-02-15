# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import time
import json

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from billing.db.billing_db import BillingDB


class BillsManager(object):

    def __init__(self):

        self.billing_db = BillingDB()

    def bill_create(self, user_uuid, team_uuid, project_uuid,
                    resource_uuid, resource_cost, voucher_cost):

        try:
            self.billing_db.bill_insert(user_uuid, team_uuid,
                                        project_uuid, resource_uuid,
                                        resource_cost, voucher_cost)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))

        return

    def bill_list(self, user_uuid, start_time, end_time):

        try:
            start_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                       time.gmtime(float(start_time)))
            end_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                     time.gmtime(float(end_time)))
            bills_list_info = self.billing_db.bill_list(
                                   user_uuid, start_time, end_time)
        except Exception, e:
            log.error('Database select error')
            return request_result(404)

        bills_list = []
        for bills_info in bills_list_info:
            resource_uuid = bills_info[0]
            resource_name = bills_info[1]
            resource_type = bills_info[2]
            resource_cost = bills_info[3]
            voucher_cost = bills_info[4]

            v_bills_info = {
                               "user_uuid": user_uuid,
                               "orga_uuid": orga_uuid,
                               "resource_uuid": resource_uuid,
                               "resource_name": resource_name,
                               "resource_type": resource_type,
                               "resource_cost": resource_cost,
                               "voucher_cost": voucher_cost,
                               "start_time": start_time,
                               "end_time": end_time
                           }
            v_bills_info = json.dumps(v_bills_info, cls=CJsonEncoder)
            v_bills_info = json.loads(v_bills_info)
            bills_list.append(v_bills_info)

        result = {"bills_list": bills_list}

        return request_result(0, result)
