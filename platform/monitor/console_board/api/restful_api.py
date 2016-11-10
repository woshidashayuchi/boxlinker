#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/4
# Author:wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from flask import Flask
from flask import request
from common.logs import logging as log
from broad_api import for_rest
from time import sleep
import json
from console_model import code
from token_about.token_for_api import TokenForApi
from flask_cors import CORS

app = Flask(__name__)
CORS(app=app)


@app.route("/api/v1/broad")
def get_msg():
    try:
        token_get1 = request.headers.get("token")
        user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get1)
        log.info("useruseruser==%s"%user_name)
    except Exception, e:
        return code.request_result(202)
    json_data = {"user_name": user_name, "token": token_get1}
    # json_data = {"user_name": aaa}
    log.info("json_data===%s" % json_data)
    response = for_rest(json_data)

    return json.dumps(response)


if __name__ == "__main__":
    while True:
        try:
            app.run(debug=True, host="0.0.0.0", port=9999, threaded=True)
            log.info("restart----------------------------------")
        except Exception, e:
            log.warning('Monitor Server running error, reason=%s' % e)
        sleep(8)
