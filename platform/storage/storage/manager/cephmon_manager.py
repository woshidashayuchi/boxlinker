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


class CephMonManager(object):

    def __init__(self):

        self.storage_db = storage_db.StorageDB()
        self.storage_driver = storage_driver.StorageDriver()

    @operation_record(resource_type='cephmon', action='create')
    def cephmon_init(self, cluster_uuid,
                     mon01_hostip, mon01_rootpwd, mon01_snic,
                     mon02_hostip, mon02_rootpwd, mon02_snic,
                     token, source_ip, resource_name):

        try:
            host_check01 = self.storage_db.host_check(mon01_hostip)[0][0]
            host_check02 = self.storage_db.host_check(mon02_hostip)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if host_check01 != 0:
            log.warning('Ceph mon节点(IP:%s)已存在系统中，无法执行ceph初始化操作'
                        % (mon01_hostip))
            return request_result(521)

        if host_check02 != 0:
            log.warning('Ceph mon节点(IP:%s)已存在系统中，无法执行ceph初始化操作'
                        % (mon02_hostip))
            return request_result(521)

        try:
            cluster_info = self.storage_db.ceph_cluster_info(
                                cluster_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        mon_init_result = self.storage_driver.cephmon_init(
                               token, cluster_info,
                               mon01_hostip, mon01_rootpwd, mon01_snic,
                               mon02_hostip, mon02_rootpwd, mon02_snic)
        status_code = mon_init_result.get('status')
        if int(status_code) != 0:
            log.error('Ceph mon init failure, mon01_hostip=%s, '
                      'mon01_snic=%s, mon02_hostip=%s, mon02_snic=%s'
                      % (mon01_hostip, mon01_snic,
                         mon02_hostip, mon02_snic))
            return request_result(status_code)

        mon01_hostname = mon_init_result.get('result').get('mon01_hostname')
        mon02_hostname = mon_init_result.get('result').get('mon02_hostname')
        mon01_storage_ip = mon_init_result.get(
                                           'result').get('mon01_storage_ip')
        mon02_storage_ip = mon_init_result.get(
                                           'result').get('mon02_storage_ip')
        mon01_id = 'mon.1'
        mon02_id = 'mon.2'
        mon01_hostuuid = str(uuid.uuid4())
        mon02_hostuuid = str(uuid.uuid4())
        mon01_uuid = str(uuid.uuid4())
        mon02_uuid = str(uuid.uuid4())
        try:
            self.storage_db.cephmon_init(
                 cluster_uuid,
                 mon01_hostuuid, mon01_hostname, mon01_hostip,
                 mon02_hostuuid, mon02_hostname, mon02_hostip,
                 mon01_uuid, mon01_id, mon01_storage_ip,
                 mon02_uuid, mon02_id, mon02_storage_ip)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "mon01_hostip": mon01_hostip,
                     "mon02_hostip": mon02_hostip,
                     "mon01_hostname": mon01_hostname,
                     "mon02_hostname": mon02_hostname,
                     "cluster_uuid": cluster_uuid,
                     "mon01_id": mon01_id,
                     "mon02_id": mon02_id,
                     "mon01_storage_ip": mon01_storage_ip,
                     "mon02_storage_ip": mon02_storage_ip
                 }

        return request_result(0, result)

    @operation_record(resource_type='cephmon', action='create')
    def mon_add(self, cluster_uuid,
                host_ip, rootpwd, storage_nic,
                token, source_ip, resource_name):

        try:
            host_check = self.storage_db.host_check(host_ip)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if host_check != 0:
            log.warning('Ceph mon节点(IP:%s)已存在系统中，无法执行添加操作'
                        % (host_ip))
            return request_result(521)

        try:
            cluster_info = self.storage_db.ceph_cluster_info(
                                cluster_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        try:
            mon_num = self.storage_db.mon_count(cluster_uuid)[0][0]
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        if mon_num == 2:
            mon_id = 'mon.3'
        elif mon_num == 3:
            mon_id = 'mon.4'
        elif mon_num == 4:
            mon_id = 'mon.5'
        elif mon_num >= 5:
            log.warning('ceph存储目前最多只支持配置5台mon节点')
            return request_result(527)

        try:
            mon_list = self.storage_db.mon_list(cluster_uuid)
        except Exception, e:
            log.error('Database select error, reason=%s' % (e))
            return request_result(404)

        mon_add_result = self.storage_driver.cephmon_add(
                              token, cluster_info, mon_id,
                              host_ip, rootpwd, storage_nic,
                              mon_list)
        status_code = mon_add_result.get('status')
        if int(status_code) != 0:
            log.error('Ceph mon add failure, host_ip=%s, storage_nic=%s'
                      % (host_ip, storage_nic))
            return request_result(status_code)

        host_name = mon_init_result.get('result').get('host_name')
        storage_ip = mon_init_result.get('result').get('storage_ip')
        cluster_uuid = mon_init_result.get('result').get('cluster_uuid')
        host_uuid = str(uuid.uuid4())
        mon_uuid = str(uuid.uuid4())

        try:
            self.storage_db.cephmon_add(
                 cluster_uuid, host_uuid,
                 host_name, host_ip,
                 mon_uuid, mon_id, storage_ip)
        except Exception, e:
            log.error('Database insert error, reason=%s' % (e))
            return request_result(401)

        result = {
                     "cluster_uuid": cluster_uuid,
                     "host_uuid": host_uuid,
                     "host_name": host_name,
                     "host_ip": host_ip,
                     "mon_id": mon_id,
                     "storage_ip": storage_ip
                 }

        return request_result(0, result)
