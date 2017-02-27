#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 17/2/8 14:53
@ 测试 image_repo
"""

import requests



image_repo_prefix = 'https://registrytoken.boxlinker.com:8843'
image_repo_prefix = 'http://192.168.1.6:8843'
token = 'fc6ddb4e-c5e9-46dd-a7e3-a3260d3bbc65'

verify_crt = '/root/v1.0/registry/ssl/ca.crt'
verify_key = '/root/v1.0/registry/ssl/ca.key'

def test_ImageRepoExist(imagename='boxlinker/storage'):
    """ 镜像名得到镜像id """
    url_suffix = '/api/v1.0/imagerepo/publicimage/?imagename=' + imagename
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret
    print ret.json()
    # {u'msg': u'OK', u'status': 0, u'result': u'646afc75-885e-3f94-b1ee-555e587eeba8'}

def test_ImageRepoRankApi():
    """ 镜像排名 """
    url_suffix = '/api/v1.0/imagerepo/ranks'
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret

    print ret.json()


def test_ImageRepoPublic(page, page_size):
    """ 平台镜像 """
    url_suffix = '/api/v1.0/imagerepo/publicimages/' + str(page) + '/' + str(page_size)
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret.json()

def test_ImageRepoPublic_Search(page, page_size, repo_fuzzy='liuzhangpei'):
    """ 平台镜像搜索 """
    url_suffix = '/api/v1.0/imagerepo/publicimages/' + str(page) + '/' + str(page_size) + '/?repo_fuzzy=' + repo_fuzzy
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret.json()


def test_OwnImageRepo(page, page_size, repo_fuzzy='library%2Fnginx'):
    """ 我的镜像搜索 """
    url_suffix = '/api/v1.0/imagerepo/publicimages/' + str(page) + '/' + str(page_size) + '/?repo_fuzzy=' + repo_fuzzy
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret.json()

def test_OwnImageRepo_Search(page, page_size, repo_fuzzy='library%2Fnginx'):
    """ 我的镜像搜索 """
    url_suffix = '/api/v1.0/imagerepo/ownimages/' + str(page) + '/' + str(page_size) + '/?repo_fuzzy=' + repo_fuzzy
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret.json()

def test_ImageRepo(repoid):
    """ 镜像详情 """
    url_suffix = '/api/v1.0/imagerepo/image/' + repoid
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret.json()


def test_ImageRepoSystem(repoid):
    """ 镜像详情 """
    url_suffix = '/api/v1.0/imagerepo/image/' + repoid + '/public_info'
    url = image_repo_prefix + url_suffix
    headers = {'token': token}
    ret = requests.get(url, headers=headers, timeout=5, cert=(verify_crt, verify_key), verify=True)
    print ret.json()



if __name__ == '__main__':

    # print 'test_ImageRepoExist'
    # test_ImageRepoExist()
    # print '\n'

    # print 'test_ImageRepoRankApi'
    # test_ImageRepoRankApi()
    # print '\n'

    # print 'test_ImageRepoPublic'
    # test_ImageRepoPublic(1, 10)
    # print '\n'
    #
    # print 'test_ImageRepoPublic_Search'
    # test_ImageRepoPublic_Search(1, 10)
    # print '\n'
    #
    # print 'test_OwnImageRepo'
    # test_OwnImageRepo(1, 10)
    # print '\n'
    #
    # print 'test_OwnImageRepo'
    # test_OwnImageRepo_Search(1, 10)
    # print '\n'
    #
    # print 'test_ImageRepo'
    # test_ImageRepo('4bd1ca3f-1752-33e6-b8d0-b9348a58ced7')
    # print '\n'
    #
    print 'test_ImageRepoSystem'
    test_ImageRepoSystem('4bd1ca3f-1752-33e6-b8d0-b9348a58ced7')
    print '\n'

    # import uuid
    #
    # image = 'sdsds/sds'
    # repo_uuid = uuid.uuid3(uuid.NAMESPACE_DNS, image).__str__()
    #
    # print type(repo_uuid)
    # print repo_uuid
    #
    #
    # # test_image_repo_public(token='789a495f-2314-44c8-ae5b-be80c1a09c78', page=4, pagesize=4)
    # test_image_repo_public_fuzzy(token='789a495f-2314-44c8-ae5b-be80c1a09c78', page=4, pagesize=4)
