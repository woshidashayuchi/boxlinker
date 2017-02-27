#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016-10-12
# Author: YanHua


"""
@apiDefine DELETE_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {}
}
"""


"""
@apiDefine POST_RESOURCES_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "resource_uuid": "string",
        "resource_name": "string",
        "resource_type": "string",
        "resource_conf": "string",
        "resource_status": "string",
        "team_uuid": "string",
        "project_uuid": "string",
        "user_uuid": "string"
    }
}
"""


"""
@apiDefine PUT_RESOURCES_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "resource_uuid": "string",
        "resource_conf": "string",
        "resource_status": "string",
        "team_uuid": "string",
        "project_uuid": "string",
        "user_uuid": "string"
    }
}
"""


"""
@apiDefine GET_RESOURCES_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "resources_list": [
            {
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_status": "string",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_status": "string",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_status": "string",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            }
        ]
    }
}
"""


"""
@apiDefine POST_VOUCHERS_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "denomination": int,
        "invalid_time": "YYYY-MM-DD HH:MM:SS"
    }
}
"""


"""
@apiDefine PUT_VOUCHERS_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "vouchers_uuid": "string",
        "team_uuid": "string",
        "project_uuid": "string",
        "user_uuid": "string"
    }
}
"""


"""
@apiDefine GET_VOUCHERS_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "vouchers_list": [
            {
                "vouchers_uuid": "string",
                "denomination": int,
                "balance": float,
                "active_time": "YYYY-MM-DD HH:MM:SS",
                "invalid_time": "YYYY-MM-DD HH:MM:SS",
                "user_uuid": "string"
            },
            {
                "vouchers_uuid": "string",
                "denomination": int,
                "balance": float,
                "active_time": "YYYY-MM-DD HH:MM:SS",
                "invalid_time": "YYYY-MM-DD HH:MM:SS",
                "user_uuid": "string"
            },
            {
                "vouchers_uuid": "string",
                "denomination": int,
                "balance": float,
                "active_time": "YYYY-MM-DD HH:MM:SS",
                "invalid_time": "YYYY-MM-DD HH:MM:SS",
                "user_uuid": "string"
            }
        ]
    }
}
"""


"""
@apiDefine GET_BILLS_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "bills_list": [
            {
                "start_time": "YY-MM-DD",
                "end_time": "YY-MM-DD",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_cost": float,
                "voucher_cost": float
            },
            {
                "start_time": "YY-MM-DD",
                "end_time": "YY-MM-DD",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_cost": float,
                "voucher_cost": float
            },
            {
                "start_time": "YY-MM-DD",
                "end_time": "YY-MM-DD",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_cost": float,
                "voucher_cost": float
            }
        ]
    }
}
"""


"""
@apiDefine PUT_BALANCES_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "team_uuid": "string",
        "amount": int
    }
}
"""


"""
@apiDefine GET_BALANCES_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "team_uuid": "string",
        "balance": float,
        "update_time": "YYYY-MM-DD HH:MM:SS"
    }
}
"""


"""
@apiDefine POST_ORDERS_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "order_uuid": "string",
        "resource_uuid": "string",
        "cost": float,
        "status": "string",
        "team_uuid": "string",
        "project_uuid": "string",
        "user_uuid": "string"
    }
}
"""


"""
@apiDefine PUT_ORDERS_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "order_uuid": "string",
        "cost": float,
        "status": "string"
    }
}
"""


"""
@apiDefine GET_ORDERS_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "orders_list": [
            {
                "order_uuid": "string",
                "resource_uuid": "string",
                "cost": float,
                "status": "string",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
                "order_uuid": "string",
                "resource_uuid": "string",
                "cost": float,
                "status": "string",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            {
            },
            {
                "order_uuid": "string",
                "resource_uuid": "string",
                "cost": float,
                "status": "string",
                "team_uuid": "string",
                "project_uuid": "string",
                "user_uuid": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            }
        ]
    }
}
"""


