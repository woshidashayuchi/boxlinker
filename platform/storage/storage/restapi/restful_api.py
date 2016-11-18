# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import storage_api

from flask import Flask
from flask_restful import Api
from flask_cors import CORS


def rest_app_run():

    app = Flask(__name__)
    CORS(app=app)
    api = Api(app)

    api.add_resource(storage_api.StorageVolumesApi,
                     '/api/v1.0/storage/volumes')

    api.add_resource(storage_api.StorageVolumeApi,
                     '/api/v1.0/storage/volumes/<volume_uuid>')

    api.add_resource(storage_api.StorageVolumeStatusApi,
                     '/api/v1.0/storage/volumes/<volume_uuid>/status')

    app.run(host='0.0.0.0', port=8001, threaded=True, debug=False)
