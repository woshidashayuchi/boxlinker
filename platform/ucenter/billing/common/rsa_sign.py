#!/usr/bin/env python
#coding:utf-8

# 使用该函数需要安装如下包
# pip install pycrypto

# 先生成rsa的公私钥：
# 打开控制台，输入 openssl 
# 再输入 genrsa -out private.pem 2048 来生成私钥
# 接着输入 rsa -in private.pem -pubout -out public.pem 来生成公钥

import base64
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA

from conf import conf


priKey = conf.private_key
pubKey = conf.public_key

# * RSA签名
# * data待签名数据
# * 签名用商户私钥，必须是没有经过pkcs8转换的私钥
# * 最后的签名，需要用base64编码
# * return Sign签名

def sign(data):

    key = RSA.importKey(priKey)
    h = SHA.new(data)
    signer = PKCS1_v1_5.new(key)
    signature = signer.sign(h)

    return base64.b64encode(signature)

# *RSA验签
# data待签名数据
# signature需要验签的签名
# 验签用支付宝公钥
# return 验签是否通过 bool值


def verify(data, signature):

    key = RSA.importKey(pubKey)
    h = SHA.new(data)
    verifier = PKCS1_v1_5.new(key)
    if verifier.verify(h, base64.b64decode(signature)):
        return True
    else:
        return False

if __name__ == "__main__":

    data = sys.argv[1]

    try:
        result = sign(data)
        print('sign success, result=%s' % (result))
    except Exception, e:
        print('sign error, reason=%s' % (e))
