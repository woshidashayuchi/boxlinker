#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/21 15:40
"""

import time

from pyTools.token.token import gen_token, make_random_key

import conf.oauthConf as openOauth

from common.code import request_result
from common.logs import logging as log

import imageAuth.manager.githubApi as githubApi
import imageAuth.manager.CodingApi as CodingApi
from imageAuth.db.oauth_db import OauthDB






class CodeOauthManager(object):
    def __init__(self):
        self.oauthdb = OauthDB()

    def update_code_oauth(self, db_session, team_uuid, token, src_type, update_token=False):
        """更新  CodeOauth 中的用户信息"""
        if src_type == 'github':
            retbool, git_name, git_uid, git_emain = githubApi.get_github_user_some_info(token=token)
        elif src_type == 'coding':
            retbool, git_name, git_uid, git_emain = CodingApi.get_coding_user_some_info(access_token=token)
        else:
            return False, None

        if retbool is False:
            return False, None

        if update_token:
            retbool = self.oauthdb.update_code_oauth(db_session=db_session, team_uuid=team_uuid, src_type=src_type,
                                                     git_name=git_name, git_emain=git_name, git_uid=git_uid,
                                                     access_token=token)
        else:
            retbool = self.oauthdb.update_code_oauth_only_user(db_session=db_session, team_uuid=team_uuid,
                                                               src_type=src_type,
                                                               git_name=git_name, git_emain=git_name, git_uid=git_uid)

        if retbool is False:
            return False, None
        return True, (git_name, git_uid, git_emain)


    def get_code_oauth_info(self, db_session, team_uuid, src_type):
        """ 根据组织uuid 和 第三方类型, 获取 CodeOauth , 返回"""
        retbool, oauthret = self.oauthdb.get_code_oauth(db_session=db_session, team_uuid=team_uuid, src_type=src_type)

        if retbool is False:
            return False, None
        access_token = oauthret.access_token
        if access_token is None or '' == access_token:
            return False, None

        git_name = oauthret.git_name
        git_uid = oauthret.git_uid
        git_emain = oauthret.git_emain

        # 还没有获取用户信息,需要获取用户信息并更新到数据表
        # if git_name is None or ret.git_emain is None or git_uid is None:
        if git_name is None or git_uid is None:  # 对于不显示email的用户设置，无法得到用户邮箱
            retbool, git_name, git_uid, git_emain = self.update_code_oauth(db_session=db_session, team_uuid=team_uuid,
                                              src_type=src_type, token=access_token)
        return retbool, (access_token, git_name, git_uid, git_emain)




class OauthUrlManager(object):
    def __init__(self):
        log.info('OauthUrlManager __init__')

    def create_oauth_url(self, team_uuid, src_type, redirect_url):
        """ 生成带有用户信息的url认证地址, state 码 """
        state_msg = {
            'team_uuid': str(team_uuid),  # 组织uuid
            'src_type': src_type,  # 第三方平台类型, github, coding
            'redirect_url': redirect_url,
            'expires': time.time() + 30 * 24 * 60 * 60
        }

        state_ret = gen_token(key=openOauth.SECRET_KEY, data=state_msg)

        if src_type == "github":
            return openOauth.user_oauth_url.format(state_ret)
        elif 'coding' == src_type:
            return openOauth.coding_oauth_url.format(state_ret)
        else:
            return None

    def get_oauth_url(self, team_uuid, src_type, redirect_url):
        url_state = self.create_oauth_url(team_uuid, src_type, redirect_url)
        if url_state is None:
            return request_result(101)
        return request_result(0, ret=url_state)


class CallBackManager(object):
    def __init__(self):
        self.CodeOauthManager = CodeOauthManager()
        self.oauthdb = OauthDB()

    # coding 回调
    def callback_coding(self, db_session, src_type, code, team_uuid):

        token = CodingApi.get_token_by_code(client_id=openOauth.coding_client_id,
                                            client_secret=openOauth.coding_client_secret, code=code)

        retbool, oauthret = self.oauthdb.get_code_oauth(db_session=db_session, team_uuid=team_uuid, src_type=src_type)

        if retbool is False:
            return False, None, None

        return True, token, oauthret


    def callback_git(self, db_session, src_type, code, team_uuid):

        token = githubApi.get_token_by_code(code=code, client_id=openOauth.github_client_id,
                                            client_secret=openOauth.github_client_secret)

        retbool, oauthret = self.oauthdb.get_code_oauth(db_session=db_session, team_uuid=team_uuid, src_type=src_type)
        if retbool is False:
            return False, None, None

        return True, token, oauthret




    def callback(self, db_session, src_type, code, team_uuid):
        if 'github' == src_type:
            retbool, token, oauthret = self.callback_git(db_session=db_session, src_type=src_type,
                                                         code=code, team_uuid=team_uuid)
        elif 'coding' == src_type:
            retbool, token, oauthret = self.callback_coding(db_session=db_session, src_type=src_type,
                                                            code=code, team_uuid=team_uuid)
        else:
            return request_result(101)


        if oauthret is None:  # 把 token 存起来
            retbool = self.oauthdb.save_access_token(db_session=db_session, team_uuid=team_uuid,
                                                     src_type=src_type, access_token=token)
            if retbool is False:
                return request_result(404)

            ret = self.CodeOauthManager.update_code_oauth(db_session=db_session, team_uuid=team_uuid, token=token, src_type=src_type)
        else:
            ret = self.CodeOauthManager.update_code_oauth(db_session=db_session, team_uuid=team_uuid, token=token, src_type=src_type, update_token=True)

        return ret



class WebHookManager(object):
    def __init__(self):
        self.oauthdb = OauthDB()
        self.CodeOauthManager = CodeOauthManager()
        self.callback = CallBackManager()


    # 设置 github webhook
    def SetGitHook(self, db_session, git_name, repo_name, team_uuid, access_token, del_hooks=False):
        if del_hooks:
            githubApi.DelGithubHooks(git_name=git_name, repo_name=repo_name, token=access_token)

        random_key = make_random_key()

        retbool, response_json = githubApi.SetGithubHook(
            git_name=git_name, repo_name=repo_name, token=access_token, payload_url=None, secret=random_key)
        if retbool is False:
            return request_result(100, ret=response_json)

        # 从  response_json  取回hook_id

        hook_id = 'ss'
        self.oauthdb.update_code_repo_web_hook(db_session=db_session, team_uuid=team_uuid,
                                               repo_name=repo_name, random_key=random_key,hook_id=hook_id)


    def create_web_hook(self, db_session, team_uuid, src_type, repo_name):
        retbool, result = self.CodeOauthManager.get_code_oauth_info(db_session=db_session, team_uuid=team_uuid, src_type=src_type)
        if retbool is False:
            return request_result(601)

        access_token, git_name, git_uid, git_emain = result


        if 'github' == src_type:
            return self.SetGitHook(db_session, git_name, repo_name, team_uuid, access_token, del_hooks=True)
        elif 'coding' == src_type:
            log.info('ssss')
            return request_result(0)

            # from authServer.common.oauthclient.webhooks import SetWebHook
            # return SetWebHook(git_name=git_name, repo_name=repo_name,
            #                   access_token=access_token, uid=uid, src_type=kwargs['src_type_arg'])
            #



# 代码项目管理
class OauthCodeRepoManager(object):
    def __init__(self):
        self.oauthdb = OauthDB()
        self.CodeOauthManager = CodeOauthManager()

    def GetCodeRepoList(self, db_session, access_token, git_name, uid, git_uid, src_type, team_uuid):
        """ 从数据库中, 获取代码项目 """

        code_repo = self.oauthdb.get_code_repo(db_session=db_session, team_uuid=team_uuid, src_type=src_type)

        if code_repo is None:
            return request_result(0)
        repo_list = list()
        for node in code_repo:
            repo_list.append(
                {'repo_name': node.repo_name, 'git_uid': node.repo_uid, 'is_hook': node.is_hook,
                 'id': node.id, 'html_url': node.html_url, 'ssh_url': node.ssh_url,
                 'url': node.url, 'description': node.description, 'git_name': git_name})

        return request_result(0, ret=repo_list)



    def refresh_repos(self, db_session, access_token, git_name, uid, git_uid, src_type, team_uuid):
        """ 刷新 github 代码列表 """

        if src_type == 'github':
            retbool, ret_json = githubApi.GetGithubALLRepoList(token=access_token, username=git_name)
            if retbool is False:
                return ret_json
        elif src_type == 'coding':

            code, ret_json = CodingApi.GetRepoList(access_token=access_token)
            if code is False:
                return ret_json
            ret_json = ret_json['data']['list']  # coding 和 github 结构不一样

        repo_list = list()
        code_repos = list()

        old_repo_name_d = dict()
        old_githubrepo = self.oauthdb.get_code_repo(db_session=db_session, team_uuid=team_uuid, src_type=src_type)


        if old_githubrepo is not None:
            for node_repo in old_githubrepo:
                old_repo_name_d[node_repo.repo_id] = node_repo.repo_id



        # 全部标记已经删除
        g.db_session.query(CodeRepo).filter(
            CodeRepo.uid == uid, CodeRepo.src_type == src_type
        ).update({'deleted': '1', })

        g.db_session.commit()

        # ret_json = ret_json['data']['list']  # coding 和 github 结构不一样
        for node in ret_json:

            # github == coding
            repo_id = str(node['id'])
            description = node['description']
            repo_name = node['name']
            ssh_url = node['ssh_url']
            git_url = node['git_url']

            if src_type == 'github':
                html_url = node['html_url']
            elif src_type == 'coding':
                html_url = node['https_url']

            if repo_id in old_repo_name_d:
                g.db_session.query(CodeRepo).filter(
                    CodeRepo.uid == uid, CodeRepo.repo_id == repo_id, CodeRepo.src_type == src_type
                ).update(
                    {'repo_name': repo_name,
                     'html_url': html_url,
                     'ssh_url': ssh_url,
                     'url': git_url,
                     'description': description,
                     'deleted': '0',
                     })
            else:
                code_repos.append(CodeRepo(
                    uid=uid, repo_uid=git_uid, repo_id=repo_id, repo_name=repo_name, update_time=get_now_time(),
                    creation_time=get_now_time(), src_type=src_type, html_url=html_url, ssh_url=ssh_url,
                    url=git_url, description=description, deleted='0'
                ))

        g.db_session.add_all(code_repos)
        g.db_session.commit()

        # 真正删除
        try:
            del_repos = g.db_session.query(CodeRepo).filter(CodeRepo.uid == str(uid),
                                                            CodeRepo.src_type == src_type,
                                                            CodeRepo.deleted == '1').all()

            for del_repo in del_repos:
                g.db_session.delete(del_repo)
                g.db_session.commit()
            print "del is ok"
        except Exception as msg:
            print "del is error"
            print msg.message
            return request_result(100, ret=msg.message)

        return DbGetRepoList(access_token=access_token, git_name=git_name, uid=uid, git_uid=git_uid, src_type=src_type)





    def refresh_code_repo(self, access_token, git_name, uid, git_uid):
        """ 刷新 github 代码列表 """

        if src_type == 'github':
            from authServer.common.oauthclient.HubApi import GetGithubRepoList, GetGithubALLRepoList
            # # modify liuzhangpei 20170121
            # retbool, ret_json = GetGithubRepoList(token=access_token, username=git_name)
            retbool, ret_json = GetGithubALLRepoList(token=access_token, username=git_name)
            if retbool is False:
                return ret_json
        elif src_type == 'coding':
            from authServer.common.oauthclient.CodingApi import GetRepoList
            code, ret_json = GetRepoList(access_token=access_token)
            if code is False:
                return ret_json
            ret_json = ret_json['data']['list']  # coding 和 github 结构不一样

        repo_list = list()
        code_repos = list()

        old_repo_name_d = dict()
        old_githubrepo = g.db_session.query(CodeRepo).filter(CodeRepo.uid == str(uid),
                                                             CodeRepo.src_type == src_type).all()
        if old_githubrepo is not None:
            for node_repo in old_githubrepo:
                old_repo_name_d[node_repo.repo_id] = node_repo.repo_id

        # print "------------> 01"
        # print ret_json
        # print "------------> 02"

        # 全部标记已经删除
        g.db_session.query(CodeRepo).filter(
            CodeRepo.uid == uid, CodeRepo.src_type == src_type
        ).update({'deleted': '1', })

        g.db_session.commit()

        # ret_json = ret_json['data']['list']  # coding 和 github 结构不一样
        for node in ret_json:

            # github == coding
            repo_id = str(node['id'])
            description = node['description']
            repo_name = node['name']
            ssh_url = node['ssh_url']
            git_url = node['git_url']

            if src_type == 'github':
                html_url = node['html_url']
            elif src_type == 'coding':
                html_url = node['https_url']

            if repo_id in old_repo_name_d:
                g.db_session.query(CodeRepo).filter(
                    CodeRepo.uid == uid, CodeRepo.repo_id == repo_id, CodeRepo.src_type == src_type
                ).update(
                    {'repo_name': repo_name,
                     'html_url': html_url,
                     'ssh_url': ssh_url,
                     'url': git_url,
                     'description': description,
                     'deleted': '0',
                     })
            else:
                code_repos.append(CodeRepo(
                    uid=uid, repo_uid=git_uid, repo_id=repo_id, repo_name=repo_name, update_time=get_now_time(),
                    creation_time=get_now_time(), src_type=src_type, html_url=html_url, ssh_url=ssh_url,
                    url=git_url, description=description, deleted='0'
                ))

        g.db_session.add_all(code_repos)
        g.db_session.commit()

        # 真正删除
        try:
            del_repos = g.db_session.query(CodeRepo).filter(CodeRepo.uid == str(uid),
                                                            CodeRepo.src_type == src_type,
                                                            CodeRepo.deleted == '1').all()

            for del_repo in del_repos:
                g.db_session.delete(del_repo)
                g.db_session.commit()
            print "del is ok"
        except Exception as msg:
            print "del is error"
            print msg.message
            return request_result(100, ret=msg.message)

        return DbGetRepoList(access_token=access_token, git_name=git_name, uid=uid, git_uid=git_uid, src_type=src_type)


if __name__ == '__main__':
    OUM = OauthUrlManager()

    print OUM.create_oauth_url('sdsds', 'codings', 'wwww.baidu.com')
