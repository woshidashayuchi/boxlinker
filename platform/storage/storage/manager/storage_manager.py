# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json

from conf import conf
from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder
from common.limit import limit_check

from storage.db import storage_db
from storage.driver import storage_driver


class StorageManager(object):

    def __init__(self):

        self.pool_name = conf.ceph_pool_name
        self.storage_db = storage_db.StorageDB()
        self.storage_driver = storage_driver.StorageDriver()

    @limit_check('volumes')
    def volume_create(self, token, team_uuid, project_uuid, user_uuid,
                      volume_name, volume_size, fs_type, cost):

        try:
            disk_name_ch = self.storage_db.name_duplicate_check(
                                        volume_name, project_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if disk_name_ch != 0:
            log.warning('Volume name(%s) already exists' % (volume_name))
            return request_result(301)

        volume_uuid = str(uuid.uuid4())
        disk_name = volume_name + '-' + volume_uuid

        status_code = self.storage_driver.disk_create(
                           token, self.pool_name,
                           disk_name, volume_size)['status']
        if int(status_code) != 0:
            log.error('Create storage disk(%s) failure' % (volume_name))
            return request_result(status_code)

        try:
            self.storage_db.volume_create(
                         volume_uuid, volume_name, disk_name,
                         volume_size, fs_type, self.pool_name,
                         team_uuid, project_uuid, user_uuid)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        volume_conf = str(volume_size) + 'G'
        self.storage_driver.billing_create(
             token, volume_uuid, volume_name, volume_conf)

        result = {
                     "volume_uuid": volume_uuid,
                     "volume_name": volume_name,
                     "pool_name": self.pool_name,
                     "image_name": disk_name,
                     "volume_size": volume_size,
                     "fs_type": fs_type
                 }

        return request_result(0, result)

    def volume_logical_delete(self, token, volume_uuid):

        try:
            self.storage_db.volume_logical_delete(volume_uuid)
        except Exception, e:
            log.error('Database delete error')
            return request_result(402)

        self.storage_driver.billing_delete(token, volume_uuid)

        return request_result(0)

    def volume_physical_delete(self, token, volume_uuid):

        try:
            volume_info = self.storage_db.volume_info(volume_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        disk_name = volume_info[0][3]

        status_code = self.storage_driver.disk_delete(
                           token, self.pool_name,
                           disk_name)['status']
        if int(status_code) != 0:
            log.error('Delete storage disk(%s) failure' % (disk_name))
            return request_result(status_code)

        try:
            self.storage_db.volume_physical_delete(volume_uuid)
        except Exception, e:
            log.error('Database delete error')
            return request_result(402)

        self.storage_driver.billing_delete(token, volume_uuid)

        return request_result(0)

    def volume_resize(self, token, volume_uuid, volume_size):

        try:
            volume_info = self.storage_db.volume_info(volume_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        volume_name = volume_info[0][0]
        disk_name = volume_info[0][3]

        status_code = self.storage_driver.disk_resize(
                           token, self.pool_name,
                           disk_name, volume_size)['status']
        if int(status_code) != 0:
            log.error('storage disk(%s) resize failure' % (disk_name))
            return request_result(status_code)

        self.storage_driver.disk_growfs(token, disk_name)

        try:
            self.storage_db.volume_resize(volume_uuid, volume_size)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        volume_conf = str(volume_size) + 'G'
        self.storage_driver.billing_update(
                            token, volume_uuid,
                            volume_conf)

        result = {
                     "volume_uuid": volume_uuid,
                     "volume_name": volume_name,
                     "pool_name": self.pool_name,
                     "image_name": disk_name,
                     "volume_size": volume_size
                 }

        return request_result(0, result)

    def volume_status(self, volume_uuid, volume_status):

        try:
            self.storage_db.volume_status(volume_uuid, volume_status)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        result = {
                     "volume_uuid": volume_uuid,
                     "volume_status": volume_status
                 }

        return request_result(0, result)

    def volume_info(self, volume_uuid):

        try:
            volume_info = self.storage_db.volume_info(volume_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        volume_name = volume_info[0][0]
        volume_size = volume_info[0][1]
        volume_status = volume_info[0][2]
        image_name = volume_info[0][3]
        fs_type = volume_info[0][4]
        mount_point = volume_info[0][5]
        pool_name = volume_info[0][6]
        create_time = volume_info[0][7]
        update_time = volume_info[0][8]

        v_disk_info = {
                          "volume_uuid": volume_uuid,
                          "volume_name": volume_name,
                          "volume_size": volume_size,
                          "volume_status": volume_status,
                          "image_name": image_name,
                          "fs_type": fs_type,
                          "mount_point": mount_point,
                          "pool_name": pool_name,
                          "create_time": create_time,
                          "update_time": update_time
                      }

        volume_info = json.dumps(v_disk_info, cls=CJsonEncoder)

        result = json.loads(volume_info)

        return request_result(0, result)

    def volume_list(self, user_uuid, team_uuid, team_priv,
                    project_uuid, project_priv,
                    page_size, page_num):

        try:
            if ((project_priv is not None) and ('R' in project_priv)) \
               or ((team_priv is not None) and ('R' in team_priv)):
                volumes_list_info = self.storage_db.volume_list_project(
                                         team_uuid, project_uuid,
                                         page_size, page_num)
            else:
                volumes_list_info = self.storage_db.volume_list_user(
                                         team_uuid, project_uuid, user_uuid,
                                         page_size, page_num)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        user_volumes_list = volumes_list_info.get('volumes_list')
        count = volumes_list_info.get('count')

        disk_list = []
        for volume_info in user_volumes_list:
            volume_uuid = volume_info[0]
            volume_name = volume_info[1]
            volume_size = volume_info[2]
            volume_status = volume_info[3]
            image_name = volume_info[4]
            fs_type = volume_info[5]
            mount_point = volume_info[6]
            pool_name = volume_info[7]
            create_time = volume_info[8]
            update_time = volume_info[9]

            v_disk_info = {
                              "volume_uuid": volume_uuid,
                              "volume_name": volume_name,
                              "volume_size": volume_size,
                              "volume_status": volume_status,
                              "image_name": image_name,
                              "fs_type": fs_type,
                              "mount_point": mount_point,
                              "pool_name": pool_name,
                              "create_time": create_time,
                              "update_time": update_time
                          }

            v_disk_info = json.dumps(v_disk_info, cls=CJsonEncoder)
            v_disk_info = json.loads(v_disk_info)
            disk_list.append(v_disk_info)

        result = {"volume_list": disk_list}
        result['count'] = count

        return request_result(0, result)

    def volume_update(self, token, volume_uuid, update,
                      volume_size, volume_status):

        if update == 'size':
            return self.volume_resize(
                        token, volume_uuid, volume_size)
        elif update == 'status':
            return self.volume_status(
                        volume_uuid, volume_status)

    def volume_check(self):

        # 获取24小时内新增的存储卷

        try:
            volumes_add_info = self.storage_db.volume_add_list()
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        add_list = []
        for volume_info in volumes_add_info:
            volume_uuid = volume_info[0]
            volume_name = volume_info[1]
            volume_size = volume_info[2]
            volume_status = volume_info[3]
            resource_type = volume_info[4]
            team_uuid = volume_info[5]
            project_uuid = volume_info[6]
            user_uuid = volume_info[7]

            volume_conf = str(volume_size) + 'G'

            v_disk_info = {
                              "resource_uuid": volume_uuid,
                              "resource_name": volume_name,
                              "resource_type": resource_type,
                              "resource_conf": volume_conf,
                              "resource_status": "using",
                              "team_uuid": team_uuid,
                              "project_uuid": project_uuid,
                              "user_uuid": user_uuid
                          }

            add_list.append(v_disk_info)

        # 获取24小时内删除的存储卷

        try:
            volumes_delete_info = self.storage_db.volume_delete_list()
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        delete_list = []
        for volume_info in volumes_delete_info:
            volume_uuid = volume_info[0]

            v_disk_info = {
                              "resource_uuid": volume_uuid
                          }

            delete_list.append(v_disk_info)

        # 获取24小时内更新的存储卷

        try:
            volumes_update_info = self.storage_db.volume_update_list()
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        update_list = []
        for volume_info in volumes_update_info:
            volume_uuid = volume_info[0]
            volume_name = volume_info[1]
            volume_size = volume_info[2]
            volume_status = volume_info[3]
            resource_type = volume_info[4]
            team_uuid = volume_info[5]
            project_uuid = volume_info[6]
            user_uuid = volume_info[7]

            volume_conf = str(volume_size) + 'G'

            v_disk_info = {
                              "resource_uuid": volume_uuid,
                              "resource_name": volume_name,
                              "resource_type": resource_type,
                              "resource_conf": volume_conf,
                              "resource_status": "using",
                              "team_uuid": team_uuid,
                              "project_uuid": project_uuid,
                              "user_uuid": user_uuid
                          }

            update_list.append(v_disk_info)

        self.storage_driver.resources_check(
             add_list, delete_list, update_list)
