#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/22 15:34
"""

import time
import uuid

from sqlalchemy import or_, func, desc


from common.logs import logging as log

from imageAuth.db.db import ImageRepository, RepositoryEvents, ResourcesAcl, RepositoryPull
from pyTools.tools.timeControl import get_now_time

from pyTools.tools.timeControl import get_timestamp_13
from imageAuth.db.db import CodeOauth, CodeRepo

from imageAuth.db.db import Session

class OauthDB(object):
    def __init__(self):
        # self.db_session = Session()
        log.info('OauthDB __init__')

    def get_code_oauth(self, db_session, team_uuid, src_type):
        """ 根据组织uuid 和 第三方类型, 获取 CodeOauth 信息"""
        try:
            oauthret = db_session.query(CodeOauth).filter(CodeOauth.team_uuid == str(team_uuid),
                                                          CodeOauth.src_type == src_type).first()
            return True, oauthret
        except Exception, e:
            log.error('get_code_oauth is error%s' % (e))
            return False, None



    def save_access_token(self, db_session, team_uuid, src_type, access_token):
        """ 存储 access_token """
        try:
            time_str = str(get_timestamp_13)
            auth_id = uuid.uuid3(uuid.NAMESPACE_DNS, str(team_uuid) + str(src_type) + time_str).__str__()
            github_oauth = CodeOauth(code_oauth_uuid=auth_id, team_uuid=team_uuid, access_token=access_token, src_type=src_type)
            db_session.add(github_oauth)
            db_session.commit()
            return True
        except Exception, e:
            db_session.rollback()
            log.error('save_access_token is error%s' % (e))
            return False


    def update_code_oauth_only_user(self, db_session, team_uuid, src_type, git_name, git_emain, git_uid):
        """ 仅仅更新 CodeOauth 中的用户信息 """
        try:
            db_session.query(CodeOauth).filter(CodeOauth.team_uuid == team_uuid,
                                           CodeOauth.src_type == src_type).update(
            {"git_name": git_name, "git_emain": git_emain, "git_uid": git_uid})
            db_session.commit()
            return True
        except Exception, e:
            db_session.rollback()
            log.error('save_access_token is error%s' % (e))
            return False

    def update_code_oauth(self, db_session, team_uuid, src_type, git_name, git_emain, git_uid, access_token):
        """ 更新 CodeOauth 的所有信息 """
        try:
            db_session.query(CodeOauth).filter(CodeOauth.team_uuid == team_uuid,
                                           CodeOauth.src_type == src_type).update(
            {"git_name": git_name, "git_emain": git_emain, "git_uid": git_uid, "access_token": access_token})
            db_session.commit()
            return True
        except Exception, e:
            db_session.rollback()
            log.error('save_access_token is error%s' % (e))
            return False


    def update_code_repo_web_hook(self, db_session, team_uuid, repo_name, random_key, hook_id):
        try:
            db_session.query(CodeRepo).filter(CodeRepo.team_uuid == team_uuid,
                                                CodeRepo.repo_name == repo_name).update(
                {'is_hook': '1', 'repo_hook_token': random_key, 'hook_id': hook_id})
            db_session.commit()
        except Exception, e:
            db_session.rollback()
            log.error('update_code_repo_web_hook is error%s' % (e))
            return False, None



    def get_code_repo(self, db_session, team_uuid, src_type):
        """ 获取代码项目 """
        try:
            code_repo = db_session.query(CodeRepo).filter(
                CodeRepo.team_uuid == str(team_uuid), CodeRepo.src_type == src_type).all()
            return True, code_repo
        except Exception, e:
            log.error('auto_ImageRepository is error%s' % (e))
            return False, None
