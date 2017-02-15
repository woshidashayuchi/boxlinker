# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json
import time

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from ucenter.db import ucenter_db


class UserTeamManager(object):

    def __init__(self):

        self.ucenter_db = ucenter_db.UcenterDB()

    def user_team_add(self, user_uuid, team_uuid, team_role):

        if team_role is None:
            team_role = 'user'

        try:
            user_team_check = self.ucenter_db.user_team_check(
                                   user_uuid, team_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if user_team_check == 0:
            try:
                self.ucenter_db.user_team_add(
                     user_uuid, team_uuid, team_role)
            except Exception, e:
                log.error('Database insert error, reason=%s' % (e))
                return request_result(401)

        result = {
                     "user_uuid": user_uuid,
                     "team_uuid": team_uuid,
                     "team_role": team_role
                 }

        return request_result(0, result)

    def user_team_list(self, team_uuid):

        'show team user and role list'

        try:
            user_list_info = self.ucenter_db.user_team_list(team_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        t_user_list = []
        for user_info in user_list_info:
            user_uuid = user_info[0]
            user_name = user_info[1]
            team_role = user_info[2]
            create_time = user_info[3]
            update_time = user_info[4]

            v_user_info = {
                              "user_uuid": user_uuid,
                              "user_name": user_name,
                              "team_role": team_role,
                              "create_time": create_time,
                              "update_time": update_time
                          }

            v_user_info = json.dumps(v_user_info, cls=CJsonEncoder)
            v_user_info = json.loads(v_user_info)
            t_user_list.append(v_user_info)

        result = {"user_list": t_user_list}

        return request_result(0, result)

    def user_team_activate(self, user_uuid, team_uuid):

        try:
            self.ucenter_db.user_team_activate(
                 user_uuid, team_uuid)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "user_uuid": user_uuid,
                     "team_uuid": team_uuid
                 }

        return request_result(0, result)

    def user_team_update(self, team_uuid, team_priv,
                         n_user_uuid, n_role_uuid):

        try:
            now_team_priv = self.ucenter_db.team_priv(
                                 n_user_uuid, team_uuid)[0][0]
            if ('U' in now_team_priv) and (team_priv != 'CRUD'):
                raise(Exception('Operation denied'))
        except Exception, e:
            log.warning('Operation denied, operator team_priv=%s, \
                        user team_priv=%s, reason=%s'
                        % (team_priv, now_team_priv, e))
            return request_result(202)

        try:
            self.ucenter_db.user_team_update(
                 n_user_uuid, team_uuid, n_role_uuid)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "user_uuid": n_user_uuid,
                     "team_uuid": team_uuid,
                     "team_role": n_role_uuid
                 }

        return request_result(0, result)

    def user_team_delete(self, team_uuid, team_priv, n_user_uuid):

        try:
            now_team_priv = self.ucenter_db.team_priv(
                                 n_user_uuid, team_uuid)[0][0]
            if ('U' in now_team_priv) and (team_priv != 'CRUD'):
                raise(Exception('Operation denied'))
        except Exception, e:
            log.warning('Operation denied, operator team_priv=%s, \
                        user team_priv=%s, reason=%s'
                        % (team_priv, now_team_priv, e))
            return request_result(202)

        try:
            self.ucenter_db.user_team_del(n_user_uuid, team_uuid)
        except Exception, e:
            log.error('Database delete error, reason=%s' % (e))
            return request_result(402)

        return request_result(0)
