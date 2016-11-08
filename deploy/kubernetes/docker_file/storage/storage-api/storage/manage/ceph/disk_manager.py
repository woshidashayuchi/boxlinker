# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json

from time import sleep

from common.logs import logging as log
from common.code import request_result
from common.acl_auth import acl_check
from common.json_encode import CJsonEncoder
from storage.db import storage_db
from storage.drive.ceph import ceph_driver


class DiskManager(object):

    def __init__(self):
        self.ceph_db = storage_db.StorageDB()
        self.ceph_driver = ceph_driver.CephDriver()
        self.pool_name = 'pool_hdd'

    @acl_check
    def disk_create(self, token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, disk_name, disk_size, fs_type):

        pool_name = self.pool_name
        resource_type = 'volume'

        try:
            disk_name_ch = self.ceph_db.disk_name_check(disk_name, user_orag)
        except Exception, e:
            return request_result(404)

        if disk_name_ch != 0:
            log.warning('Ceph disk(%s) already exists' % (disk_name))
            return request_result(301)

        disk_id = str(uuid.uuid4())
        disk_ins_name = disk_name + '-' + disk_id

        ret = self.ceph_driver.disk_create(
            token, pool_name, disk_ins_name, disk_size)
        ret = eval(ret)
        status_code = int(ret['status'])
        if status_code != 0:
            log.error('Ceph disk(%s) create failure' % (disk_name))
            self.ceph_driver.notification(202, user_name)
            return request_result(status_code)

        try:
            self.ceph_db.disk_create(disk_id, disk_name, disk_ins_name, resource_type, disk_size, fs_type, pool_name, user_orag, user_name)
        except Exception, e:
            log.error('Database insert error')
            return request_result(401)

        disk_status = 'unused'

        result = {
                     "resource_type": resource_type,
                     "disk_name": disk_name,
                     "pool_name": pool_name,
                     "image_name": disk_ins_name,
                     "disk_size": disk_size,
                     "disk_status": disk_status,
                     "fs_type": fs_type
                 }

        self.ceph_driver.notification(201, user_name)

        return request_result(0, result)

    @acl_check
    def disk_delete(self, token, user_name, user_role, user_orag, user_ip, resource_name, resource_type):
        pool_name = self.pool_name
        disk_name = resource_name

        try:
            disk_id = self.ceph_db.get_uuid(disk_name, resource_type, user_orag)
        except Exception, e:
            return request_result(404)

        disk_ins_name = disk_name + '-' + disk_id

        ret = self.ceph_driver.disk_delete(token, pool_name, disk_ins_name)
        ret = eval(ret)
        status_code = int(ret['status'])
        if status_code != 0:
            log.error('Ceph disk(%s) delete failure' % (disk_name))
            self.ceph_driver.notification(206, user_name)
            return request_result(status_code)

        try:
            self.ceph_db.disk_delete(disk_id)
        except Exception, e:
            log.error('Database delete error')
            return request_result(402)

        self.ceph_driver.notification(205, user_name)

        return request_result(0)

    @acl_check
    def disk_resize(self, token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, disk_size):
        pool_name = self.pool_name
        disk_name = resource_name

        try:
            disk_id = self.ceph_db.get_uuid(disk_name, resource_type, user_orag)
        except Exception, e:
            return request_result(404)

        disk_ins_name = disk_name + '-' + disk_id

        ret = self.ceph_driver.disk_resize(token, pool_name, disk_ins_name, disk_size)
        ret = eval(ret)
        status_code = int(ret['status'])
        if status_code != 0:
            log.error('ceph disk(%s) resize failure' % (disk_name))
            self.ceph_driver.notification(204, user_name)

            return request_result(status_code)

        self.ceph_driver.disk_growfs(token, disk_ins_name)

        try:
            self.ceph_db.disk_resize(disk_id, disk_size)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        result = {
                     "resource_type": resource_type,
                     "disk_name": disk_name,
                     "pool_name": pool_name,
                     "image_name": disk_ins_name,
                     "disk_size": disk_size
                 }

        self.ceph_driver.notification(203, user_name)

        return request_result(0, result)

    @acl_check
    def disk_status(self, token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, disk_status):
        pool_name = self.pool_name
        disk_name = resource_name

        try:
            disk_id = self.ceph_db.get_uuid(disk_name, resource_type, user_orag)
        except Exception, e:
            return request_result(404)

        try:
            self.ceph_db.disk_status(disk_id, disk_status)
        except Exception, e:
            log.error('Database update error')
            return request_result(403)

        disk_ins_name = disk_name + '-' + disk_id

        result = {
                     "resource_type": resource_type,
                     "disk_name": disk_name,
                     "pool_name": pool_name,
                     "image_name": disk_ins_name,
                     "disk_status": disk_status
                 }

        return request_result(0, result)

    @acl_check
    def disk_info(self, token, user_name, user_role, user_orag, user_ip, resource_name, resource_type):
        try:
            disk_info = self.ceph_db.disk_info(resource_name, resource_type, user_orag)
        except Exception, e:
            return request_result(404)

        for disk in disk_info:
            image_name = disk[0]
            disk_size = disk[1]
            disk_status = disk[2]
            fs_type = disk[3]
            pool_name = disk[4]
            create_time = disk[5]
            update_time = disk[6]

            v_disk_info = {"disk_name": resource_name, 
                           "image_name": image_name, 
                           "disk_size": disk_size, 
                           "disk_status": disk_status, 
                           "fs_type": fs_type,
                           "pool_name": pool_name, 
                           "create_time": create_time,
                           "update_time": update_time}

            volume_info = json.dumps(v_disk_info, cls=CJsonEncoder)

        result = json.loads(volume_info)

        return request_result(0, result)

    @acl_check
    def disk_list(self, token, user_name, user_role, user_orag, user_ip, resource_name, resource_type, get_resource_type):
        try:
            disk_list_info = self.ceph_db.disk_list_info(get_resource_type, user_name, user_role, user_orag)
        except Exception, e:
            return request_result(404)

        disk_list = []
        for disk_info in disk_list_info:
            log.debug('disk_info=%s' % (str(disk_info)))
            disk_name = disk_info[0]
            image_name = disk_info[1]
            disk_size = disk_info[2]
            disk_status = disk_info[3]
            fs_type = disk_info[4]
            pool_name = disk_info[5]
            create_time = disk_info[6]
            update_time = disk_info[7]

            v_disk_info = {"disk_name": disk_name,
                           "image_name": image_name,
                           "disk_size": disk_size,
                           "disk_status": disk_status,
                           "fs_type": fs_type,
                           "pool_name": pool_name,
                           "create_time": create_time,
                           "update_time": update_time}

            v_disk_info = json.dumps(v_disk_info, cls=CJsonEncoder)
            v_disk_info = json.loads(v_disk_info)
            disk_list.append(v_disk_info)

        result = {"volume_list": disk_list}

        return request_result(0, result)
