# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import json

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from billing.db.billing_db import BillingDB


class ResourcesManager(object):

    def __init__(self):
        self.billing_db = BillingDB()

    def resource_create(self, resource_uuid, resource_name,
                        resource_type, resource_conf,
                        resource_status, resource_orga,
                        resource_user):

        try:
            self.billing_db.resource_insert(
                            resource_uuid, resource_name,
                            resource_type, resource_conf,
                            resource_status, resource_orga,
                            resource_user)
        except Exception, e:
            log.error('Database insert error')
            return request_result(401)

        result = {
                     "resource_uuid": resource_uuid,
                     "resource_name": resource_name,
                     "resource_type": resource_type,
                     "resource_conf": resource_conf,
                     "resource_status": resource_status,
                     "resource_organization": resource_orga,
                     "resource_user": resource_user
                 }

        return request_result(0, result)

    def resource_delete(self, resource_uuid):

        try:
            self.billing_db.resource_delete(resource_uuid)
        except Exception, e:
            log.error('Database delete error')
            return request_result(402)

        return request_result(0)

    def resource_update(self, resource_uuid, resource_conf,
                        resource_status, resource_orga,
                        resource_user):

        if (resource_conf == 'None') or (resource_conf == ''):
                resource_conf = None
        if (resource_status == 'None') or (resource_status == ''):
                resource_status = None
        if (resource_orga == 'None') or (resource_orga == ''):
                resource_orga = None
        if (resource_user == 'None') or (resource_user == ''):
                resource_user = None

        try:
            self.billing_db.resource_update(
                            resource_uuid, resource_conf,
                            resource_status, resource_orga,
                            resource_user)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        result = {
                     "resource_uuid": resource_uuid
                 }

        if resource_conf is not None:
            result['resource_conf'] = resource_conf
        if resource_status is not None:
            result['resource_status'] = resource_status
        if resource_orga is not None:
            result['resource_orga'] = resource_orga
        if resource_user is not None:
            result['resource_user'] = resource_user

        return request_result(0, result)

    def resource_get(self, user_uuid, orga_uuid, role_uuid):

        try:
            resources_list_info = self.billing_db.resource_get(user_uuid, orga_uuid, role_uuid)
        except Exception, e:
            log.error('Database select error')
            return request_result(404)

        resources_list = []
        for resources_info in resources_list_info:
            resource_uuid = resources_info[0]
            resource_type = resources_info[1]
            admin_uuid = resources_info[2]
            orga_uuid = resources_info[3]
            user_uuid = resources_info[4]
            create_time = resources_info[5]
            update_time = resources_info[6]
            resource_name = resources_info[7]
            resource_conf = resources_info[8]
            resource_status = resources_info[9]

            v_resources_info = {
                                   "resource_uuid": resource_uuid,
                                   "resource_type": resource_type,
                                   "admin_uuid": admin_uuid,
                                   "orga_uuid": orga_uuid,
                                   "user_uuid": user_uuid,
                                   "resource_name": resource_name,
                                   "resource_conf": resource_conf,
                                   "resource_status": resource_status,
                                   "create_time": create_time,
                                   "update_time": update_time
                               }

            v_resources_info = json.dumps(v_resources_info, cls=CJsonEncoder)
            v_resources_info = json.loads(v_resources_info)
            resources_list.append(v_resources_info)

        result = {"resources_list": resources_list}

        return request_result(0, result)
