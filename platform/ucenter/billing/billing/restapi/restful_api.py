# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import billing_api

from flask import Flask
from flask_restful import Api
from flask_cors import CORS


def rest_app_run():

    app = Flask(__name__)
    CORS(app=app)
    api = Api(app)

    api.add_resource(billing_api.ResourcesApi,
                     '/api/v1.0/billing/resources')

    api.add_resource(billing_api.ResourceApi,
                     '/api/v1.0/billing/resources/<resource_uuid>')

    api.add_resource(billing_api.VouchersApi,
                     '/api/v1.0/billing/vouchers')

    api.add_resource(billing_api.VoucherApi,
                     '/api/v1.0/billing/vouchers/<voucher_uuid>')

    api.add_resource(billing_api.BillsAPI,
                     '/api/v1.0/billing/bills')

    api.add_resource(billing_api.BalancesApi,
                     '/api/v1.0/billing/balances')

    api.add_resource(billing_api.OrdersApi,
                     '/api/v1.0/billing/orders')

    api.add_resource(billing_api.OrderApi,
                     '/api/v1.0/billing/orders/<order_uuid>')

    app.run(host='0.0.0.0', port=8001, threaded=True, debug=True)
