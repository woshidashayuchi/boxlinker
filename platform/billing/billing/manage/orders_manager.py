# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import time
import uuid
import json

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from billing.db.billing_db import BillingDB


class OrdersManager(object):

    def __init__(self):

        self.billing_db = BillingDB()

    def order_create(self, user_uuid, orga_uuid,
                     resource_uuid, cost, status):

        order_uuid = str(uuid.uuid4())
        try:
            self.billing_db.order_insert(user_uuid, orga_uuid, order_uuid,
                                         resource_uuid, cost, status)
        except Exception, e:
            log.error('Database insert error')
            return request_result(401)

        result = {
                     "user_uuid": user_uuid,
                     "orga_uuid": orga_uuid,
                     "order_uuid": order_uuid,
                     "resource_uuid": resource_uuid,
                     "cost": cost,
                     "status": status
                 }

        return request_result(0, result)

    def order_update(self, order_uuid, cost, status):

        try:
            self.billing_db.order_update(order_uuid, cost, status)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "order_uuid": order_uuid,
                     "cost": cost,
                     "status": status
                 }

        return request_result(0, result)

    def order_get(self, user_uuid, orga_uuid,
                  role_uuid, start_time, end_time):

        try:
            start_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                       time.gmtime(float(start_time)))
            end_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                     time.gmtime(float(end_time)))
            orders_list_info = self.billing_db.order_get(
                                    user_uuid, orga_uuid, role_uuid,
                                    start_time, end_time)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        orders_list = []
        for orders_info in orders_list_info:
            order_uuid = orders_info[0]
            resource_uuid = orders_info[1]
            cost = orders_info[2]
            status = orders_info[3]
            create_time = orders_info[4]
            update_time = orders_info[5]

            v_orders_info = {
                                "order_uuid": order_uuid,
                                "resource_uuid": resource_uuid,
                                "cost": cost,
                                "status": status,
                                "orga_uuid": orga_uuid,
                                "user_uuid": user_uuid,
                                "create_time": create_time,
                                "update_time": update_time
                            }

            v_orders_info = json.dumps(v_orders_info, cls=CJsonEncoder)
            v_orders_info = json.loads(v_orders_info)
            orders_list.append(v_orders_info)

        result = {"orders_list": orders_list}

        return request_result(0, result)
