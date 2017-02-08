# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

service_name = 'Ucenter'

log_level = 'INFO'
log_file = '/var/log/cloud.log'

mq_server01 = 'boxlinker.com'
mq_server02 = 'boxlinker.com'
mq_port = 30001

db_server01 = 'boxlinker.com'
db_server02 = 'boxlinker.com'
db_port = 30000
db_user = 'cloudsvc'
db_passwd = 'cloudsvc'
database = 'servicedata'

ucenter_api = 'https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens'

rest_host = '0.0.0.0'
rest_port = 8001
rest_debug = True

call_queue = 'kubernetescall_api'
rpc_timeout = 60

