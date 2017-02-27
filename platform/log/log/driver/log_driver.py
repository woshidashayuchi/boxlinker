#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os
import requests

from conf import conf
from common.logs import logging as log
from common.code import request_result

requests.adapters.DEFAULT_RETRIES = 5


class LogDriver(object):

    def __init__(self):

        self.url = conf.kibana_log_api
        self.headers = {'kbn-version': '4.5.4'}

    def pod_log_info(self, label_value, pod_name,
                     date_time, start_time, end_time):

        body_label = '{"index":["logstash-%s"],"ignore_unavailable":true} \n \
                {"size":100,"sort":[{"@timestamp": \
                {"order":"asc","unmapped_type":"boolean"}}], \
                "query":{"filtered":{"query":{"query_string": \
                {"analyze_wildcard":false,"query":"*"}}, \
                "filter":{"bool":{"must":[{"query":{"match": \
                {"kubernetes.labels.logs":{"query":"%s","type":"phrase"}}}}, \
                {"range":{"@timestamp":{"gte":%d,"lte":%d, \
                "format":"epoch_millis"}}}],"must_not":[]}}}}, \
                "highlight":{"pre_tags":["@kibana-highlighted-field@"], \
                "post_tags":["@/kibana-highlighted-field@"], \
                "fields":{"*":{}},"require_field_match":false, \
                "fragment_size":2147483647},"aggs":{"2": \
                {"date_histogram":{"field":"@timestamp","interval":"30s", \
                "time_zone":"Asia/Shanghai","min_doc_count":0, \
                "extended_bounds":{"min":%d,"max":%d}}}},"fields": \
                ["*","_source"],"script_fields":{},"fielddata_fields": \
                ["@timestamp","time"]} \n' \
               % (str(date_time), label_value, start_time,
                  end_time, start_time, end_time)

        body_pod = '{"index":["logstash-%s"],"ignore_unavailable":true} \n \
                {"size":100,"sort":[{"@timestamp": \
                {"order":"asc","unmapped_type":"boolean"}}], \
                "query":{"filtered":{"query":{"query_string": \
                {"analyze_wildcard":false,"query":"*"}}, \
                "filter":{"bool":{"must":[ \
                {"query":{"match":{"kubernetes.pod_name": \
                {"query":"%s","type":"phrase"}}}}, \
                {"range":{"@timestamp":{"gte":%d,"lte":%d, \
                "format":"epoch_millis"}}}],"must_not":[]}}}}, \
                "highlight":{"pre_tags":["@kibana-highlighted-field@"], \
                "post_tags":["@/kibana-highlighted-field@"], \
                "fields":{"*":{}},"require_field_match":false, \
                "fragment_size":2147483647},"aggs":{"2": \
                {"date_histogram":{"field":"@timestamp","interval":"30s", \
                "time_zone":"Asia/Shanghai","min_doc_count":0, \
                "extended_bounds":{"min":%d,"max":%d}}}},"fields": \
                ["*","_source"],"script_fields":{},"fielddata_fields": \
                ["@timestamp","time"]} \n' \
               % (str(date_time), pod_name, start_time,
                  end_time, start_time, end_time)

        if pod_name is None:
            body = body_label
        else:
            body = body_pod

        log.debug('body=%s, type=%s' % (body, type(body)))

        try:
            r = requests.post(self.url, headers=self.headers,
                              data=body, timeout=5)
            # log.debug('logs_info=%s' % (r.text))
            return request_result(0, r.text)
        except Exception, e:
            log.error('requests error, reason=%s' % (e))
            return request_result(103)
