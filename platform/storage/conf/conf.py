# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os


mq_server01 = 'rabbitmq'
mq_server02 = 'rabbitmq'
mq_port = 5672

# mq_server01 = os.environ.get('MQ_SERVER01')
# mq_server02 = os.environ.get('MQ_SERVER02')
# mq_port = os.environ.get('MQ_PORT')


db_server01 = 'database'
db_server02 = 'database'
db_port = 3306
db_user = 'cloud'
db_passwd = 'cloud'
database = 'storage'

# db_server01 = os.environ.get('DB_SERVER01')
# db_server02 = os.environ.get('DB_SERVER02')
# db_port = os.environ.get('DB_PORT')
# db_user = os.environ.get('DB_USER')
# db_passwd = os.environ.get('DB_PASSWD')
# database = os.environ.get('DATABASE')

api_host = '0.0.0.0'
api_port = 8001
api_debug = True

log_level = 'INFO'
log_file = '/var/log/cloud.log'

ceph_pool_name = 'pool_hdd'

storage_call_queue = 'storage_call_api'
ceph_call_queue = 'ceph_call'
ceph_exchange_name = 'ceph_bcast'

ucenter_api = 'http://ucenter:8001'
billing_api = 'http://billing:8002'