#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/7 10:08
"""

from common.logs import logging as log
from common.code import request_result
from common.parameters import parameter_check, context_data
from common.acl import acl_check
from common.token_ucenterauth import token_auth



from imageAuth.manager import images_manage, user_manage

from imageAuth.db import image_repo_db

class ImageRepoRpcAPI(object):
    def __init__(self):
        self.images_manage = images_manage.ImageRepoManager()
        self.usercenter = user_manage.UcenterManager()
        self.image_repo_db = image_repo_db.ImageRepoDB()

    @acl_check
    def image_repo_rank(self, context, parameters):
        """ 镜像排名 """
        log.info('image_repo_rank begin')
        return self.images_manage.image_rank()

    # 平台镜像; 平台镜像搜索
    @acl_check
    def image_repo_public(self, context, parameters):
        try:
            page = parameters.get('page')
            page_size = parameters.get('page_size')
            repo_fuzzy = parameters.get('repo_fuzzy')

            page = parameter_check(page, ptype='pint')
            page_size = parameter_check(page_size, ptype='pint')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        log.info('image_repo_public begin')

        if repo_fuzzy is None:
            return self.images_manage.image_repo_public(page, page_size)

        return self.images_manage.image_repo_public_search(page, page_size, repo_fuzzy)


    # 平台镜像; 平台镜像搜索
    @acl_check
    def image_repo_own(self, context, parameters):
        try:

            user_info = token_auth(context['token'])['result']

            log.info('image_repo_own user_info: %s' % (user_info))
            team_uuid = user_info.get('team_uuid')

            page = parameters.get('page')
            page_size = parameters.get('page_size')
            repo_fuzzy = parameters.get('repo_fuzzy')

            page = parameter_check(page, ptype='pint')
            page_size = parameter_check(page_size, ptype='pint')

        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        log.info('image_repo_own begin')

        if repo_fuzzy is None:
            return self.images_manage.image_repo_own(page, page_size, team_uuid)

        return self.images_manage.image_repo_own_search(page, page_size, repo_fuzzy, team_uuid)


    # image_repo_own  image_repo_get_detail
    # 获取一个镜像的详情
    @acl_check
    def image_repo_get_detail(self, context, parameters):
        try:
            repoid = parameters.get('repoid')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.images_manage.GetRepoDetail(repoid)

    # 获取一个镜像的公开详情
    @acl_check
    def image_repo_get_public_detail(self, context, parameters):
        try:

            user_info = token_auth(context['token'])['result']
            team_uuid = user_info.get('team_uuid')
            repoid = parameters.get('repoid')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.images_manage.GetRepoDetail(repoid, private=False)


    # 删除一个镜像
    @acl_check
    def image_repo_del(self, context, parameters):
        try:

            user_info = token_auth(context['token'])['result']
            team_uuid = user_info.get('team_uuid')
            repoid = parameters.get('repoid')

        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.images_manage.delRepo(repoid, team_uuid)


    # 修改镜像详情
    @acl_check
    def image_repo_modify_detail(self, context, parameters):
        try:
            repoid = parameters.get('repoid')
            detail_type = parameters.get('detail_type')
            detail = parameters.get('detail')

            log.info('image_repo_modify_detail --> repoid: %s, detail_type=%s, detail=%s' % (repoid, detail_type, detail))

            Type = ['short_description', 'detail', 'is_public']

            if detail_type not in Type:
                log.error('detail_type is short_description or detail')
                return request_result(101)

            if detail_type == 'is_public' and ('1' != detail and '0' != detail):
                log.error('detail_type is is_public but detail not is 0/1')
                return request_result(101)

        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.images_manage.modifyRepoDetail(repoid, detail_type, detail)


    # 镜像名是否存在
    def image_repo_name_exist(self, context, parameters):
        try:
            imagename = parameters.get('imagename')
            if imagename is None or imagename == '':
                log.error('imagename is null')
                return request_result(101)
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        return self.images_manage.image_repo_name_exist(imagename)


    # 第一接口
    def registry_token(self, context, parameters):
        try:
            username = parameters.get('username')
            password = parameters.get('password')
            service = parameters.get('service')
            account = parameters.get('account')
            scopes = parameters.get('scopes')
            team_name = parameters.get('team_name')
            imagename = parameters.get('imagename')
            team_name = parameter_check(team_name, ptype='pnam', exist='no')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s' % (context, parameters, e))
            return request_result(101)

        # 系统账号, 开放镜像, 任意用户都可以 pull 获取到(不需要登录)
        open_library = ('library')
        if '' != scopes and team_name in open_library:
            type_, image, actions = scopes.split(':')
            actionlist = actions.split(',')
            if 'push' in actionlist:  # 不能用pull判断, 应该用 push 判断, 存在 push 即为拉去操作
                log.info('push library images no access permission')
                pass  # 执行正常的用户操作
            else:
                log.info('pull library images ')
                return self.images_manage.get_registry_token(account, service, scopes)


        try:
            user_name = parameter_check(username, ptype='pnam')  # 对 pull library 镜像的临时用户
            password = parameter_check(password, ptype='ppwd')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s' % (context, parameters, e))
            return request_result(101)


        # 获取token
        try:
            token = ''
            log.info('GetTokenByUnamePassTeam: user_name: %s, password: %s, team_name: %s' % (user_name, password, team_name))
            admin_user = ('boxlinker')
            if user_name in admin_user:  # admin 账号自己操作自己的镜像
                retbool, token = self.usercenter.username_password_authentication(user_name, password)
                if retbool is False:
                    return request_result(201)
            else:
                retbool, token = self.usercenter.username_password_teams_token(user_name, password, team_name)
                if retbool is False:
                    return request_result(201)

            retbool, team_info = self.usercenter.get_team_uuid(token=token, team_name=team_name)
            if retbool is False:
                return request_result(101)

            team_uuid = team_info['team_uuid']
            log.info('registry_token token new : %s, team_uuid: %s' % (token, team_uuid))

        except Exception, e:
            log.error('get token  error %s ' % (e))
            return request_result(201)

        # 登录操作,没有镜像, 只是登录操作,用户名和密码认证之后既可以返回token
        if '' == scopes:
            context = context_data(token, 'registry_token_generate_login', 'create')
            return self.generate_registry_token(context, parameters)

        type_, image, actions = scopes.split(':')
        actionlist = actions.split(',')
        retbool, repo_uuid = self.images_manage.get_repo_uuid(scopes, team_uuid, is_public=0)
        if retbool is False:
            log.error('get_repo_uuid is error')
            return request_result(601)

        # admin 账号  只要token正确  可以任意权限, 不能比 self.images_manage.get_repo_uuid 先执行,否则无法初始化数据
        if user_name in admin_user:
            context = context_data(token, 'registry_token_generate_login', 'create')
            return self.generate_registry_token(context, parameters)

        log.info('repo_uuid: %s, token: %s' % (repo_uuid, token))
        if 'push' in actionlist:  # 修改更新镜像
            context = context_data(token, repo_uuid, 'create')
        else:  # pull 读取
            context = context_data(token, repo_uuid, 'read')
        log.info('generate_registry_token begin context: %s' % (context))
        return self.generate_registry_token(context, parameters)

    @acl_check
    def generate_registry_token(self, context, parameters):
        """ 生成token """
        try:
            service = parameters.get('service')
            account = parameters.get('account')
            scopes = parameters.get('scopes')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s' % (context, parameters, e))
            return request_result(101)
        return self.images_manage.get_registry_token(account, service, scopes)

    def registry_notice(self, context, parameters):
        """ registry 通知 """
        try:
            event = parameters['event']
            assert isinstance(event, dict)
            action = event['action']
        except Exception, e:
            log.error('event parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)

        try:
            if 'push' == action or 'pull' == action:
                target_mediaType = event['target']['mediaType']
                if target_mediaType == 'application/vnd.docker.distribution.manifest.v2+json':
                    url = event['target']['url']
                    tag = event['target']['tag']  # 有些通知不含有  tag  标记
                    repository = event['target']['repository']
                    length = event['target']['length']

                    log.info('registry_notice --> 01')

                    timestamp = event['timestamp']
                    log.info('registry_notice timestamp: %s' % (timestamp))
                    timestamp = str(timestamp).rsplit('.')[0].replace('T', ' ')

                    log.info('registry_notice --> 02')
                    actor = event['actor']['name']
                    action = event['action']
                    log.info('registry_notice --> 03')

                    digest = event['target']['digest']
                    size = event['target']['size']
                    repo_id = event['id']
                    source_instanceID = event['source']['instanceID']
                    source_addr = event['source']['addr']
                    log.info('registry_notice --> 04')

                    if 'push' == action:
                        log.info('registry_notice push')
                        self.image_repo_db.image_repo_push_event(repository, tag, url, length, actor, action, timestamp,
                              digest, size, repo_id, source_instanceID, source_addr)
                    elif 'pull' == action:
                        log.info('registry_notice pull')
                        # 对于 pull 操作,也就是download + 1
                        self.image_repo_db.image_repo_download_add(imagename=repository)

            return request_result(0)
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s'
                      % (context, parameters, e))
            return request_result(101)