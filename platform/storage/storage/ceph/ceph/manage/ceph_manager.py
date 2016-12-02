#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from common.logs import logging as log
from common.shellexec import execute
from common.code import request_result

from ceph.drive.ceph_driver import CephDriver


class CephManager(object):

    def __init__(self):

        self.ceph_driver = CephDriver()

    def disk_create(self, pool_name, disk_name, disk_size):

        return self.ceph_driver.disk_create(pool_name, disk_name, disk_size)

    def disk_delete(self, pool_name, disk_name):

        return self.ceph_driver.disk_delete(pool_name, disk_name)

    def disk_resize(self, pool_name, disk_name, disk_size):

        return self.ceph_driver.disk_resize(pool_name, disk_name, disk_size)

    def disk_growfs(self, image_name):

        return self.ceph_driver.disk_growfs(image_name)
