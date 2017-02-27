#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/6 17:37
"""


import requests
from collections import namedtuple

from conf.conf import image_api_prefix

Scope = namedtuple('Scope', ['type', 'image', 'actions'])

import json
from base64 import b64decode

from flask import request
from flask_restful import Resource

from common.logs import logging as log
from common.code import request_result
from common.time_log import time_log
from common.token_ucenterauth import token_auth  # 使用这个
from common.parameters import context_data
from imageAuth.rpcapi import rpc_client as imagerepo_rpcapi


class TestApi(Resource):
    @time_log
    def get(self):
        log.info('test api is ok')
        return request_result(0, 'test api is ok')


def get_token(username, password, team_name):
    try:  # 获取token

        url_suffix = '/api/v1.0/imagerepo/userteamtoken'

        url = image_api_prefix + url_suffix

        body = {"user_name": username, "password": password, "team_name": team_name}
        headers = {'content-type': "application/json"}
        body = json.dumps(body)

        log.info("get_token body: %s ", str(body))
        log.info("get_token url: %s ", str(url))

        ret = requests.post(url=url, data=body, headers=headers)

        log.info("get_token res: %s ", str(ret.json()))

        if ret.json()['status'] == 0:
            return True, ret.json()['result']
    except Exception, e:
        log.error('Token check error, token=, reason=%s', (e))
        return False, ''


class ImageRepoExist(Resource):
    """ 镜像名得到镜像id """
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    """
    @api {get} /api/v1.0/imagerepo/publicimage/?imagename=boxlinker/boxlinker-git 1.1 镜像名得到id
    @apiName get image_uuid
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 镜像名得到镜像id

    @apiHeader {String} token 请求接口的token,放在请求头中
    @apiUse CODE_IMAGE_REPO_0
    @apiParam {String} imagename  镜像名
    """
    @time_log
    def get(self):
        try:
            imagename = request.args.get('imagename')
            parameters = {}
            parameters['imagename'] = imagename
            if imagename is None or imagename == '':
                log.error('Parameters error')
                return request_result(101)

        except Exception, e:
            log.error('Parameters error')
            return request_result(101)

        context = context_data(None, 'get_image_uuid_by_name', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='get_image_uuid_by_name', context=context, parameters=parameters)


class RegistryNotice(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    @time_log
    def post(self):
        try:
            log.info('RegistryNotice come ')
            events = request.json['events']
            for event in events:
                assert isinstance(event, dict)
                action = event['action']
                if 'push' == action or 'pull' == action:  # 先有 push, pull 再有 target_mediaType
                    target_mediaType = event['target']['mediaType']
                    if target_mediaType == 'application/vnd.docker.distribution.manifest.v2+json':
                        parameters = dict()
                        parameters['event'] = event
                        context = context_data(None, 'registry_notice', 'create')
                        log.info('RegistryToken get 02')
                        self.imagerepo_api.RunImageRepoClient(api='registry_notice', context=context, parameters=parameters)
        except Exception, e:
            log.error('Parameters error: %s' % (e))
            return request_result(101)
        return request_result(0)

    def get(self):
        return request_result(0)

class RegistryToken(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    @time_log
    def get(self):
        try:
            Authorization = request.headers.get('Authorization', default='').decode('utf-8').encode('utf-8')

            # 符号分隔为三组，分别描述范围、资源名、动作
            # repository:libary/nginx:push,pull
            # url 里含有的信息
            scopes = request.args.get('scope', '').decode('utf-8').encode('utf-8')
            account = request.args.get('account', '').decode('utf-8').encode('utf-8')
            service = request.args.get('service', '').decode('utf-8').encode('utf-8')
            log.info('args value --> |  scopes: ' + scopes + '|  account: ' + account + '|  service: ' + service)

            request_headers = dict(request.headers)
            for kk in request_headers:
                log.info('-----headers--- key: ' + str(kk) + '   value: ' + str(request_headers[kk]))

            username = ''
            password = ''
            if Authorization != '':  # 对于临时用户, pull library 下的镜像时 Authorization 为空
                username, password = b64decode(Authorization.replace('Basic', '').replace(' ', '')).split(':')
            log.info('Authorization value --> |  username: ' + username + '|  password: ' + password)

        except Exception , e:
            log.error('Parameters error')
            return request_result(101)

        parameters = dict()

        parameters['service'] = service
        parameters['account'] = account
        parameters['scopes'] = scopes
        parameters['username'] = username
        parameters['password'] = password

        if scopes == '':  # 登录没有镜像信息
            parameters['team_name'] = username
        else:
            # repository:libary/nginx:push, pull
            type_, image, actions = scopes.split(':')
            actionlist = actions.split(',')
            scope = Scope(type_, image, actionlist)
            imagelist = image.split('/')

            if len(imagelist) != 2:
                log.error('image is error')
                return request_result(101)

            # index.boxliner.com/user_name/image_name:tag
            repo_user_name, repo_name = imagelist
            parameters['team_name'] = repo_user_name
            parameters['repo_name'] = repo_name
            parameters['imagename'] = image

        context = context_data(None, 'registry_token', 'create')
        return self.imagerepo_api.RunImageRepoClient(api='registry_token', context=context, parameters=parameters)


class ImageRepoRankApi(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    """
    @api {get} /api/v1.0/imagerepo/ranks 1.2 镜像排名
    @apiName mages ranks
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 镜像排名

    @apiHeader {String} token 请求接口的token,放在请求头中

    @apiUse CODE_IMAGE_REPO_PUB_LIST_0
    """
    @time_log
    def get(self):
        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))
            return request_result(201)
        context = context_data(token, 'image_repo_rank', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='image_repo_rank', context=context)





# /api/v1.0/repository/repos/<int:page>/<int:page_size>/?repo_fuzzy=library%2Fnginx   平台镜像; 镜像搜索
# 平台公开镜像 /api/v1.0/imagerepo/repos/<int:page>/<int:page_size>
class ImageRepoPublic(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    """
    @api {get} /api/v1.0/imagerepo/publicimages/<int:page>/<int:page_size>  1.3 平台镜像
    @apiName public image
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 平台镜像

    @apiHeader {String} token 请求接口的token,放在请求头中

    @apiParam {int} page  第几页
    @apiParam {int} page_size  每页请求的数据个数

    @apiUse CODE_IMAGE_REPO_PUB_LIST_0
    """

    """
    @api {get} /api/v1.0/imagerepo/publicimages/<int:page>/<int:page_size>/?repo_fuzzy=library%2Fnginx  1.4 平台镜像搜索
    @apiName public image search
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 平台镜像搜索

    @apiHeader {String} token 请求接口的token,放在请求头中
    @apiParam {String} repo_fuzzy  搜索参数

    @apiUse CODE_IMAGE_REPO_PUB_LIST_0
    """
    @time_log
    def get(self, page, page_size):
        try:
            token = request.headers.get('token')
            token_auth(token)
            repo_fuzzy = request.args.get('repo_fuzzy')
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))
            return request_result(201)
        parameters = {}
        parameters['page'] = page
        parameters['page_size'] = page_size
        parameters['repo_fuzzy'] = repo_fuzzy

        context = context_data(token, 'image_repo_public', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='image_repo_public', context=context, parameters=parameters)





# 自己的镜像
class OwnImageRepo(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    """
    @api {get} /api/v1.0/imagerepo/ownimages/<int:page>/<int:page_size>  1.5 我的镜像
    @apiName my own image
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 我的镜像
    @apiHeader {String} token 请求接口的token,放在请求头中
    @apiUse CODE_IMAGE_REPO_PUB_LIST_0
    """

    """
    @api {get} /api/v1.0/imagerepo/ownimages/<int:page>/<int:page_size>/?repo_fuzzy=library%2Fnginx  1.6 我的镜像搜索
    @apiName my own image search
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 我的镜像搜索
    @apiParam {String} repo_fuzzy  搜索参数
    @apiHeader {String} token 请求接口的token,放在请求头中
    @apiUse CODE_IMAGE_REPO_PUB_LIST_0
    """
    @time_log
    def get(self, page, page_size):
        try:
            token = request.headers.get('token')
            token_auth(token)

        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))
            return request_result(201)
        repo_fuzzy = request.args.get('repo_fuzzy')
        parameters = {}
        parameters['page'] = page
        parameters['page_size'] = page_size
        parameters['repo_fuzzy'] = repo_fuzzy

        context = context_data(token, 'image_repo_own', 'read')
        return self.imagerepo_api.RunImageRepoClient(context, parameters, api='image_repo_own')


class ImageRepoSystem(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    """
    @api {get} /api/v1.0/imagerepo/image/<string:repoid>/public_info  1.9 镜像详情(公开的镜像详情)
    @apiName image info
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 当个镜像 操作 (系统注册用户都可以调用该接口)

    @apiHeader {String} token 请求接口的token,放在请求头中

    @apiUse CODE_IMAGE_REPO_DETAIL_1
    """
    @time_log
    def get(self, repoid):
        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))
            return request_result(201)

        parameters = {}
        parameters['repoid'] = repoid

        context = context_data(token, 'image_repo_public_info', 'read')
        return self.imagerepo_api.RunImageRepoClient(api='image_repo_public_info', context=context, parameters=parameters)


# 单个镜像操作
class ImageRepo(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()

    """
    @api {get} /api/v1.0/imagerepo/image/<string:repoid>  1.6 镜像详情
    @apiName image info
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 镜像详情

    @apiHeader {String} token 请求接口的token,放在请求头中
    @apiUse CODE_IMAGE_REPO_DETAIL_0
    """
    @time_log
    def get(self, repoid):
        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))
            return request_result(201)

        parameters = {}
        parameters['repoid'] = repoid
        context = context_data(token, repoid, 'read')
        return self.imagerepo_api.RunImageRepoClient(api='image_repo_detail_get', context=context, parameters=parameters)

    """
    @api {delete} /api/v1.0/imagerepo/image/<string:repoid>  1.7 删除镜像
    @apiName image info
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 删除镜像
    @apiHeader {String} token 请求接口的token,放在请求头中
    @apiUse CODE_IS_OK_0
    """
    @time_log
    def delete(self, repoid):
        try:
            token = request.headers.get('token')
            token_auth(token)

        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))
            return request_result(201)

        parameters = {}
        parameters['repoid'] = repoid

        context = context_data(token, repoid, 'delete')
        return self.imagerepo_api.RunImageRepoClient(api='image_repo_del', context=context, parameters=parameters)


# 修改镜像详情
class ImageRepoDetail(Resource):
    def __init__(self):
        self.imagerepo_api = imagerepo_rpcapi.ImageRepoClient()


    """ 修改镜像,详情 """
    """
    @api {put} /api/v1.0/imagerepo/image/<string:repoid>/detail/<string:detail_type>  1.8 修改镜像详情
    @apiName modify image info
    @apiGroup ImageRepo
    @apiVersion 1.0.0
    @apiDescription 修改镜像详情

    @apiExample {put} Example usage:
        data = {
            "detail": "ubuntu office images",
        }

    @apiParam {String} repoid  镜像id
    @apiParam {String} detail  详细描述 或 简单描述
    @apiParam {String} detail_type    short_description:简单介绍, detail:详细描述,

    @apiHeader {String} token 请求接口的token,放在请求头中

    @apiUse CODE_IS_OK_0
    """
    @time_log
    def put(self, repoid, detail_type):
        try:
            token = request.headers.get('token')
            token_auth(token)
        except Exception, e:
            log.error('Token check error, token=%s, reason=%s' % (token, e))
            return request_result(201)

        try:
            body = request.get_data()
            parameters = json.loads(body)
        except Exception, e:
            log.error('Parameters error, body=%s, reason=%s' % (body, e))
            return request_result(101)

        parameters['repoid'] = repoid
        parameters['detail_type'] = detail_type

        context = context_data(token, repoid, 'update')
        return self.imagerepo_api.RunImageRepoClient(api='user_team_token', context=context, parameters=parameters)
