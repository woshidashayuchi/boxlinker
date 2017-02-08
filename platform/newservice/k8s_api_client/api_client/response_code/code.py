# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

# 程序执行状态码定义,分类说明如下：
# 0      OK 只有返回码为0才有result值。
# 1xx    API接口自身错误，如参数错误、接口已停用、找不到接口。
# 2xx    认证或权限错误
# 3xx    逻辑错误，如名称冲突，资源超过限额，余额不足等。
# 4xx    数据库错误
# 5xx    驱动层错误
# 6xx    系统级别错误

status_code = {
         0:   "OK",
        101: "Parameters error",
        201: "Authentication failure",
        202: "Operation denied",
        301: "Resource name already exists",
        401: "Database insert error",
        402: "Database delete error",
        403: "Database update error",
        404: "Database select error",
        405: "did not have this resource",
        501: "kubernetes resource create failure",
        502: "kubernetes resource update failure",
        503: "kubernetes resource delete failure",
        504: "kubernetes resource select failure",
        505: "kubernetes resource is creating...",
        511: "Ceph disk create failure",
        512: "Ceph disk delete failure",
        513: "Ceph disk resize failure"

}


def request_result(code, ret={}):

    result = {
                 "status": code,
                 "msg": status_code[code],
                 "result": ret
             }

    return result
