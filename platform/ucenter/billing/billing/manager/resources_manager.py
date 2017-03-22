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
                        resource_status, user_uuid,
                        team_uuid, project_uuid):

        try:
            self.billing_db.resource_insert(
                            resource_uuid, resource_name,
                            resource_type, resource_conf,
                            resource_status, user_uuid,
                            team_uuid, project_uuid)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "resource_uuid": resource_uuid,
                     "resource_name": resource_name,
                     "resource_type": resource_type,
                     "resource_conf": resource_conf,
                     "resource_status": resource_status,
                     "user_uuid": user_uuid,
                     "team_uuid": team_uuid,
                     "project_uuid": project_uuid
                 }

        return request_result(0, result)

    def resource_delete(self, resource_uuid):

        try:
            self.billing_db.resource_delete(resource_uuid)
        except Exception, e:
            log.error('Database delete error, reason=%s' % (e))
            return request_result(402)

        return request_result(0)

    def resource_update(self, resource_uuid, resource_conf,
                        resource_status, user_uuid, team_uuid,
                        project_uuid):

        try:
            self.billing_db.resource_update(
                            resource_uuid, resource_conf,
                            resource_status, user_uuid,
                            team_uuid, project_uuid)
        except Exception, e:
            log.error('Database update error, reason=%s' % (e))
            return request_result(403)

        result = {
                     "resource_uuid": resource_uuid
                 }

        if resource_conf is not None:
            result['resource_conf'] = resource_conf
        if resource_status is not None:
            result['resource_status'] = resource_status
        if team_uuid is not None:
            result['team_uuid'] = team_uuid
        if project_uuid is not None:
            result['project_uuid'] = project_uuid
        if user_uuid is not None:
            result['user_uuid'] = user_uuid

        return request_result(0, result)

    def resource_list(self, team_uuid, page_size, page_num):

        try:
            resources_list_info = self.billing_db.resource_list(
                                       team_uuid, page_size, page_num)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        bill_resources_list = resources_list_info.get('resource_list')
        count = resources_list_info.get('count')

        resources_list = []
        for resources_info in bill_resources_list:
            resource_uuid = resources_info[0]
            resource_type = resources_info[1]
            team_uuid = resources_info[2]
            project_uuid = resources_info[3]
            user_uuid = resources_info[4]
            create_time = resources_info[5]
            update_time = resources_info[6]
            resource_name = resources_info[7]
            resource_conf = resources_info[8]
            resource_status = resources_info[9]

            v_resources_info = {
                                   "resource_uuid": resource_uuid,
                                   "resource_type": resource_type,
                                   "team_uuid": team_uuid,
                                   "project_uuid": project_uuid,
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

        result = {"count": count}
        result['resources_list'] = resources_list

        return request_result(0, result)
