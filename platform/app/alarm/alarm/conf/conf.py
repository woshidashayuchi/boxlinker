# -*- coding: utf-8 -*-
# Author: wangxf


service_name = 'Ucenter'


log_level = 'INFO'
log_file = '/var/log/cloud.log'

user = 'service'
password = 'c2VydmljZUAyMDE3\n'
recover_login = 'https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens'
k8s_pod = 'https://api.boxlinker.com/api/v1.0/application/services/'


mq_server01 = 'boxlinker.com'
mq_server02 = 'boxlinker.com'
mq_port = 30001

db_server01 = 'boxlinker.com'
db_server02 = 'boxlinker.com'
db_port = 30000

# mq_server01 = 'rabbitmq'
# mq_server02 = 'rabbitmq'
# mq_port = 5672
#
# db_server01 = 'database01'
# db_server02 = 'database01'
# db_port = 3306

db_user = 'cloudalarm'
db_passwd = 'cloudalarm'
database = 'monitor_alarm'

alarm_queue = 'alarming'
ucenter_api = 'https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens'
email_api = 'https://email.boxlinker.com/send'

GRAFANA = 'grafana-api:3000'
basesql = 'http://grafana-api:3000/api/datasources/proxy/1/query?db=k8s&q='
# basesql = 'http://grafana.boxlinker.com/api/datasources/proxy/1/query?db=k8s&q='
