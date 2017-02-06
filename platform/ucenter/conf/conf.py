# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

service_name = 'Ucenter'

log_level = 'INFO'
log_file = '/var/log/cloud.log'

mq_server01 = '127.0.0.1'
mq_server02 = '127.0.0.1'
mq_port = 5672

db_server01 = '127.0.0.1'
db_server02 = '127.0.0.1'
db_port = 3306
db_user = 'cloud'
db_passwd = 'cloud'
database = 'ucenter'

ucenter_api = 'ucenter.boxlinker.com'

rest_host = '0.0.0.0'
rest_port = 8001
rest_debug = True

call_queue = 'ucentercall_api'
rpc_timeout = 60
