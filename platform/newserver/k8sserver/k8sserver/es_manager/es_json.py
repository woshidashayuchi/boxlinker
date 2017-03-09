#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:wang-xf

from es_logs import get_index
import json
from now_time import get_now_time_ymd, get_now_time_ss_z
import os


def create_esjson(json_list, log_info):
    host = "http://elasticsearch:9200"
    rtype = 'fluentd'
    log_dict = get_index(json_list, log_info)
    es_url = host + '/' + 'logstash-' + get_now_time_ymd(part='.') + '/' + rtype
    msg_json = {
        "log": json.dumps(log_dict),
        "kubernetes":
            {
                "namespace_name": "%s" % json_list.get("project_uuid"),
                "pod_id": "%s" % json_list.get("service_name").lower().replace('_', '-'),
                "pod_name": "%s" % json_list.get("service_name").lower().replace('_', '-'),
                "container_name": "%s" % json_list.get("service_name").lower().replace('_', '-'),
                "labels":
                    {
                        "logs": "%s" % json_list.get("service_name").lower().replace('_', '-')
                    },
            },
        "@timestamp": str(get_now_time_ss_z())
    }

    return msg_json, es_url
