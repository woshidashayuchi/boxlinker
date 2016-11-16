# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json

from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder

from storage.db import storage_db
from storage.drive import ceph_driver


class DiskManager(object):

    def __init__(self):

        self.ceph_db = storage_db.StorageDB()
        self.ceph_driver = ceph_driver.CephDriver()
        self.pool_name = 'pool_hdd'

    def volume_create(self, token, user_uuid, orga_uuid,
                      volume_name, volume_size, fs_type):

        try:
            disk_name_ch = self.ceph_db.name_duplicate_check(
                                        volume_name, orga_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if disk_name_ch != 0:
            log.warning('Volume name(%s) already exists' % (volume_name))
            return request_result(301)

        volume_uuid = str(uuid.uuid4())
        disk_name = volume_name + '-' + volume_uuid

        ret = self.ceph_driver.disk_create(
                   token, self.pool_name, disk_name, volume_size)
        ret = eval(ret)
        status_code = int(ret['status'])
        if status_code != 0:
            log.error('Create ceph disk(%s) failure' % (volume_name))
            # self.ceph_driver.notification(202, user_name)
            return request_result(status_code)

        try:
            self.ceph_db.volume_create(
                         volume_uuid, volume_name,
                         disk_name, volume_size, fs_type,
                         pool_name, user_uuid, orga_uuid)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "volume_uuid": volume_uuid,
                     "volume_name": volume_name,
                     "pool_name": self.pool_name,
                     "image_name": disk_name,
                     "volume_size": volume_size,
                     "fs_type": fs_type
                 }

        # self.ceph_driver.notification(201, user_name)

        return request_result(0, result)

    def volume_delete(self, token, volume_uuid):

        try:
            volume_info = self.ceph_db.volume_info(volume_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        disk_name = volume_info[0][3]

        ret = self.ceph_driver.disk_delete(token, self.pool_name, disk_name)
        ret = eval(ret)
        status_code = int(ret['status'])
        if status_code != 0:
            log.error('Delete ceph disk(%s) failure' % (disk_name))
            # self.ceph_driver.notification(206, user_name)
            return request_result(status_code)

        try:
            self.ceph_db.volume_delete(volume_uuid)
        except Exception, e:
            log.error('Database delete error')
            return request_result(402)

        # self.ceph_driver.notification(205, user_name)

        return request_result(0)

    def volume_resize(self, token, volume_uuid, volume_size):

        try:
            volume_info = self.ceph_db.volume_info(volume_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        volume_name = volume_info[0][0]
        disk_name = volume_info[0][3]

        ret = self.ceph_driver.disk_resize(token, self.pool_name,
                                           disk_name, volume_size)
        ret = eval(ret)
        status_code = int(ret['status'])
        if status_code != 0:
            log.error('ceph disk(%s) resize failure' % (disk_name))
            # self.ceph_driver.notification(204, user_name)

            return request_result(status_code)

        self.ceph_driver.disk_growfs(token, disk_name)

        try:
            self.ceph_db.volume_resize(volume_uuid, volume_size)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        result = {
                     "volume_uuid": volume_uuid,
                     "volume_name": volume_name,
                     "pool_name": self.pool_name,
                     "image_name": disk_name,
                     "volume_size": volume_size
                 }

        # self.ceph_driver.notification(203, user_name)

        return request_result(0, result)

    def volume_status(self, volume_uuid, volume_status):

        try:
            self.ceph_db.volume_status(volume_uuid, volume_status)
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
            volume_info = self.ceph_db.volume_info(volume_uuid)
        except Exception, e:
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

    def volume_list(self, user_uuid, orga_uuid):

        try:
            volume_list_info = self.ceph_db.volume_list_info(
                                            user_uuid, orga_uuid)
        except Exception, e:
            return request_result(404)

        disk_list = []
        for volume_info in volume_list_info:
            volume_name = volume_info[0]
            volume_size = volume_info[1]
            volume_status = volume_info[2]
            image_name = volume_info[3]
            fs_type = volume_info[4]
            mount_point = volume_info[5]
            pool_name = volume_info[6]
            create_time = volume_info[7]
            update_time = volume_info[8]

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

        return request_result(0, result)
