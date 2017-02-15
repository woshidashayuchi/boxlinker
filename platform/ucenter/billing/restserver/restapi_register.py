# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import restapi_define

from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from conf import conf


def rest_app_run():

    app = Flask(__name__)
    CORS(app=app)
    api = Api(app)

    api.add_resource(restapi_define.ResourcesApi,
                     '/api/v1.0/billing/resources')

    api.add_resource(restapi_define.ResourceApi,
                     '/api/v1.0/billing/resources/<resource_uuid>')

    api.add_resource(restapi_define.VouchersApi,
                     '/api/v1.0/billing/vouchers')

    api.add_resource(restapi_define.VoucherApi,
                     '/api/v1.0/billing/vouchers/<voucher_uuid>')

    api.add_resource(restapi_define.BillsAPI,
                     '/api/v1.0/billing/bills')

    api.add_resource(restapi_define.BalancesApi,
                     '/api/v1.0/billing/balances')

    api.add_resource(restapi_define.OrdersApi,
                     '/api/v1.0/billing/orders')

    api.add_resource(restapi_define.OrderApi,
                     '/api/v1.0/billing/orders/<order_uuid>')

    app.run(host=conf.rest_host, port=conf.rest_port,
            threaded=True, debug=conf.rest_debug)
