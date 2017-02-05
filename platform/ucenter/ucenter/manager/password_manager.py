# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json
import time

from ucenter_common import passwd_encrypt
from tokens_manager import TokensManager

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from ucenter.db import ucenter_db
from ucenter.driver import ucenter_driver


class PasswordsManager(object):

    def __init__(self):

        self.ucenter_db = ucenter_db.UcenterDB()
        self.ucenter_driver = ucenter_driver.UcenterDriver()
        self.token_manager = TokensManager()

    def password_reset(self, user_uuid, password):

        try:
            user_single_info = self.ucenter_db.user_info(user_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        user_name = user_single_info[0][0]
        salt = str(uuid.uuid4())[-11:-1]
        passwd = passwd_encrypt(user_name, password, salt)

        try:
            self.ucenter_db.password_update(
                 user_uuid, passwd, salt)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "user_name": user_name,
                 }

        return request_result(0, result)

    def password_change(self, user_uuid, old_password, new_password):

        try:
            user_single_info = self.ucenter_db.user_info(user_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        user_name = user_single_info[0][0]

        try:
            user_info = self.ucenter_db.user_token_info(user_name)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        try:
            passwd_db = user_info[0][1]
            salt = user_info[0][2]
        except Exception, e:
            log.error('Get user token info error, user_name=%s'
                      % (user_name))
            return request_result(201)

        passwd_user = passwd_encrypt(user_name, old_password, salt)
        if passwd_user != passwd_db:
            log.info('user(%s) auth error, password not correct'
                     % (user_name))
            return request_result(201)

        return self.password_reset(user_uuid, new_password)

    def password_find(self, user_name):

        try:
            user_info = self.ucenter_db.user_name_info(user_name)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        try:
            user_uuid = user_info[0][0]
            passwd = user_info[0][1]
            salt = user_info[0][2]
            email = user_info[0][3]
        except Exception, e:
            log.warning('Password found error, user_name=%s, reason=%s'
                        % (user_name, e))
            return request_result(202)

        password = str(uuid.uuid4())[-11:-1]
        if (self.password_reset(user_uuid, password)['status'] == 0):
            user_token = self.token_manager.token_login(
                              user_name, password)['result']['user_token']
        else:
            log.warning('Password reset error, user_name=%s'
                        % (user_name))
            return request_result(601)

        try:
            self.ucenter_db.password_update(
                 user_uuid, passwd, salt)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))

        # 发重置密码的链接到注册邮箱
        # 链接里带一个临时user_token和user_uuid

        url = "http://xxx.com/changepwd?id=%s&token=%s" \
              % (user_uuid, user_token)

        result = {
                     "user_name": user_name,
                 }

        return request_result(0, result)
