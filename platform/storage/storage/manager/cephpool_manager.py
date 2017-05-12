# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid
import json

from conf import conf
from common.logs import logging as log
from common.code import request_result
from common.json_encode import CJsonEncoder
from common.operation_record import operation_record

from storage.db import storage_db
from storage.driver import storage_driver


class CephPoolManager(object):

    def __init__(self):

        self.storage_db = storage_db.StorageDB()
        self.storage_driver = storage_driver.StorageDriver()

    @operation_record(resource_type='cephpool', action='create')
    def cephpool_create(self, cluster_uuid, pool_type,
                        token, source_ip, resource_name):

        try:
            osd_check = self.storage_db.osdnode_check(
                             cluster_uuid, pool_type)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if osd_check < 2:
            log.warning('%s类型硬盘osd节点不足，无法创建存储池' % (pool_type))
            return request_result(534)

        try:
            cephmon_ip = self.storage_db.cephmon_manage_ip(
                              cluster_uuid)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        pool_name = 'pool_%s' % (pool_type)

        pool_create_result = self.storage_driver.cephpool_create(
                                  token, cephmon_ip, pool_type, pool_name)
        status_code = pool_create_result.get('status')
        if int(status_code) != 0:
            log.error('Ceph pool create failure, cephmon_ip=%s, pool_type=%s'
                      % (cephmon_ip, pool_type))
            return request_result(status_code)

        pool_size = pool_create_result.get('result').get('pool_size')
        used = pool_create_result.get('result').get('used')
        avail = pool_create_result.get('result').get('avail')
        used_rate = pool_create_result.get('result').get('used_rate')

        pool_uuid = str(uuid.uuid4())

        try:
            self.storage_db.cephpool_create(
                 pool_uuid, cluster_uuid, 
                 pool_name, pool_size, used,
                 avail, used_rate, pool_type)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "cluster_uuid": cluster_uuid,
                     "pool_type": pool_type,
                     "pool_name": pool_name
                 }

        return request_result(0, result)

    @operation_record(resource_type='cephpool', action='update')
    def cephpool_update(self, cluster_uuid,
                        token, source_ip, resource_name):

        try:
            cephmon_ip = self.storage_db.cephmon_manage_ip(
                              cluster_uuid)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        pool_info = self.storage_driver.cephpool_info(
                         token, cephmon_ip)

        status_code = pool_info.get('status')
        if int(status_code) != 0:
            log.error('Get Ceph pool info failure, cephmon_ip=%s'
                      % (cephmon_ip))
            return request_result(status_code)

        pool_size = pool_info.get('result').get('pool_size')
        avail = pool_info.get('result').get('avail')
        used = pool_info.get('result').get('used')
        used_rate = pool_info.get('result').get('used_rate')

        try:
            self.storage_db.cephpool_update(
                 cluster_uuid, pool_size,
                 used, avail, used_rate)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "pool_size": pool_size,
                     "avail": avail,
                     "used": used,
                     "used_rate": used_rate
                 }

        return request_result(0, result)

    def cephpool_info(self, pool_uuid):

        try:
            pool_info = self.storage_db.cephpool_info(pool_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        cluster_uuid = pool_info[0][0]
        pool_name = pool_info[0][1]
        pool_size = pool_info[0][2]
        used = pool_info[0][3]
        avail = pool_info[0][4]
        used_rate = pool_info[0][5]
        pool_type = pool_info[0][6]
        create_time = pool_info[0][7]
        update_time = pool_info[0][8]
        cluster_name = pool_info[0][9]

        v_result = {
                       "pool_uuid": pool_uuid,
                       "cluster_uuid": cluster_uuid,
                       "cluster_name": cluster_name,
                       "pool_name": pool_name,
                       "pool_size": pool_size,
                       "used": used,
                       "avail": avail,
                       "used_rate": used_rate,
                       "pool_type": pool_type,
                       "create_time": create_time,
                       "update_time": update_time
                   }

        v_result = json.dumps(v_result, cls=CJsonEncoder)
        result = json.loads(v_result)

        return request_result(0, result)

    def cephpool_list(self, cluster_uuid):

        try:
            pool_list = self.storage_db.cephpool_list(cluster_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        result_list = []
        for pool_info in pool_list:
            pool_uuid = pool_info[0]
            pool_name = pool_info[1]
            pool_size = pool_info[2]
            used = pool_info[3]
            avail = pool_info[4]
            used_rate = pool_info[5]
            pool_type = pool_info[6]
            create_time = pool_info[7]
            update_time = pool_info[8]
            cluster_name = pool_info[9]

            v_result = {
                           "pool_uuid": pool_uuid,
                           "cluster_uuid": cluster_uuid,
                           "cluster_name": cluster_name,
                           "pool_name": pool_name,
                           "pool_size": pool_size,
                           "used": used,
                           "avail": avail,
                           "used_rate": used_rate,
                           "pool_type": pool_type,
                           "create_time": create_time,
                           "update_time": update_time
                       }

            v_result = json.dumps(v_result, cls=CJsonEncoder)
            v_result = json.loads(v_result)
            result_list.append(v_result)

        result = {"pool_list": result_list}

        return request_result(0, result)
