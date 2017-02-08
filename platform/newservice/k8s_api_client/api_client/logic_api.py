#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:wang-xf
import sys
import os
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from flask import Flask
from flask_cors import CORS
from time import sleep
from common.logs import logging as log
from api_source import ApiSource

app = Flask(__name__)
CORS(app=app)


@app.route('/api/v1/application/service/<service_name>', methods=['POST'])
def create_service(service_name):
    return ApiSource.create_service(service_name)


@app.route('/api/v1/application/service', methods=['GET'])
def get_all_service():
    return ApiSource.get_all_service()


@app.route('/api/v1/application/service/<service_name>/details', methods=['GET'])
def detail_service(service_name):
    return ApiSource.detail_service(service_name)


@app.route('/api/v1/application/remove/service/<service_name>', methods=['DELETE'])
def del_service(service_name):
    return ApiSource.del_service(service_name)


@app.route('/api/v1/application/service/<service_name>', methods=['PUT'])
def put_service(service_name):
    return ApiSource.put_service(service_name)


@app.route('/api/v1/application/service/<service_name>/container', methods=['PUT'])
def put_container(service_name):
    return ApiSource.put_container(service_name)


@app.route('/api/v1/application/service/<service_name>/volume', methods=['PUT'])
def put_volume(service_name):
    return ApiSource.put_volume(service_name)


@app.route('/api/v1/application/service/<service_name>/env', methods=['PUT'])
def put_env(service_name):
    return ApiSource.put_env(service_name)


@app.route('/api/v1/application/service/<service_name>/cm', methods=['PUT'])
def put_cm(service_name):
    return ApiSource.put_cm(service_name)


@app.route('/api/v1/application/service/<service_name>/status', methods=['PUT'])
def start_service(service_name):
    return ApiSource.start_service(service_name)


@app.route('/api/v1/application/service/<service_name>/telescopic', methods=['PUT'])
def telescopic(service_name):
    return ApiSource.telescopic(service_name)


@app.route('/api/v1/application/service/<service_name>/pod/message', methods=['GET'])
def pod_message(service_name):
    return ApiSource.pod_message(service_name)


@app.route('/api/v1/application/service/status', methods=['POST'])
def update_status():
    return ApiSource.update_status()


@app.route('/api/v1/application/service/<service_name>/autostartup', methods=['PUT'])
def put_auto_startup(service_name):
    return ApiSource.put_auto_startup(service_name)


@app.route('/api/v1/application/service/<service_name>/publish', methods=['PUT'])
def put_policy(service_name):
    return ApiSource.put_policy(service_name)


@app.route('/api/v1/application/service/<service_name>/command', methods=['PUT'])
def put_command(service_name):
    return ApiSource.put_command(service_name)


@app.route('/api/v1/application/service/<service_name>/uuid', methods=['GET'])
def get_uuid(service_name):
    return ApiSource.get_uuid(service_name)


@app.route('/api/v1/application/service/<service_name>/domain', methods=['PUT'])
def change_domain(service_name):
    return ApiSource.change_domain(service_name)


@app.route('/api/v1/application/service/domain/identify', methods=['PUT'])
def change_domain_identify():
    return ApiSource.domain_identify()


@app.route('/api/v1/application/service/<pod_name>/controlboard', methods=['GET'])
def controller_board(pod_name):
    try:
        return os.system("ssh -o StrictHostKeyChecking=no root@'123.56.4.95' 'kubectl exec -it %s bash'"
                         % pod_name)
    except Exception, e:
        log.error("bash error, reason=%s" % e)
        return os.system("ssh -o StrictHostKeyChecking=no root@'123.56.4.95' 'kubectl exec -it %s sh'"
                         % pod_name)


if __name__ == '__main__':
    while True:
        try:
            app.run(debug=True, host="0.0.0.0", port=9000, threaded=True)
        except Exception, e:
            log.warning('k8s API Server running error, reason=%s' % e)
        sleep(8)
