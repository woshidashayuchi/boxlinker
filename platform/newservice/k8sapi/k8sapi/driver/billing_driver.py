# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/9 下午1:59
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from db.service_db import ServiceDB
from conf import conf
import requests
import json


class BillingResource(object):

    def __init__(self):
        self.billing_url = conf.BILLING_URL
        self.service_db = ServiceDB()

    def base_element(self, context):
        header = {'token': context.get('token')}
        resource_uuid = ''
        service_status = ''
        cm_format = ''
        pods_num = 1

        try:
            ret = self.service_db.rc_for_billing(context)
            log.info('get the rc message for billing is:%s' % ret)
            for i in ret:
                resource_uuid = i.get('uuid')
                service_status = i.get('service_status')
                cm_format = i.get('cm_format')
                pods_num = i.get('pods_num')
            service_name = context.get('service_name')
            project_uuid = context.get('project_uuid')
            if service_status.lower() == 'stopping':
                pods_num = 0
        except Exception, e:
            log.error('get the detail parameters error, reason is: %s' % e)
            raise Exception('get the detail parameters error')

        return pods_num, header, project_uuid, resource_uuid, cm_format, service_name

    def update_billing(self, context):
        log.info('the data when update billing resources is: %s' % context)

        to_billing = dict()
        try:
            pods_num, header, project_uuid, resource_uuid, cm_format, service_name = self.base_element(context)
            to_billing['resource_conf'] = str(int(cm_format[0])*pods_num) + 'X'
            if pods_num != 0:
                to_billing['resource_status'] = 'on'
            else:
                to_billing['resource_status'] = 'off'
            to_billing['team_uuid'] = context.get('team_uuid')
            to_billing['project_uuid'] = context.get('project_uuid')
            to_billing['user_uuid'] = context.get('user_uuid')
        except Exception, e:
            log.error('struct the data to billing error, reason is: %s' % e)
            raise Exception('struct the data to billing error')

        try:
            url = self.billing_url+'/%s' % resource_uuid
            billing_ret = json.loads(requests.put(url, json.dumps(to_billing), headers=header, timeout=5).text)
            if int(billing_ret.get('status')) == 0:
                return True
        except Exception, e:
            log.error('put the resource to billing error, reason is: %s' % e)
            raise Exception('put the resource to billing error')

    def delete_billing(self, context):
        log.info('the data when delete billing resource is: %s' % context)

        try:
            pods_num, header, project_uuid, resource_uuid, cm_format, service_name = self.base_element(context)
        except Exception, e:
            log.error('struct the data to billing error, reason is: %s' % e)
            raise Exception('struct the data to billing error')

        try:
            url = self.billing_url + '/' + resource_uuid
            billing_ret = requests.delete(url, headers=header, timeout=5).text
            log.info('delete the billing result is: %s, type is: %s' % (billing_ret, type(billing_ret)))
            billing_ret = json.loads(billing_ret)
            if int(billing_ret.get('status')) == 0:
                return True
        except Exception, e:
            log.error('delete the resource of billing error, reason is: %s' % e)
            raise Exception('delete the resource of billing error')

