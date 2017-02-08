# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/08

import uuid


def font_infix_element(dict_data):

    font_uuid = str(uuid.uuid4())
    rc_uuid = str(uuid.uuid4())
    service_uuid = str(uuid.uuid4())
    user_uuid = dict_data.get('user_uuid')
    team_uuid = dict_data.get('team_uuid')
    project_uuid = dict_data.get('project_uuid')
    service_name = dict_data.get('service_name')

    return font_uuid, rc_uuid, service_uuid, user_uuid, team_uuid, project_uuid, service_name


def rc_infix_element(dict_data):
    spec_replicas = dict_data.get('spec_replicas')
    image_id = dict_data.get('image_id')
    limits_cpu = dict_data.get('limits_cpu')
    limits_memory = dict_data.get('limits_memory')
    policy = dict_data.get('policy')
    auto_startup = dict_data.get('auto_startup')
    container_port = dict_data.get('container_port')
    protocol = dict_data.get('protocol')
    env_key = dict_data.get('env_key')
