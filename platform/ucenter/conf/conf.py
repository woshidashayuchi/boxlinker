# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os

service_name = 'Ucenter'
# service_name = os.environ.get('SERVICE_NAME')

log_level = 'INFO'
log_file = '/var/log/cloud.log'

# log_level = os.environ.get('LOG_LEVEL')
# log_file = os.environ.get('LOG_FILE')


mq_server01 = '127.0.0.1'
mq_server02 = '127.0.0.1'
mq_port = 5672

# mq_server01 = os.environ.get('MQ_SERVER01')
# mq_server02 = os.environ.get('MQ_SERVER02')
# mq_port = os.environ.get('MQ_PORT')


db_server01 = '127.0.0.1'
db_server02 = '127.0.0.1'
db_port = 3306
db_user = 'cloud'
db_passwd = 'cloud'
database = 'ucenter'

# db_server01 = os.environ.get('DB_SERVER01')
# db_server02 = os.environ.get('DB_SERVER02')
# db_port = os.environ.get('DB_PORT')
# db_user = os.environ.get('DB_USER')
# db_passwd = os.environ.get('DB_PASSWD')
# database = os.environ.get('DATABASE')


ucenter_api = 'ucenter.boxlinker.com'
# ucenter_api = os.environ.get('UCENTER_API')


rest_host = '0.0.0.0'
rest_port = 8001
rest_debug = True

# rest_host = os.environ.get('REST_HOST')
# rest_port = os.environ.get('REST_PORT')
# rest_debug = os.environ.get('REST_DEBUG')


call_queue = 'ucentercall_api'
rpc_timeout = 60

# call_queue = os.environ.get('CALL_QUEUE')
# rpc_timeout = os.environ.get('RPC_TIMEOUT')
