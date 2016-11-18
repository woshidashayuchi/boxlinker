# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.logs import logging as log
from common.code import request_result
from common.token_auth import token_check

from ceph.ceph_driver import CephDriver


class CephManagerAPI(object):

    def __init__(self):

        self.ceph_driver = CephDriver()

    @token_check
    def disk_create(self, token, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
            disk_size = parameters['disk_size']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_driver.disk_create(pool_name, disk_name, disk_size)

    @token_check
    def disk_delete(self, token, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_driver.disk_delete(pool_name, disk_name)

    @token_check
    def disk_resize(self, token, parameters):

        try:
            pool_name = parameters['pool_name']
            disk_name = parameters['disk_name']
            disk_size = parameters['disk_size']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_driver.disk_resize(pool_name, disk_name, disk_size)

    @token_check
    def rbd_growfs(self, token, parameters):

        try:
            image_name = parameters['image_name']
        except Exception, e:
            log.error('parameters error, parameters=%s, reason=%s'
                      % (parameters, e))
            return request_result(101)

        return self.ceph_driver.disk_growfs(image_name)

    def ceph_manager(self, dict_data):

        try:
            api = dict_data['api']
            token = dict_data['token']
            parameters = dict_data['parameters']
        except Exception, e:
            log.error('parameters error: %s' % (e))
            return request_result(101)

        try:
            fun = {
                "drv_ceh_dsk_crt": self.disk_create,
                "drv_ceh_dsk_del": self.disk_delete,
                "drv_ceh_dsk_rsz": self.disk_resize,
                "drv_ceh_dsk_gow": self.rbd_growfs
            }

            return fun[api](token, parameters)
        except Exception, e:
            log.error('RPC API routing error: %s' % (e))
            return request_result(102)
