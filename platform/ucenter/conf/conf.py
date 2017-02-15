# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os

boxlinker_index = 'https://boxlinker.com'
# boxlinker_index = os.environ.get('BOXLINKER_INDEX')

log_level = 'INFO'
log_file = '/var/log/cloud.log'
# log_level = os.environ.get('LOG_LEVEL')
# log_file = os.environ.get('LOG_FILE')


verify_code = False
verify_code_api = 'https://verify-code.boxlinker.com/check_code'
# verify_code = os.environ.get('VERIFY_CODE')


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


ucenter_api = 'https://ucenter.boxlinker.com'
# ucenter_api = os.environ.get('UCENTER_API')


rest_host = '0.0.0.0'
rest_port = 8001
rest_debug = True

# rest_host = os.environ.get('REST_HOST')
# rest_port = os.environ.get('REST_PORT')
# rest_debug = os.environ.get('REST_DEBUG')


ucenter_call_queue = 'ucenter_call_api'
billing_call_queue = 'billing_call_api'
# ucenter_call_queue = os.environ.get('UCENTER_CALL_QUEUE')


email_api = 'https://email.boxlinker.com/send'
# email_api = os.environ.get('EMAIL_API')
