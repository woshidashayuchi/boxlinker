#!/usr/bin/env python
#-*- coding: utf-8 -*-

import sys
import re

from common.logs import logging as log
from common.auth_manager import user_auth
from common.lock_manager import distributed_lock
from common.result_manager import result_info

from storage.common.storage_base import CephInit


class PoolManager(CephInit):

    def pool_create(self, dict_data):

        try:
            user_info = dict_data['user']
            parameters = dict_data['parameters']

            user_token = user_info[0]
            user_name = user_info[1]
            user_role = user_info[2]
            user_orag = user_info[3]
            user_ip = user_info[4]

            pool_type = parameters[0]
        except Exception, e:
            log.warning('parameters error: %s' %(e))
            return 'parameters error'


        @result_info(user_name, user_ip, '创建ceph存储池', pool_type)
        @user_auth(user_token, user_name, user_role, user_orag, 'stg_ceh_pol_cte', 'api')
        @distributed_lock('stg_ceh_pol_cte', 'api')
        def ceph_pool_create(pool_type):

            if (pool_type != 'hdd') and (pool_type != 'ssd'):
                log.warning('创建ceph存储池参数错误')
                return '参数错误'

            pool_check = self.ceph_driver.pool_check(pool_type)
            if pool_check != '0':
                log.info('%s类型的存储池已存在，无需再次创建' %(pool_type))
                return '%s类型的存储池已存在，无需再次创建' %(pool_type)

            osd_check = self.ceph_db.osd_check(pool_type)
            if osd_check < 2:
                if pool_type == 'hdd':
                    log.warning('机械硬盘osd节点不足，无法创建机械硬盘池')
                    return '机械硬盘osd节点不足，无法创建机械硬盘池'
                elif pool_type == 'ssd':
                    log.warning('固态硬盘osd节点不足，无法创建固态硬盘池')
                    return '固态硬盘osd节点不足，无法创建固态硬盘池'

            if pool_type == 'hdd':
                pool_create = self.ceph_driver.pool_hdd_create()
                if pool_create != '0':
                    log.error('机械硬盘池创建失败')
                    return '机械硬盘池创建失败'

            elif pool_type == 'ssd':
                pool_create = self.ceph_driver.pool_ssd_create()
                if not pool_create:
                    log.error('固态硬盘池创建失败')
                    return '固态硬盘池创建失败'

            pool_info = self.ceph_driver.pool_info_get()
            pool_info = re.split(' ', pool_info)

            pool_size = pool_info[0]
            avail = pool_info[1]
            used = pool_info[2]
            used_rate = pool_info[3]

            pool_name = 'vmdisk_' + pool_type

            pool_info_create = self.ceph_db.pool_info_create(pool_name, pool_size, used, avail, used_rate, pool_type)
            if not pool_info_create:
                log.error('ceph存储池信息写入数据库失败')
                return 'ceph存储池信息写入数据库失败'

            return 'ceph存储池创建完成'

        return ceph_pool_create(pool_type)


    def pool_update(self):
        pool_info = self.ceph_driver.pool_info_get()
        pool_info = re.split(' ', pool_info)

        pool_size = pool_info[0]
        avail = pool_info[1]
        used = pool_info[2]
        used_rate = pool_info[3]

        self.ceph_db.pool_info_update(pool_size, used, avail, used_rate)

