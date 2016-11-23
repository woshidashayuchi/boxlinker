#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016-09-12
# Author: YanHua


"""
@apiDefine CODE_GET_USER0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {
        "end_time": int,
        "logs_list": [
            {
                "log_info": "string",
                "pod_name": "string"
            }, 
            {
                "log_info": "string",
                "pod_name": "string"
            }, 
            {
                "log_info": "string",
                "pod_name": "string"
            }
        ]
    }
}
"""

"""
@apiDefine CODE_GET_SYS0
@apiSuccess (Response) {json} Response
{
    "status": 0,
    "msg": "OK",
    "result": {
        "end_time": int,
        "logs_list": [
            {
                "file": "string",
                "level": "string",
                "log_info": "string",
                "pod_name": "string",
                "log_time": "string",
                "time": "datetime"
            }, 
            {
                "file": "string",
                "level": "string",
                "log_info": "string",
                "pod_name": "string",
                "log_time": "string",
                "time": "datetime"
            }, 
            {
                "file": "string",
                "level": "string",
                "log_info": "string",
                "pod_name": "string",
                "log_time": "string",
                "time": "datetime"
            }
        ]
    }
}
"""


"""
@api {post} /api/v1.0/logs/labels/<label_value>
@apiName Get log from label_value
@apiGroup log
@apiVersion 1.0.0
@apiDescription Get log from label_value
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body 
{
    "date_time": "datetime",
    "start_time": "epoch_milliseconds",
    "end_time": "epoch_milliseconds"
}
@apiUse CODE_GET_SYS0
"""


"""
@api {post} /api/v1.0/logs/pods/<pod_name>
@apiName Get log from pod_name
@apiGroup log
@apiVersion 1.0.0
@apiDescription Get log from pod_name
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body 
{
    "date_time": "datetime",
    "start_time": "epoch_milliseconds",
    "end_time": "epoch_milliseconds"
}
@apiUse CODE_GET_SYS0
"""


"""
@api {post} /api/v1.0/logs/polling/labels/<label_value>
@apiName Get log polling from label_value
@apiGroup log
@apiVersion 1.0.0
@apiDescription Get log polling from label_value
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiParam {json} body
{
    "start_time": "epoch_milliseconds"
}
@apiUse CODE_GET_SYS0
"""
