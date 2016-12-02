# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.logs import logging as log
from common.code import request_result
from common.token_auth import token_check

from ceph.manage.ceph_manager import CephManager


class CephRpcAPI(object):

    def __init__(self):

        self.ceph_manager = CephManager()

    @token_check
    def disk_create(self, context, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
            disk_size = parameters['disk_size']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_manager.disk_create(pool_name, disk_name, disk_size)

    @token_check
    def disk_delete(self, context, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_manager.disk_delete(pool_name, disk_name)

    @token_check
    def disk_resize(self, context, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
            disk_size = parameters['disk_size']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_manager.disk_resize(pool_name, disk_name, disk_size)

    @token_check
    def rbd_growfs(self, context, parameters):

        try:
            image_name = parameters['image_name']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_manager.disk_growfs(image_name)
