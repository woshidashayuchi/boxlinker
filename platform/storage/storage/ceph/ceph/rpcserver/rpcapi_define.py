# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from common.logs import logging as log
from common.code import request_result
from common.parameters import parameter_check
from common.token_ucenterauth import token_check

from ceph.manager import cephmon_manager
from ceph.manager import cephdisk_manager


class CephRpcManager(object):

    def __init__(self):

        self.cephmon_manager = cephmon_manager.CephMonManager()
        self.cephdisk_manager = cephdisk_manager.CephDiskManager()

    @token_check
    def cephmon_init(self, context, parameters):

        try:
            cluster_info = parameters.get('cluster_info')
            mon01_hostip = parameters.get('mon01_hostip')
            mon01_rootpwd = parameters.get('mon01_rootpwd')
            mon01_snic = parameters.get('mon01_snic')
            mon02_hostip = parameters.get('mon02_hostip')
            mon02_rootpwd = parameters.get('mon02_rootpwd')
            mon02_snic = parameters.get('mon02_snic')

            mon01_hostip = parameter_check(mon01_hostip, ptype='pnip')
            mon01_rootpwd = parameter_check(mon01_rootpwd, ptype='ppwd')
            mon01_snic = parameter_check(mon01_snic, ptype='pnam')
            mon02_hostip = parameter_check(mon02_hostip, ptype='pnip')
            mon02_rootpwd = parameter_check(mon02_rootpwd, ptype='ppwd')
            mon02_snic = parameter_check(mon02_snic, ptype='pnam')
        except Exception, e:
            log.warning('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.cephmon_manager.cephmon_init(
                    cluster_info,
                    mon01_hostip, mon01_rootpwd, mon01_snic,
                    mon02_hostip, mon02_rootpwd, mon02_snic)

    @token_check
    def cephmon_add(self, context, parameters):

        try:
            cluster_info = parameters.get('cluster_info')
            mon_id = parameters.get('mon_id')
            host_ip = parameters.get('host_ip')
            rootpwd = parameters.get('rootpwd')
            storage_nic = parameters.get('storage_nic')
            mon_list = parameters.get('mon_list')

            host_ip = parameter_check(host_ip, ptype='pnip')
            rootpwd = parameter_check(rootpwd, ptype='ppwd')
            storage_nic = parameter_check(storage_nic, ptype='pnam')
        except Exception, e:
            log.warning('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.cephmon_manager.cephmon_add(
                    cluster_info, mon_id, host_ip,
                    rootpwd, storage_nic, mon_list)

    @token_check
    def disk_create(self, context, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
            disk_size = parameters['disk_size']

            pool_name = parameter_check(pool_name, ptype='pnam')
            disk_name = parameter_check(disk_name, ptype='pstr')
            disk_size = parameter_check(disk_size, ptype='pint')
        except Exception, e:
            log.warning('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.cephdisk_manager.disk_create(
                    pool_name, disk_name, disk_size)

    @token_check
    def disk_delete(self, context, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']

            pool_name = parameter_check(pool_name, ptype='pnam')
            disk_name = parameter_check(disk_name, ptype='pstr')
        except Exception, e:
            log.warning('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.cephdisk_manager.disk_delete(
                    pool_name, disk_name)

    @token_check
    def disk_resize(self, context, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
            disk_size = parameters['disk_size']

            pool_name = parameter_check(pool_name, ptype='pnam')
            disk_name = parameter_check(disk_name, ptype='pstr')
            disk_size = parameter_check(disk_size, ptype='pint')
        except Exception, e:
            log.warning('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.cephdisk_manager.disk_resize(
                    pool_name, disk_name, disk_size)

    @token_check
    def rbd_growfs(self, context, parameters):

        try:
            image_name = parameters['image_name']

            image_name = parameter_check(image_name, ptype='pstr')
        except Exception, e:
            log.warning('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.cephdisk_manager.disk_growfs(image_name)
