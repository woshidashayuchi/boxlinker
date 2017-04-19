# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/14 上午10:53

from common.logs import logging as log
from conf import conf
import json
import base64
import requests
from db.alarm_db import AlarmDB
from rbt_client import PodsRpcClient
from common.code import request_result


class AlarmDriver(object):
    def __init__(self):
        self.GRAFANA = conf.GRAFANA
        self.alarm_db = AlarmDB()
        self.user = conf.user
        self.password = base64.decodestring(conf.password)
        self.recover_login = conf.recover_login
        self.k8s_pod = conf.k8s_pod
        self.pods_rbt_client = PodsRpcClient()
        self.email_api = conf.email_api

    @staticmethod
    def sql_driver(parameters):
        time_long = parameters.get("time_long")
        time_span = parameters.get("time_span")
        project_uuid = parameters.get("project_uuid")
        pod_name = parameters.get("pod_name")
        STATICSQL = "SELECT sum(\"value\") FROM \"change\" WHERE \"type\" = \'pod_container\' " \
                    "AND \"namespace_name\" =~ /%s$/ " \
                    "AND \"pod_name\" =~ /%s$/ " \
                    "AND time > now() - %s GROUP BY time(%s), \"container_name\" fill(null)&epoch=ms" % (project_uuid,
                                                                                                pod_name,
                                                                                                time_long,
                                                                                                time_span)
        STATICNET = "SELECT sum(\"value\") FROM \"change\" WHERE \"type\" = \'pod\' " \
                    "AND \"namespace_name\" =~ /%s$/ " \
                    "AND \"pod_name\" =~ /%s$/ " \
                    "AND time > now() - %s GROUP BY time(%s) fill(null)&epoch=ms" % (project_uuid,
                                                                                     pod_name,
                                                                                     time_long,
                                                                                     time_span)
        try:
            if parameters.get("type") == "cpu":
                usage_sql = STATICSQL.replace("change", "cpu/usage_rate")
                limit_sql = STATICSQL.replace("change", "cpu/limit")
                request_sql = STATICSQL.replace("change", "cpu/request")
                result = {"usage_sql": usage_sql, "limit_sql": limit_sql, "request_sql": request_sql}
                return result
            if parameters.get("type") == "memory":
                usage_sql = STATICSQL.replace("change", "memory/usage")
                limit_sql = STATICSQL.replace("change", "memory/limit")
                request_sql = STATICSQL.replace("change", "memory/request")
                set_sql = STATICSQL.replace("change", "memory/working_set")
                result = {"usage_sql": usage_sql, "limit_sql": limit_sql, "request_sql": request_sql, "set_sql": set_sql}
                return result
            if parameters.get("type") == "network":
                tx_sql = STATICNET.replace("change", "network/tx_rate")
                rx_sql = STATICNET.replace("change", "network/rx_rate")
                result = {"tx_sql": tx_sql, "rx_sql": rx_sql}
                return result
            if parameters.get("type") == "filesystem":
                usage_sql = STATICNET.replace("change", "filesystem/usage")
                limit_sql = STATICNET.replace("change", "filesystem/limit")
                result = {"usage_sql": usage_sql, "limit_sql": limit_sql}
                return result
        except Exception, e:
            log.error("sql create error, reason=%s" % e)
            raise Exception('sql create error')

    def get_pods_name(self, project_uuid, service_name):
        pods_name = []
        pod_message = {"namespace": project_uuid, 'rtype': 'pods'}

        try:
            response = self.pods_rbt_client.get_pod_messages(pod_message)
            log.info('+++++++++%s' % response)
            response = response.get('items')

        except Exception, e:
            log.error("explain the kubernetes response error,reason=%s" % e)
            raise Exception('explain the kubernetes response error')

        for i in response:
            if service_name == i.get("metadata").get("labels").get("component"):
                pod_name = i.get("metadata").get("name")
                pods_name.append(pod_name)

        return pods_name

    def email_driver(self, data):
        headers = {'content-type': "application/json"}
        body = json.JSONEncoder().encode(data)

        try:
            r = requests.post(self.email_api, headers=headers,
                              data=body, timeout=5)
            status = r.json()['status']
            log.debug('Email send request=%s, request_status=%s'
                      % (r, status))
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Email send error: reason=%s' % e)
            return request_result(601)

        return request_result(0)

    def send_email(self, memory_usage):
        html_body = ("<p>"
                     "监控报警测试发邮件是否好使，"
                     "请在30分钟内联系管理员处理内存报警：%s<br>"
                     " </p>" % memory_usage)

        data = {
                   "to": "359876749@qq.com",
                   "title": "服务告警啦",
                   "text": None,
                   "html": html_body
               }

        email_send = self.email_driver(data).get('status')
        if int(email_send) != 0:
            return request_result(601)

    def explain_monitor_data(self, dict_data, memory_value):
        memory_limit = 0
        memory_usage = 0
        sum = 0
        for i in dict_data.get('results'):
            for j in i.get('series'):
                if j.get('name') == 'memory/limit':
                    memory_limit = j.get('values')[1][1]/1000000
                if j.get('name') == 'memory/usage':
                    for n in range(1, 15):
                        all_usage = sum+j.get('values')[n][1]
                        memory_usage = all_usage/15
        if memory_usage/memory_limit <= memory_value:
            self.send_email(memory_usage)

    def alarm_driver(self, dict_data):
        log.info('dict_date is: %s' % dict_data)
        base_sql = conf.basesql

        # 获取数据库所有服务预告警规则与信息
        try:
            q_ret = self.alarm_db.get_alarm_svc()
            log.info('-------------')
            log.info(q_ret)
        except Exception, e:
            log.error('get the alarm rules from database error, reason is: %s' % e)
            raise Exception(
                'get the alarm rules from database error'
            )

        # 获取每个对应服务下的pod名称
        for i in q_ret:
            project_uuid = i[0]
            service_name = i[1]
            service_uuid = i[2]
            wise = i[3]
            cpu_unit = i[4]
            cpu_value = i[5]
            memory_unit = i[6]
            memory_value = i[7]
            network_unit = i[8]
            network_value = i[9]
            storage_unit = i[10]
            storage_value = i[11]
            time_span = i[12]
            alarm_time = i[13]
            try:
                pods_name = self.get_pods_name(project_uuid, service_name)
                log.info('from k8s api get the pod_name is %s' % str(pods_name))
            except Exception, e:
                log.error('get the pod message error, reason is: %s' % e)
                raise Exception('get the pod message error')

            for j in pods_name:

                dict_data['project_uuid'] = project_uuid
                dict_data['pod_name'] = j

                try:
                    sql_dict = self.sql_driver(dict_data)
                    log.info('sql_dict is: %s' % sql_dict)
                except Exception, e:
                    log.error('create the query sql error, reason is:%s' % e)
                    raise Exception('sql create error')

                for x in sql_dict.keys():
                    res_sql = sql_dict.get(x)
                    try:
                        ret = json.loads(requests.get(base_sql+res_sql).text)
                        log.info('the monitor data is: %s' % ret)

                        # 判断是否发生预告警
                        self.explain_monitor_data(ret, memory_value)
                    except Exception, e:
                        log.error('get the grafana message error, reason is: %s' % e)
                        raise Exception('get the grafana message error')

                    return
