# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/06
from flask import Flask
from flask_cors import CORS
from time import sleep
from common.logs import logging as log
from restapi_define import KubernetesClientApi


app = Flask(__name__)
CORS(app=app)


@app.route('/api/v1.0/application/services', methods=['POST'])
def create_service():
    return KubernetesClientApi.create_service()


@app.route('/api/v1.0/application/services', methods=['GET'])
def get_all_service():
    return KubernetesClientApi.get_all_service()


@app.route('/api/v1.0/application/services/<service_uuid>', methods=['GET'])
def detail_service(service_uuid):
    return KubernetesClientApi.detail_service(service_uuid)


@app.route('/api/v1.0/application/services/<service_uuid>', methods=['DELETE'])
def del_service(service_uuid):
    return KubernetesClientApi.del_service(service_uuid)


@app.route('/api/v1.0/application/services/<service_uuid>', methods=['PUT'])
def put_service(service_uuid):
    return KubernetesClientApi.put_service(service_uuid)


def rest_app_run():

    while True:
        try:
            app.run(debug=True, host="0.0.0.0", port=9000, threaded=True)
        except Exception, e:
            log.warning('k8s API Server running error, reason=%s' % e)

        sleep(8)
