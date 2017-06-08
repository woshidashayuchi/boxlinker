#!/usr/bin/env python
# encoding: utf-8

"""
@version: 0.1
@author: liuzhangpei
@contact: liuzhangpei@126.com
@site: http://www.livenowhy.com
@time: 16/12/5 15:15
"""


"""
@apiGroup Icon
@apiDescription 上传头像

@apiHeader {String} token   请求接口的token,放在请求头中
@api {post} http://192.168.1.5:8765/policy   请求policy以及callback


@apiExample {POST} Example usage:
    post http://192.168.1.5:8765/policy
    {
        "actionType": "MirrorIcon",
        "actionResourceId": "39828489-1bf6-334b-acdb-6a15bbd7c5a3"
    }

@apiParam {String} actionType  上传类型如下:

    UserAvatars: 用户头像;

    MirrorIcon: 镜像头像(此时需要.actionResourceId表示镜像id)

@apiParam {String} actionResourceId  资源id

"""

def policy():
    pass