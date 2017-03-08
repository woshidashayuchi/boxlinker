# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os


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

api_host = '0.0.0.0'
api_port = 8001
api_debug = True

verify_code = False

log_level = 'INFO'
log_file = '/var/log/cloud.log'

init_balance = 100

ucenter_call_queue = 'ucenter_call_api'
billing_call_queue = 'billing_call_api'

boxlinker_index = 'https://boxlinker.com'
ucenter_api = 'https://ucenter.boxlinker.com'
email_api = 'https://email.boxlinker.com/send'
verify_code_api = 'https://verify-code.boxlinker.com/check_code'
