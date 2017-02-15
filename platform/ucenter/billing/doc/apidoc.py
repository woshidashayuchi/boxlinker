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
        "resource_orga": "string",
        "resource_user": "string"
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
                "resource_orga": "string",
                "resource_user": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_status": "string",
                "resource_orga": "string",
                "resource_user": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_status": "string",
                "resource_orga": "string",
                "resource_user": "string",
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
        "vouchers_uuid": "string",
        "createuser_uuid": "string",
        "owner_uuid": "string",
        "denomination": int,
        "balance": float,
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
        "createuser_uuid": "string",
        "owner_uuid": "string",
        "denomination": int,
        "balance": float,
        "invalid_time": "YYYY-MM-DD HH:MM:SS",
        "create_time": "YYYY-MM-DD HH:MM:SS"
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
                "createuser_uuid": "string",
                "owner_uuid": "string",
                "denomination": int,
                "balance": float,
                "active_time": "YYYY-MM-DD HH:MM:SS",
                "invalid_time": "YYYY-MM-DD HH:MM:SS",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "vouchers_uuid": "string",
                "createuser_uuid": "string",
                "owner_uuid": "string",
                "denomination": int,
                "balance": float,
                "active_time": "YYYY-MM-DD HH:MM:SS",
                "invalid_time": "YYYY-MM-DD HH:MM:SS",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "vouchers_uuid": "string",
                "createuser_uuid": "string",
                "owner_uuid": "string",
                "denomination": int,
                "balance": float,
                "active_time": "YYYY-MM-DD HH:MM:SS",
                "invalid_time": "YYYY-MM-DD HH:MM:SS",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
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
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_cost": float,
                "vouchers_used": float
            },
            {
                "start_time": "YY-MM-DD",
                "end_time": "YY-MM-DD",
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_cost": float,
                "vouchers_used": float
            },
            {
                "start_time": "YY-MM-DD",
                "end_time": "YY-MM-DD",
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "resource_cost": float,
                "vouchers_used": float
            }
        ]
    }
}
"""


"""
@apiDefine POST_BALANCES_0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "user_uuid": "string",
        "balance": float
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
        "user_uuid": "string",
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
        "user_uuid": "string",
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
        "user_uuid": "string",
        "resource_uuid": "string",
        "cost": float,
        "status": "string"
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
        "user_uuid": "string",
        "resource_uuid": "string",
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
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "cost": float,
                "status": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "cost": float,
                "status": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "user_uuid": "string",
                "resource_uuid": "string",
                "resource_name": "string",
                "resource_type": "string",
                "resource_conf": "string",
                "cost": float,
                "status": "string",
                "create_time": "YYYY-MM-DD HH:MM:SS",
                "update_time": "YYYY-MM-DD HH:MM:SS"
            }
        ]
    }
}
"""



"""
@api {post} /api/v1.0/billing/resources 资源创建
@apiName create resources record
@apiGroup resources
@apiVersion 1.0.0
@apiDescription create resources record
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "resource_uuid": "string",
    "resource_name": "string",
    "resource_type": "string",
    "resource_conf": "string",
    "resource_status": "string",
    "resource_orga": "string",
    "resource_user": "string"
}
@apiUse POST_RESOURCES_0
"""


"""
@api {delete} /api/v1.0/billing/resources/<resource_uuid> 资源删除
@apiName delete resources record
@apiGroup resources
@apiVersion 1.0.0
@apiDescription delete resources record
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse DELETE_0
"""


"""
@api {put} /api/v1.0/billing/resources/<resource_uuid> 资源修改
@apiName update resources record
@apiGroup resources
@apiVersion 1.0.0
@apiDescription update resources record
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
@apiParamExample body
{
    "resource_conf": "string",
    "resource_status": "string",
    "resource_orga": "string",
    "resource_user": "string"
}
@apiUse POST_RESOURCES_0
"""


"""
@api {get} /api/v1.0/billing/resources 资源查询
@apiName get resources record
@apiGroup resources
@apiVersion 1.0.0
@apiDescription get resources record
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_RESOURCES_0
"""


"""
@api {post} /api/v1.0/billing/vouchers 礼券生成
@apiName create vouchers
@apiGroup vouchers
@apiVersion 1.0.0
@apiDescription create vouchers
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
@api {put} /api/v1.0/billing/vouchers/<voucher_uuid> 礼券领用
@apiName active vouchers
@apiGroup vouchers
@apiVersion 1.0.0
@apiDescription active vouchers
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse PUT_VOUCHERS_0
"""


"""
@api {get} /api/v1.0/billing/vouchers?start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 礼券查询
@apiName get vouchers
@apiGroup vouchers
@apiVersion 1.0.0
@apiDescription get vouchers
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_VOUCHERS_0
"""


"""
@api {get} /api/v1.0/billing/bills?start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 账单查询
@apiName get bills
@apiGroup bills
@apiVersion 1.0.0
@apiDescription get bills
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_BILLS_0
"""


"""
@api {post} /api/v1.0/billing/balances 余额初始化
@apiName initialization balances
@apiGroup balances
@apiVersion 1.0.0
@apiDescription initialization balances
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse POST_BALANCES_0
"""


"""
@api {put} /api/v1.0/billing/balances 余额更新
@apiName update balances
@apiGroup balances
@apiVersion 1.0.0
@apiDescription update balances
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
@api {get} /api/v1.0/billing/balances 余额查询
@apiName get balances
@apiGroup balances
@apiVersion 1.0.0
@apiDescription get balances
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_BALANCES_0
"""


"""
@api {post} /api/v1.0/billing/orders 订单创建
@apiName create orders
@apiGroup orders
@apiVersion 1.0.0
@apiDescription create orders
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
@api {put} /api/v1.0/billing/orders/<order_uuid> 订单修改
@apiName update orders
@apiGroup orders
@apiVersion 1.0.0
@apiDescription update orders
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
@api {get} /api/v1.0/billing/orders?start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 订单查询
@apiName get orders
@apiGroup orders
@apiVersion 1.0.0
@apiDescription get orders
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse GET_ORDERS_0
"""
