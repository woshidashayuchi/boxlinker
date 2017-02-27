#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/21 15:35
@第三方绑定
"""

import json
from base64 import b64decode

from flask import request, redirect
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.time_log import time_log
from common.token_ucenterauth import token_auth  # 使用这个
from common.parameters import context_data
from imageAuth.rpcapi import rpc_client as imagerepo_rpcapi


import conf.oauthConf as openOauth


class OauthUrl(Resource):

    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    @time_log
    def post(self):
        """
        @apiGroup  OauthUrl
        @apiDescription   获取用户授权跳转链接
        @apiVersion 2.0.0
        @apiHeader {String} token 请求接口的token,放在请求头中
        @api {post} /api/v1.0/oauthclient/url   2.1获取用户授权跳转链接

        @apiExample {POST} Example usage:
            {
                "src_type": "github",
                "redirect_url": "http://test.boxlinker.com/building/create"
            }

        @apiSuccessExample {json} Success-Response:
        status 为 0 成功,其中result-->msg中即用户需要点击进行授权的地址
        {
            "msg": "OK",
            "result":
            {
                "msg": "https://github.com/login/oauth/authorize?client_id=44df81c41ee415b7debd&scope=user%20repo&state=eyJleHBpcmVzIjogMTQ3NTgzNzAxNi4wNzg2ODksICJzYWx0IjogIjAuMjQwNjIyOTU2NjgyIiwgInVpZCI6ICIzIn2ag7sMa7sSf6-vmhEMykRL"
            },
            "status": 0
        }
        @apiParam {String} src_type 第三方平台类型; github, coding
        @apiParam {String} redirect_url 跳转地址
        """
        try:
            token = request.headers.get('token')
            user_info = token_auth(token)['result']

            data = request.data
            data_json = json.loads(data)

            src_type = data_json.get('src_type', '').decode('utf-8').encode('utf-8')  # .lower()
            redirect_url = data_json.get('redirect_url', '').decode('utf-8').encode('utf-8')  # .lower()

            if src_type not in openOauth.OpenType:
                log.error("src_type is error : %s " % (src_type))
                return request_result(101)
        except Exception, e:
            log.error('OauthUrl is error: %s' % (e))
            return request_result(201)

        parameters = dict()
        parameters['src_type'] = src_type
        parameters['redirect_url'] = redirect_url
        parameters['team_uuid'] = user_info['team_uuid']

        context = context_data(token, 'get_oauth_url', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='get_oauth_url', context=context, parameters=parameters)


class CallBack(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    @time_log
    def get(self):
        try:
            code = request.args.get('code', '').decode('utf-8').encode('utf-8')
            # 如果不考虑用户篡改认证链接,可以不用加state
            state = request.args.get('state', '').decode('utf-8').encode('utf-8')

            if code == '' or state == '':
                return request_result(101)
        except Exception, e:
            log.error('CallBack is error: %s' % (e))
            return request_result(101)

        parameters = dict()
        parameters['code'] = code
        parameters['state'] = state

        log.info('CallBack--> code: %s, state: %s' % (code, state))

        context = context_data(None, 'oauth_callback', 'read')
        response = self.imagerepo_api.RunImageRepoClient(api='oauth_callback', context=context, parameters=parameters)

        if 'status' in response and 0 == response['status']:
            redirect_url = response['result']
        return redirect(redirect_url)


class WebHook(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    @time_log
    def post(self, src_type, repo_name):
        """
        @apiGroup  WebHooks
        @apiDescription   授权平台可以对某个项目具有 hooks 权限
        @apiVersion 1.0.0

        @api {post} /api/v2.0/oauths/webhooks/<string:src_type>/<string:repo_name> 设置webhook

        @apiHeader {String} token  请求接口的token,放在请求头中

        @apiParam {String} src_type   代码源类型;github or coding
        @apiParam {String} repo_name  代码项目名
        """
        try:
            token = request.headers.get('token')
            user_info = token_auth(token)['result']

            if src_type not in openOauth.OpenType:
                log.error('src_type is error: %' % (src_type))
                return request_result(101)
        except Exception, e:
            return request_result(201)

        parameters = dict()
        parameters['src_type'] = src_type
        parameters['team_uuid'] = user_info['team_uuid']
        parameters['repo_name'] = repo_name

        context = context_data(token, 'set_web_hook', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='set_web_hook', context=context, parameters=parameters)


class OauthCodeRepo(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    @time_log
    def get(self, src_type):
        """
        @apiGroup  OauthRepo
        @apiDescription         获取用户代码对应平台下的代码项目
        @apiVersion 2.0.0
        @apiHeader {String} token 请求接口的token,放在请求头中
        @api {get} /api/v1.0/oauthclient/repos/<string:src_type>   获取用户代码对应平台下的代码项目


        @apiSuccessExample {json} Success-Response:
        status 为 0 成功,其中result-->msg中即用户需要点击进行授权的地址
        {
            "msg": "OK",
            "result":
            {
                "msg": "https://github.com/login/oauth/authorize?client_id=44df81c41ee415b7debd&scope=user%20repo&state=eyJleHBpcmVzIjogMTQ3NTgzNzAxNi4wNzg2ODksICJzYWx0IjogIjAuMjQwNjIyOTU2NjgyIiwgInVpZCI6ICIzIn2ag7sMa7sSf6-vmhEMykRL"
            },
            "status": 0
        }

        @apiParam {String} src_type 第三方平台类型; github, coding
        """
        try:
            token = request.headers.get('token')
            user_info = token_auth(token)['result']
        except Exception, e:
            log.error('OauthCodeRepo is error: %s' % (e))
            return request_result(201)

        if src_type not in openOauth.OpenType:
            log.error("src_type is error : %s " % (src_type))
            return request_result(101)

        parameters = dict()
        parameters['src_type'] = src_type
        parameters['team_uuid'] = user_info['team_uuid']
        parameters['refresh'] = False

        context = context_data(token, 'get_oauth_code_repo', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='get_oauth_code_repo', context=context, parameters=parameters)

    def put(self, src_type):
        """
        @apiGroup  OauthRepo
        @apiDescription    刷新获取用户对应代码平台下的代码项目, 从对应平台获取最新的数据
        @apiVersion 2.0.0
        @apiHeader {String} token 请求接口的token,放在请求头中
        @api {put} /api/v1.0/oauthclient/repos/<string:src_type>   刷新代码项目


        @apiSuccessExample {json} Success-Response:
        status 为 0 成功,其中result-->msg中即用户需要点击进行授权的地址
        {
            "msg": "OK",
            "result":
            {
                "msg": "https://github.com/login/oauth/authorize?client_id=44df81c41ee415b7debd&scope=user%20repo&state=eyJleHBpcmVzIjogMTQ3NTgzNzAxNi4wNzg2ODksICJzYWx0IjogIjAuMjQwNjIyOTU2NjgyIiwgInVpZCI6ICIzIn2ag7sMa7sSf6-vmhEMykRL"
            },
            "status": 0
        }

        @apiParam {String} src_type 第三方平台类型; github, coding
        """
        try:
            token = request.headers.get('token')
            user_info = token_auth(token)['result']
        except Exception, e:
            log.error('OauthCodeRepo is error: %s' % (e))
            return request_result(201)

        if src_type not in openOauth.OpenType:
            log.error("src_type is error : %s " % (src_type))
            return request_result(101)

        parameters = dict()
        parameters['src_type'] = src_type
        parameters['team_uuid'] = user_info['team_uuid']
        parameters['refresh'] = True

        context = context_data(token, 'get_oauth_code_repo', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='get_oauth_code_repo', context=context, parameters=parameters)

# get_oauth_url   获取用户授权跳转链接  (token 对即可)
# oauth_callback  第三方授权回调,不需要用调用
# get_oauth_code_repo 获取用户代码对应平台下的代码项目(token 对即可)
# set_web_hook    授权平台可以对某个项目具有 hooks 权限(token 对即可)
