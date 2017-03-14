#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json
import time
import requests
import datetime

from conf import conf
from common import rsa_sign
from common.logs import logging as log
from common.code import request_result


requests.adapters.DEFAULT_RETRIES = 5


class BillingDriver(object):

    def __init__(self):

        self.ali_pay_api = conf.ali_pay_api
        self.ali_pay_app_id = conf.ali_pay_app_id
        self.weixin_pay_api = conf.weixin_pay_api
        self.sign = rsa_sign.sign
        self.verify = rsa_sign.verify

    def ali_precreate(self, recharge_uuid, amount):
        # 用于调用支付宝预下单接口，返回付款二维码
        # 请求方法POST

        log.info('exec zhi fu bao precreate')

        return 'http://erweima_url'

        method = 'alipay.trade.precreate'
        charset = 'utf-8'
        sign_type = 'RSA2'
        # timestamp = time.strftime("%Y-%m-%d %H:%M:%S",
        #                          time.gmtime(time.time()))

        timestamp = '2017-03-13 19:31:41'
        # timestamp = str(datetime.datetime.now())[:-7]
        log.info('timestamp=%s' % (timestamp))

        recharge_uuid = "20150320010101001"

        biz_content = {
            "out_trade_no": recharge_uuid,
            "total_amount": amount,
            "subject": "boxlinker recharge",
            "timeout_express": "5m"
        }

        biz_content_str = '{"%s":"%s","%s":"%s","%s":"%s","%s":"%s"}' \
                          % ('out_trade_no', recharge_uuid,
                             'subject', 'boxlinker recharge',
                             'timeout_express', '5m',
                             'total_amount', amount)

        log.info('biz_content_str=%s' % (biz_content_str))

        app_id_str = 'app_id=%s' % (self.ali_pay_app_id)
        biz_content_str = 'biz_content=%s' % (biz_content_str)
        charset_str = 'charset=%s' % (charset)
        method_str = 'method=%s' % (method)
        sign_type_str = 'sign_type=%s' % (sign_type)
        timestamp_str = 'timestamp=%s' % (timestamp)
        version_str = 'version=1.0'

        need_sign_data = '%s&%s&%s&%s&%s&%s&%s' \
                         % (app_id_str, biz_content_str, charset_str,
                            method_str, sign_type_str, timestamp_str,
                            version_str)

        log.info('need_sign_data=%s' % (need_sign_data))

        #sign_data = self.sign(need_sign_data)
        sign_data = 'cyGVY/Mp23bFFDzlW7jT42rbJPrIPjYREu0YI20qN/NyxDFj1DF/Lq69v6HftSHZUo1+VeVxCWpE2LJqOyAJV7QNvAUfIwo/H6GN2DXIn5fyDpzTv/8ECSp+/yJXCaX3l1VWraZMhXskO9wQ5NnNnG4NHp8xr9s/094VfZ4qdiIiqkTi1JP2CvRRp4OorPRdsXmn+kdqK0W06MJSuWgVzprr5I4keaCKvfpszPVVLAaqAQZ5FfLurFrRQ8El/1PfcmsR0UV6++3eQELg2acUfyOtmGGpevKyxcEAy7KcKk1KZ4wHyWA8rRJ72OmS2lvX951M3fm7OqtWr9qJipn/fA=='

        log.info('data_sign=%s' % (sign_data))

        ali_precreate_url = ('%s?timestamp=%s&method=%s&app_id=%s'
                             '&charset=%s&sign_type=%s&sign=%s'
                             '&version=1.0&biz_content=%s'
                             % (self.ali_pay_api, timestamp, method,
                                self.ali_pay_app_id, charset, sign_type,
                                sign_data, biz_content))

        log.info('ali_precreate_url=%s' % (ali_precreate_url))

        try:
            result = requests.post(ali_precreate_url,
                                   timeout=5).json()
            return result
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('ali pay precreate create error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def ali_pay_check(self, recharge_uuid):
        # 用于调用支付宝支付结果查询接口
        log.info('exec zhi fu bao pay check')

        return False

    def ali_pay_cancel(self, recharge_uuid):
        # 用于调用支付宝取消预下单的支付操作
        log.info('exec zhi fu bao pay cancel')

        return

    def ali_pay_refund(self):
        # 增加充值失败退款接口
        pass



    def disk_create(self, token, pool_name, disk_name, disk_size):

        context = {"token": token}

        disk_size = int(disk_size) * 1024
        parameters = {
                         "pool_name": pool_name,
                         "disk_name": disk_name,
                         "disk_size": disk_size
                     }

        return self.ceph_api.rbd_create(context, parameters)

    def disk_delete(self, token, pool_name, disk_name):

        context = {"token": token}

        parameters = {
                         "pool_name": pool_name,
                         "disk_name": disk_name
                     }

        return self.ceph_api.rbd_delete(context, parameters)

    def disk_resize(self, token, pool_name, disk_name, disk_size):

        context = {"token": token}

        disk_size = int(disk_size) * 1024
        parameters = {
                         "pool_name": pool_name,
                         "disk_name": disk_name,
                         "disk_size": disk_size
                     }

        return self.ceph_api.rbd_resize(context, parameters)

    def disk_growfs(self, token, image_name):

        context = {"token": token}

        parameters = {"image_name": image_name}

        return self.ceph_api.rbd_growfs(context, parameters)

    def billing_create(self, token, volume_uuid,
                       volume_name, volume_conf):

        try:
            url = '%s/api/v1.0/billing/resources' % (self.billing_api)
            headers = {'token': token}
            body = {
                       "resource_uuid": volume_uuid,
                       "resource_name": volume_name,
                       "resource_type": "volume",
                       "resource_conf": volume_conf,
                       "resource_status": "using"
                   }

            status = requests.post(url, headers=headers,
                                   data=json.dumps(body),
                                   timeout=5).json()['status']
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing resource create error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)

    def billing_delete(self, token, volume_uuid):

        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            headers = {'token': token}

            status = requests.delete(url, headers=headers,
                                     timeout=5).json()['status']
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing info delete error: reason=%s' % (e))

        return request_result(0)

    def billing_update(self, token, volume_uuid,
                       volume_conf=None, team_uuid=None,
                       project_uuid=None, user_uuid=None):

        try:
            url = '%s/api/v1.0/billing/resources/%s' \
                  % (self.billing_api, volume_uuid)
            headers = {'token': token}
            body = {
                       "resource_conf": volume_conf,
                       "resource_status": "using",
                       "team_uuid": team_uuid,
                       "project_uuid": project_uuid,
                       "user_uuid": user_uuid
                   }

            status = requests.put(url, headers=headers,
                                  data=json.dumps(body),
                                  timeout=5).json()['status']
            if int(status) != 0:
                raise(Exception('request_code not equal 0'))
        except Exception, e:
            log.error('Billing info update error: reason=%s' % (e))
            return request_result(601)

        return request_result(0)
