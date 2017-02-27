#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/22 10:34
"""


from imageAuth.manager.userTools import username_password_authentication, get_team_uuid, username_password_teams_token

import conf.oauthConf as openOauth

from common.logs import logging as log
from common.code import request_result
from common.parameters import parameter_check, context_data
from common.acl import acl_check

from imageAuth.manager import oauth_manage
from imageAuth.db.db import Session



class OauthCodeRpcApi(object):

    def __init__(self):
        self.oauth_url = oauth_manage.OauthUrlManager()
        self.oauth_callback = oauth_manage.CallBackManager()
        self.oauth_webhook = oauth_manage.WebHookManager()
        self.oauth_coderepo = oauth_manage.OauthCodeRepoManager()
        self.db_session = Session()

    @acl_check
    def OauthUrl(self, context, parameters):
        try:
            src_type = parameters['src_type']
            redirect_url = parameters['redirect_url']
            team_uuid = parameters['team_uuid']

            if src_type not in openOauth.OpenType:
                log.error("src_type is error : %s " % (src_type))
                return request_result(101)

            team_uuid = parameter_check(team_uuid, ptype='pstr')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.oauth_url.get_oauth_url(team_uuid=team_uuid, src_type=src_type, redirect_url=redirect_url)

    # 不需要token认证
    def CallBack(self, context, parameters):
        try:
            code = parameters['code']
            state = parameters['state']

            if code == '' or state == '':
                return request_result(101)
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)


        import json
        from pyTools.token.token import get_payload

        payloadRet = get_payload(token=state)  # token合法
        if payloadRet is None:
            return request_result(601)

        payload = payloadRet['payload']

        payload = json.loads(payload)

        team_uuid = payload['team_uuid']
        src_type = payload['src_type']
        # redirect_url = payload['redirect_url']

        ret = self.oauth_callback.callback(db_session=self.db_session, src_type=src_type,
                                           code=code, team_uuid=team_uuid)

        if 'redirect_url' not in payload:
            redirect_url = "oauth/gredirect"
        else:
            red_url = payload['redirect_url']
            redirect_url = "oauth/gredirect?redirect=" + red_url
        return request_result(0, ret=redirect_url)


    @acl_check
    def OauthCodeRepo(self, context, parameters):
        try:
            src_type = parameters['src_type']
            team_uuid = parameters['team_uuid']
            refresh = parameters['refresh']

            if src_type not in openOauth.OpenType:
                log.error("src_type is error : %s " % (src_type))
                return request_result(101)
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        if refresh is True:
            self.oauth_coderepo
        else:
            return self.oauth_coderepo.get_repo(db_session=self.db_session, team_uuid=team_uuid, src_type=src_type, repo_name=repo_name)



    @acl_check
    def WebHook(self, context, parameters):
        try:
            src_type = parameters['src_type']
            team_uuid = parameters['team_uuid']
            repo_name = parameters['repo_name']

            team_uuid = parameter_check(team_uuid, ptype='pstr')
            repo_name = parameter_check(repo_name, ptype='pstr')

            if src_type not in openOauth.OpenType:
                log.error('src_type is error: %' % (src_type))
                return request_result(101)

        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)


        return self.oauth_webhook.create_web_hook(db_session=self.db_session, team_uuid=team_uuid, src_type=src_type, repo_name=repo_name)



