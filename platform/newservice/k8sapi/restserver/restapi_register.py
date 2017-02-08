# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/06

import sys
p_path = sys.path[0] + '/../..'
p_path1 = sys.path[0] + '/..'
sys.path.append(p_path)
sys.path.append(p_path1)

from flask import Flask
from flask_cors import CORS
from time import sleep
from common.logs import logging as log
from restapi_define import KubernetesClientApi
from db.db_init import DBInit

app = Flask(__name__)
CORS(app=app)


@app.route('/api/v1.0/application/service/<service_name>', methods=['POST'])
def create_service(service_name):
    return KubernetesClientApi.create_service(service_name)


@app.route('/api/v1.0/application/service', methods=['GET'])
def get_all_service():
    return KubernetesClientApi.get_all_service()


@app.route('/api/v1.0/application/service/<service_name>/details', methods=['GET'])
def detail_service(service_name):
    return KubernetesClientApi.detail_service(service_name)


@app.route('/api/v1.0/application/remove/service/<service_name>', methods=['DELETE'])
def del_service(service_name):
    return KubernetesClientApi.del_service(service_name)


@app.route('/api/v1.0/application/service/<service_name>', methods=['PUT'])
def put_service(service_name):
    return KubernetesClientApi.put_service(service_name)


@app.route('/api/v1.0/application/service/<service_name>/container', methods=['PUT'])
def put_container(service_name):
    return KubernetesClientApi.put_container(service_name)


@app.route('/api/v1.0/application/service/<service_name>/volume', methods=['PUT'])
def put_volume(service_name):
    return KubernetesClientApi.put_volume(service_name)


@app.route('/api/v1.0/application/service/<service_name>/env', methods=['PUT'])
def put_env(service_name):
    return KubernetesClientApi.put_env(service_name)


@app.route('/api/v1.0/application/service/<service_name>/cm', methods=['PUT'])
def put_cm(service_name):
    return KubernetesClientApi.put_cm(service_name)


@app.route('/api/v1.0/application/service/<service_name>/status', methods=['PUT'])
def start_service(service_name):
    return KubernetesClientApi.start_service(service_name)


@app.route('/api/v1.0/application/service/<service_name>/telescopic', methods=['PUT'])
def telescopic(service_name):
    return KubernetesClientApi.telescopic(service_name)


@app.route('/api/v1.0/application/service/<service_name>/pod/message', methods=['GET'])
def pod_message(service_name):
    return KubernetesClientApi.pod_message(service_name)


@app.route('/api/v1.0/application/service/status', methods=['POST'])
def update_status():
    return KubernetesClientApi.update_status()


@app.route('/api/v1.0/application/service/<service_name>/autostartup', methods=['PUT'])
def put_auto_startup(service_name):
    return KubernetesClientApi.put_auto_startup(service_name)


@app.route('/api/v1.0/application/service/<service_name>/publish', methods=['PUT'])
def put_policy(service_name):
    return KubernetesClientApi.put_policy(service_name)


@app.route('/api/v1.0/application/service/<service_name>/command', methods=['PUT'])
def put_command(service_name):
    return KubernetesClientApi.put_command(service_name)


@app.route('/api/v1.0/application/service/<service_name>/uuid', methods=['GET'])
def get_uuid(service_name):
    return KubernetesClientApi.get_uuid(service_name)


@app.route('/api/v1.0/application/service/<service_name>/domain', methods=['PUT'])
def change_domain(service_name):
    return KubernetesClientApi.change_domain(service_name)


@app.route('/api/v1.0/application/service/domain/identify', methods=['PUT'])
def change_domain_identify():
    return KubernetesClientApi.domain_identify()


def rest_app_run():
    while True:
        try:
            app.run(debug=True, host="0.0.0.0", port=9000, threaded=True)
        except Exception, e:
            log.warning('k8s API Server running error, reason=%s' % e)

        sleep(8)
