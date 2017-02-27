#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/21 15:48
"""

from conf import DEBUG

OpenType = ['github', 'coding']


SECRET_KEY = 'wwq44rw3drwkr2o334i34343'

if DEBUG:
    # OAUTH_CALLBACK = 'http://192.168.1.6:8080/api/v2.0/oauths/callback'
    OAUTH_CALLBACK = 'https://registrytoken.boxlinker.com:8843/api/v1.0/oauthclient/callback'
    # OAUTH_CALLBACK = 'http://0.0.0.0:8000/api/v2.0/oauths/callback'
    OAUTH_WEBHOOKS = 'https://registrytoken.boxlinker.com:8843/api/v1.0/oauthclient/webhoos'

    # github Developer applications
    github_client_id = '9a8c43fa5301c02fb2f4'  # Client ID
    github_client_secret = '7510113c65735c7d3614b2164ba5e698e0c2104a'  # Client Secret

    # coding
    coding_client_id = 'e40b63f1f68c2ac6c8a56393882738f5'  # Client ID
    coding_client_secret = 'e0bedfdb802f3bdb9c28df3ba90ecc909f008e27'  # Client Secret
else:
    OAUTH_CALLBACK = 'https://auth.boxlinker.com/api/v2.0/oauths/callback'
    OAUTH_WEBHOOKS = 'https://auth.boxlinker.com/api/v2.0/oauths/webhoos'

    # github Developer applications
    github_client_id = '44df81c41ee415b7debd'  # Client ID
    github_client_secret = '2ee2f93d511b0ba753a8e55e51b94b256ab44b40'  # Client Secret

    # coding
    coding_client_id = 'd624d2f871e8253dc7f947eece312a20'  # Client ID
    coding_client_secret = 'efcfdb0e8b6e87c36c2f35c3a6ebaaa6747e3a13'  # Client Secret


# github_repos_url = 'https://api.github.com/users/{0}/repos'


# state 用于防止垮站点攻击
user_oauth_url = 'https://github.com/login/oauth/authorize?client_id=' + github_client_id + '&scope=user%20repo:email&state={0}'



coding_scope = "user,user:email,notification,project,project:depot,project:key"
coding_oauth_url = "https://coding.net/oauth_authorize.html?client_id=" + coding_client_id + \
                   "&redirect_uri=" + OAUTH_CALLBACK + "&response_type=code&scope=" + coding_scope + "&state={0}"
