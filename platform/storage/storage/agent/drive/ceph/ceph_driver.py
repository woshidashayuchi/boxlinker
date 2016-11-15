#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from common.logs import logging as log
from common.shellexec import execute
from common.code import request_result


class CephDriver(object):

    def disk_create(self, pool_name, disk_name, disk_size):

        result = execute(
                 "rbd create "+pool_name+"/"+disk_name+" --image-format 2 --size "+disk_size+"",
                 shell=True, run_as_root=True)[1]
        if str(result) != '0':
            log.error('Ceph disk(%s) create failure' % (disk_name))
            return request_result(511)
        else:
            return request_result(0)

    def disk_delete(self, pool_name, disk_name):

        result = execute(
                 "rbd rm "+pool_name+"/"+disk_name+"",
                 shell=True, run_as_root=True)[1]
        if str(result) != '0':
            log.error('Ceph disk(%s) delete failure' % (disk_name))
            return request_result(512)
        else:
            return request_result(0)

    def disk_resize(self, pool_name, disk_name, disk_size):

        result = execute(
                 "rbd resize --size "+disk_size+" "+pool_name+"/"+disk_name+"",
                 shell=True, run_as_root=True)[1]
        if str(result) != '0':
            log.error('Ceph disk(%s) resize failure' % (disk_name))
            return request_result(513)
        else:
            return request_result(0)

    def disk_growfs(self, image_name):

        dev_name = execute(
                   "df -h | grep "+image_name+" | awk '{print $1}'",
                   shell=True, run_as_root=True)[0][0].strip('\n')
        if dev_name:
            result = execute(
                    "xfs_growfs "+dev_name+"",
                    shell=True, run_as_root=True)[1]
            if str(result) != '0':
                log.error('Ceph disk(%s) growfs failure' % (disk_name))
                return request_result(513)
            else:
                return request_result(0)

        return
