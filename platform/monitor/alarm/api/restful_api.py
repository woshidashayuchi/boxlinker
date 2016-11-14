#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/14
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from flask import Flask
from flask import request
from common.logs import logging as log
from resource_model.struct_g import MonitorAct
from time import sleep
import json

app = Flask(__name__)


@app.route("/api/v1/alarm/<rtype>")
def get_msg(rtype):
    time_long = request.values.get("time_long")
    log.info("time_long=========%s" % time_long)
    json_data = {"rtype": rtype, "time_long": time_long, "app": "rest"}
    mon = MonitorAct()
    rest = mon.count_msg(json_data)
    return json.dumps(rest)


if __name__ == "__main__":
    while True:
        try:
            app.run(debug=True, host="0.0.0.0", port=9998, threaded=True)
            log.info("restart----------------------------------")
        except Exception, e:
            log.warning('Monitor Server running error, reason=%s' % e)
        sleep(8)
