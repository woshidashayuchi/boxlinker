# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json
import time

from conf import conf
from ucenter_common import passwd_encrypt

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from ucenter.db import ucenter_db
from ucenter.driver import ucenter_driver


class UsersManager(object):

    def __init__(self):

        self.ucenter_db = ucenter_db.UcenterDB()
        self.ucenter_driver = ucenter_driver.UcenterDriver()

    def user_create(self, user_name, password,
                    email, real_name=None, mobile=None,
                    sex=None, birth_date=None,
                    code_id=None, code_str=None):

        if conf.verify_code is True:
            verify_code_check = self.ucenter_driver.verify_code_check(
                                     code_id, code_str).get('status')
            if int(verify_code_check) != 0:
                return request_result(104)

        try:
            user_name_check = self.ucenter_db.name_duplicate_check(
                                   user_name)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if user_name_check != 0:
            log.warning('User name(%s) already exists' % (user_name))
            return request_result(301)

        try:
            email_check = self.ucenter_db.email_duplicate_check(
                               email)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if email_check != 0:
            log.warning('Email(%s) already exists' % (email))
            return request_result(301, 'Email(%s) already registered'
                                  % (email))

        user_uuid = str(uuid.uuid4())
        salt = str(uuid.uuid4())[-11:-1]
        passwd = passwd_encrypt(user_name, password, salt)
        birth_date = time.strftime("%Y-%m-%d %H:%M:%S",
                                   time.gmtime(float(birth_date or 0)))
        try:
            self.ucenter_db.user_create(
                 user_uuid, user_name, passwd,
                 salt, email, real_name, mobile,
                 sex, birth_date)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        # 发送激活邮件给用户
        user_activate_url = '%s%s%s' % (conf.ucenter_api,
                                        '/api/v1.0/ucenter/users/status/',
                                        user_uuid)

        data = {
                   "to": email,
                   "title": "用户激活",
                   "text": None,
                   "html": ("<p>"
                            "感谢您注册boxlinker账号，"
                            "请点击以下链接激活您的账号：<br>"
                            "<a href = %s>%s</a> </p>"
                            % (user_activate_url, user_activate_url))
               }

        email_send = self.ucenter_driver.email_send(data).get('status')
        if int(email_send) != 0:
            self.ucenter_db.user_delete(user_uuid)
            return request_result(601)

        result = {
                     "user_name": user_name,
                     "email": email,
                     "real_name": real_name,
                     "mobile": mobile,
                     "sex": sex,
                     "birth_date": birth_date
                 }

        return request_result(0, result)

    def user_list(self, user_name):

        try:
            user_list_info = self.ucenter_db.user_list(user_name)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        t_user_list = []
        for user_info in user_list_info:
            user_uuid = user_info[0]
            user_name = user_info[1]

            v_user_info = {
                              "user_uuid": user_uuid,
                              "user_name": user_name
                          }

            v_user_info = json.dumps(v_user_info, cls=CJsonEncoder)
            v_user_info = json.loads(v_user_info)
            t_user_list.append(v_user_info)

        result = {"user_list": t_user_list}

        return request_result(0, result)

    def user_info(self, user_uuid):

        try:
            user_single_info = self.ucenter_db.user_info(user_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        user_name = user_single_info[0][0]
        real_name = user_single_info[0][1]
        email = user_single_info[0][2]
        mobile = user_single_info[0][3]
        status = user_single_info[0][4]
        sex = user_single_info[0][5]
        birth_date = user_single_info[0][6]
        create_time = user_single_info[0][7]
        update_time = user_single_info[0][8]

        v_user_info = {
                          "user_uuid": user_uuid,
                          "user_name": user_name,
                          "real_name": real_name,
                          "email": email,
                          "mobile": mobile,
                          "status": status,
                          "sex": sex,
                          "birth_date": birth_date,
                          "create_time": create_time,
                          "update_time": update_time
                      }

        v_user_info = json.dumps(v_user_info, cls=CJsonEncoder)
        result = json.loads(v_user_info)

        return request_result(0, result)

    def user_update(self, user_uuid, real_name, mobile, sex, birth_date):

        birth_date = time.strftime("%Y-%m-%d %H:%M:%S",
                                   time.gmtime(float(birth_date or 0)))

        try:
            self.ucenter_db.user_update(
                 user_uuid, real_name, mobile,
                 sex, birth_date)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "user_uuid": user_uuid,
                     "real_name": real_name,
                     "mobile": mobile,
                     "sex": sex,
                     "birth_date": birth_date
                 }

        return request_result(0, result)

    def user_activate(self, user_uuid):

        # 初始化余额信息，如果初始化失败，则返回激活失败，并提醒用户稍后重试

        try:
            user_info = self.ucenter_db.user_info(user_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        user_name = user_info[0][0]
        team_uuid = str(uuid.uuid4())
        project_uuid = str(uuid.uuid4())
        role_uuid = 'owner'

        try:
            self.ucenter_db.user_activate(
                 user_uuid, user_name, team_uuid,
                 project_uuid, role_uuid)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "user_uuid": user_uuid,
                     "user_name": user_name,
                     "team_uuid": team_uuid,
                     "project_uuid": project_uuid
                 }

        return request_result(0, result)

    def user_status(self, user_uuid, status):

        try:
            self.ucenter_db.user_status(user_uuid, status)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "user_uuid": user_uuid,
                     "user_status": status
                 }

        return request_result(0, result)
