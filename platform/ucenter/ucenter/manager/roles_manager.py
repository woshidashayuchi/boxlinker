# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json
import time

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from ucenter.db import ucenter_db
from ucenter.driver import ucenter_driver


class RolesManager(object):

    def __init__(self):

        self.ucenter_db = ucenter_db.UcenterDB()
        self.ucenter_driver = ucenter_driver.UcenterDriver()

    def role_create(self, role_name, role_priv,
                    user_uuid, team_uuid):

        role_uuid = str(uuid.uuid4())
        try:
            self.ucenter_db.role_create(
                 role_uuid, role_name, role_priv,
                 user_uuid, team_uuid)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "role_uuid": role_uuid,
                     "role_name": role_name,
                     "role_priv": role_priv,
                     "role_owner": user_uuid,
                     "role_team": team_uuid
                 }

        return request_result(0, result)

    def role_list(self, team_uuid):

        try:
            role_list_info = self.ucenter_db.role_list(team_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        t_role_list = []
        for role_info in role_list_info:
            role_uuid = role_info[0]
            role_name = role_info[1]
            role_priv = role_info[2]
            status = role_info[3]
            create_time = role_info[4]
            update_time = role_info[5]

            v_role_info = {
                              "role_uuid": role_uuid,
                              "role_name": role_name,
                              "role_priv": role_priv,
                              "status": status,
                              "create_time": create_time,
                              "update_time": update_time
                          }

            v_role_info = json.dumps(v_role_info, cls=CJsonEncoder)
            v_role_info = json.loads(v_role_info)
            t_role_list.append(v_role_info)

        result = {"role_list": t_role_list}

        return request_result(0, result)

    def role_info(self, role_uuid):

        try:
            role_single_info = self.ucenter_db.role_info(role_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        role_name = role_single_info[0][0]
        role_priv = role_single_info[0][1]
        status = role_single_info[0][2]
        create_time = role_single_info[0][3]
        update_time = role_single_info[0][4]

        v_role_info = {
                          "role_uuid": role_uuid,
                          "role_name": role_name,
                          "role_priv": role_priv,
                          "status": status,
                          "create_time": create_time,
                          "update_time": update_time
                      }

        v_role_info = json.dumps(v_role_info, cls=CJsonEncoder)
        result = json.loads(v_role_info)

        return request_result(0, result)

    def role_update(self, role_uuid, role_priv):

        result = {"role_uuid": role_uuid}

        try:
            self.ucenter_db.role_update(role_uuid, role_priv)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "role_uuid": role_uuid,
                     "role_priv": role_priv
                 }

        return request_result(0, result)

    def role_delete(self, role_uuid):

        try:
            self.ucenter_db.role_delete(role_uuid)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        return request_result(0)