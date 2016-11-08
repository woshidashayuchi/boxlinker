# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import log_api
import log_polling

from flask import Flask
from flask_restful import Api
from flask_cors import CORS


def rest_app_run():

    app = Flask(__name__)
    CORS(app=app)
    api = Api(app)

    api.add_resource(log_api.LabelLogApi,
                     '/api/v1.0/logs/labels/<label_value>')

    api.add_resource(log_api.PodLogApi,
                     '/api/v1.0/logs/pods/<pod_name>')

    api.add_resource(log_polling.LogPollApi,
                     '/api/v1.0/logs/polling/labels/<label_value>')

    app.run(host='0.0.0.0', port=8001, threaded=True, debug=False)