###################################################################
#                       计费服务接口定义                          #
###################################################################


"""
@api {post} /api/v1.0/billing/resources 1.1 资源创建
@apiName create resources record
@apiGroup 1 resources
@apiVersion 1.0.0
@apiDescription 创建需要计费的资源信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "resource_uuid": "string",
    "resource_name": "string",
    "resource_type": "string",
    "resource_conf": "string",
    "resource_status": "string"
}
@apiUse POST_RESOURCES_0
"""


"""
@api {get} /api/v1.0/billing/resources 1.2 资源列表
@apiName get resources record
@apiGroup 1 resources
@apiVersion 1.0.0
@apiDescription 获取需要计费的资源列表
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_RESOURCES_0
"""


"""
@api {put} /api/v1.0/billing/resources/<resource_uuid> 1.3 资源更新
@apiName update resources record
@apiGroup 1 resources
@apiVersion 1.0.0
@apiDescription 更新需要计费的资源信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "resource_conf": "string",
    "resource_status": "string",
    "team_uuid": "string",
    "project_uuid": "string",
    "user_uuid": "string"
}
@apiUse PUT_RESOURCES_0
"""


"""
@api {delete} /api/v1.0/billing/resources/<resource_uuid> 1.4 资源删除
@apiName delete resources record
@apiGroup 1 resources
@apiVersion 1.0.0
@apiDescription 删除需要计费的资源信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse DELETE_0
"""


"""
@api {post} /api/v1.0/billing/vouchers 2.1 礼券生成
@apiName create vouchers
@apiGroup 2 vouchers
@apiVersion 1.0.0
@apiDescription 系统管理员生成礼券
@apiPermission admin
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "denomination": int,
    "invalid_time": "epoch_milliseconds"
}
@apiUse POST_VOUCHERS_0
"""


"""
@api {put} /api/v1.0/billing/vouchers/<voucher_uuid> 2.2 礼券领用
@apiName active vouchers
@apiGroup 2 vouchers
@apiVersion 1.0.0
@apiDescription 用户激活领用到的礼券
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse PUT_VOUCHERS_0
"""


"""
@api {get} /api/v1.0/billing/vouchers?start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 2.3 礼券列表
@apiName get vouchers
@apiGroup 2 vouchers
@apiVersion 1.0.0
@apiDescription 查询用户已激活的礼劵列表
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_VOUCHERS_0
"""


"""
@api {post} /api/v1.0/billing/orders 3.1 订单创建
@apiName create orders
@apiGroup 3 orders
@apiVersion 1.0.0
@apiDescription 创建订单信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "resource_uuid": "string",
    "cost": float,
    "status": "string"
}
@apiUse POST_ORDERS_0
"""


"""
@api {put} /api/v1.0/billing/orders/<order_uuid> 3.2 订单更新
@apiName update orders
@apiGroup 3 orders
@apiVersion 1.0.0
@apiDescription 更新订单信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "cost": float,
    "status": "string"
}
@apiUse PUT_ORDERS_0
"""


"""
@api {get} /api/v1.0/billing/orders?start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 3.3 订单列表
@apiName get orders
@apiGroup 3 orders
@apiVersion 1.0.0
@apiDescription 查询订单信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_ORDERS_0
"""


"""
@api {put} /api/v1.0/billing/balances 4.1 余额更新
@apiName update balances
@apiGroup 4 balances
@apiVersion 1.0.0
@apiDescription 用户充值完成后更新余额信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "amount": int
}
@apiUse PUT_BALANCES_0
"""


"""
@api {get} /api/v1.0/billing/balances 4.2 余额信息
@apiName get balances
@apiGroup 4 balances
@apiVersion 1.0.0
@apiDescription 查询余额信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_BALANCES_0
"""


"""
@api {get} /api/v1.0/billing/bills?start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 5.1 账单查询
@apiName get bills
@apiGroup 5 bills
@apiVersion 1.0.0
@apiDescription 查询账单信息
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_BILLS_0
"""
