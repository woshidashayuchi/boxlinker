#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016-09-12
# Author: YanHua


"""
@apiDefine CODE_GET_USER0
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "end_time": float,
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
@apiSuccessExample 返回
{
    "status": 0,
    "msg": "OK",
    "result": {
        "end_time": float,
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
@api {get} /api/v1.0/logs/labels/<label_value>?date_time=<epoch_milliseconds>&start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 根据label查日志
@apiName Get log from label_value
@apiGroup log
@apiVersion 1.0.0
@apiDescription Get log from label_value
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse CODE_GET_SYS0
"""


"""
@api {get} /api/v1.0/logs/pods/<pod_name>?date_time=<epoch_milliseconds>&start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds> 根据pod名查日志
@apiName Get log from pod_name
@apiGroup log
@apiVersion 1.0.0
@apiDescription Get log from pod_name
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse CODE_GET_SYS0
"""


"""
@api {get} /api/v1.0/logs/polling/labels/<label_value>?start_time=<epoch_milliseconds> 根据label轮询日志
@apiName Get log polling from label_value
@apiGroup log
@apiVersion 1.0.0
@apiDescription Get log polling from label_value
@apiPermission user and organization
@apiParam {json} header {"token": "string"}
@apiUse CODE_GET_SYS0
"""
