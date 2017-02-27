# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os


mq_server01 = 'rabbitmq'
mq_server02 = 'rabbitmq'
mq_port = 5672

# mq_server01 = os.environ.get('MQ_SERVER01')
# mq_server02 = os.environ.get('MQ_SERVER02')
# mq_port = os.environ.get('MQ_PORT')

api_host = '0.0.0.0'
api_port = 8001
api_debug = True

log_level = 'INFO'
log_file = '/var/log/cloud.log'

log_call_queue = 'log_call_api'

ucenter_api = 'http://ucenter:8001'
kibana_log_api = 'http://kibana:5601/elasticsearch/_msearch?timeout=0&ignore_unavailable=true&preference=1473650101921'
