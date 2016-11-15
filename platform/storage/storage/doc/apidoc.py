#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016-08-31
# Author: YanHua


"""
@apiDefine CODE_POST_0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {
        "resource_type": "string",
        "disk_name": "string",
        "pool_name": "string",
        "image_name": "string",
        "disk_size": "string",
        "disk_status": "string",
        "fs_type": "string"
    }
}
"""


"""
@apiDefine CODE_DELETE_0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {}
}
"""


"""
@apiDefine CODE_PUT_0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {
        "resource_type": "string",
        "disk_name": "string",
        "pool_name": "string",
        "image_name": "string",
        "disk_size": "string"
    }
}
"""


"""
@apiDefine CODE_PUT_STATUS0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {
        "resource_type": "string",
        "disk_name": "string",
        "pool_name": "string",
        "image_name": "string",
        "disk_status": "string"
    }
}
"""


"""
@apiDefine CODE_GET_0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {
        "resource_type": "string",
        "disk_name": "string",
        "pool_name": "string",
        "image_name": "string",
        "disk_size": "string",
        "disk_status": "string",
        "fs_type": "string",
        "create_time": datetime,
        "update_time": datetime
    }
}
"""


"""
@apiDefine CODE_GET_LIST_0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {
        "volume_list": [
            {
                "resource_type": "string",
                "disk_name": "string",
                "pool_name": "string",
                "image_name": "string",
                "disk_size": "string",
                "disk_status": "string",
                "fs_type": "string",
                "create_time": datetime,
                "update_time": datetime
            },
            {
                "resource_type": "string",
                "disk_name": "string",
                "pool_name": "string",
                "image_name": "string",
                "disk_size": "string",
                "disk_status": "string",
                "fs_type": "string",
                "create_time": datetime,
                "update_time": datetime
            },
            {
                "resource_type": "string",
                "disk_name": "string",
                "pool_name": "string",
                "image_name": "string",
                "disk_size": "string",
                "disk_status": "string",
                "fs_type": "string",
                "create_time": datetime,
                "update_time": datetime
            }
        ]
    }
}
"""


"""
@api {post} /api/v1.0/storage/volumes
@apiName create volume
@apiGroup storage
@apiVersion 1.0.0
@apiDescription create storage volume
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body 
{
    "disk_name": "string",
    "disk_size": "string",
    "fs_type": "xfs/ext4"
}
@apiUse CODE_POST_0
"""


"""
@api {delete} /api/v1.0/storage/volumes/<disk_name>
@apiName delete volume
@apiGroup storage
@apiVersion 1.0.0
@apiDescription delete storage volume
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse CODE_DELETE_0
"""


"""
@api {put} /api/v1.0/storage/volumes/<disk_name>
@apiName update volume
@apiGroup storage
@apiVersion 1.0.0
@apiDescription resize storage volume size
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body 
{
    "disk_size": "string"
}
@apiUse CODE_PUT_0
"""


"""
@api {put} /api/v1.0/storage/volumes/<disk_name>/size
@apiName update volume
@apiGroup storage
@apiVersion 1.0.1
@apiDescription resize storage volume size
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body 
{
    "disk_size": "string"
}
@apiUse CODE_PUT_0
"""


"""
@api {put} /api/v1.0/storage/volumes/<disk_name>/status
@apiName update volume
@apiGroup storage
@apiVersion 1.0.0
@apiDescription update storage volume status
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body 
{
    "disk_status": "using/unused"
}
@apiUse CODE_PUT_STATUS0
"""


"""
@api {get} /api/v1.0/storage/volumes/<disk_name>
@apiName list single volume
@apiGroup storage
@apiVersion 1.0.0
@apiDescription list single volume
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse CODE_GET_0
"""


"""
@api {get} /api/v1.0/storage/volumes
@apiName list volumes
@apiGroup storage
@apiVersion 1.0.0
@apiDescription list storage volumes
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse CODE_GET_LIST_0
"""
