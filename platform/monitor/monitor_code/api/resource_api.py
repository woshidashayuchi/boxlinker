#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/14
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from flask import Flask
from flask import request
from flask_cors import CORS
from time import sleep
import json
from common1.logs import logging as log
from monitor_api import MonitorApi
from response_code import code

app = Flask(__name__)
CORS(app=app)


@app.route('/api/v1/model/namespaces/<namespace>/pods/metrics/<rtype>', methods=['GET'])
def monitor_resource(namespace, rtype):
    r = {}
    try:
        json_list = json.loads(request.get_data())
        r = {"namespace": namespace, "rtype": rtype}
        r.update(json_list)
        log.info("rrrrrrrr===%s" % r)
    except Exception, e:
        log.error("get parameters error, reason=%s" % e)

    try:
        response = MonitorApi.get_msg(r)
        log.info(response)
        if response == "error":
            return json.dumps(code.request_result(601))
        else:
            return json.dumps(code.request_result(0, response))
    except Exception, e:
        log.error("error, reason=%s" % e)
        return json.dumps(code.request_result(601))


@app.route('/api/v1/model/namespaces/<namespace>/metrics/<rtype>', methods=['GET'])
def namespace_resource(namespace, rtype):
    r = {"namespace": namespace, "rtype": rtype}
    return json.dumps(code.request_result(0, MonitorApi.get_namespace_msg(r)))


if __name__ == '__main__':
    while True:
        try:
            app.run(debug=True, host="0.0.0.0", port=9008, threaded=True)
            log.info("restart----------------------------------")
        except Exception, e:
            log.warning('Monitor Server running error, reason=%s' % e)
        sleep(8)