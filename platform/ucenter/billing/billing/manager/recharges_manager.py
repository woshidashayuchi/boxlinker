# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json
import time

import levels_manager
import balances_manager

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from billing.db.billing_db import BillingDB


class RechargesManager(object):

    def __init__(self):

        self.billing_db = BillingDB()
        self.levels_manager = levels_manager.LevelsManager()
        self.balances_manager = balances_manager.BalancesManager()

    def recharge_create(self, team_uuid, recharge_amount,
                        recharge_type, recharge_user):

        # 充值成功后调用该方法
        # 该方法中需要调用等级和余额方法更新相关数据

        recharge_uuid = str(uuid.uuid4())
        try:
            self.billing_db.recharge_create(
                 recharge_uuid, recharge_amount,
                 recharge_type, team_uuid, recharge_user)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        experience = recharge_amount
        level_update = self.levels_manager.level_update(
                            team_uuid, experience).get('status')
        if level_update != 0:
            log.error('Level update error, team_uuid=%s, experience=%s'
                      % (team_uuid, experience))

        balance_update = self.balances_manager.balance_update(
                              team_uuid, recharge_amount).get('status')
        if balance_update != 0:
            log.error('Balance update error, team_uuid=%s, amount=%s'
                      % (team_uuid, recharge_amount))

        result = {
                     "recharge_uuid": recharge_uuid,
                     "team_uuid": team_uuid,
                     "recharge_amount": recharge_amount,
                     "recharge_type": recharge_type,
                     "recharge_user": recharge_user
                 }

        return request_result(0, result)

    def recharge_list(self, team_uuid, start_time, end_time):

        try:
            start_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                       time.gmtime(float(start_time)))
            end_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                     time.gmtime(float(end_time)))
            recharge_list_info = self.billing_db.recharge_list(
                                      team_uuid, start_time, end_time)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        recharges_list = []
        for recharge_info in recharge_list_info:
            recharge_uuid = recharge_info[0]
            recharge_amount = recharge_info[1]
            recharge_type = recharge_info[2]
            user_name = recharge_info[3]
            create_time = recharge_info[4]

            v_recharge_info = {
                                  "team_uuid": team_uuid,
                                  "recharge_uuid": recharge_uuid,
                                  "recharge_amount": recharge_amount,
                                  "recharge_type": recharge_type,
                                  "user_name": user_name,
                                  "create_time": create_time
                              }
            v_recharge_info = json.dumps(v_recharge_info, cls=CJsonEncoder)
            v_recharge_info = json.loads(v_recharge_info)
            recharges_list.append(v_recharge_info)

        result = {"recharge_list": recharges_list}

        return request_result(0, result)
