#!/usr/bin/env python
#-*- coding: utf-8 -*-

import sys

reload(sys)
sys.setdefaultencoding('utf-8')

from common.logs import logging as log
from common.auth_manager import user_auth
from common.lock_manager import distributed_lock
from common.result_manager import result_info

from storage.common.storage_base import CephInit


class OsdManager(CephInit):

    def osd_add(self, dict_data):

        try:
            user_info = dict_data['user']
            parameters = dict_data['parameters']

            user_token = user_info[0]
            user_name = user_info[1]
            user_role = user_info[2]
            user_orag = user_info[3]
            user_ip = user_info[4]

            host_ip = parameters[0]
            password = parameters[1]
            jour_disk = parameters[2]
            data_disk = parameters[3]
            disk_type = parameters[4]
            weight = parameters[5]
            storage_nic = parameters[6]
        except Exception, e:
            log.warning('parameters error: %s' %(e))
            return 'parameters error'


        @result_info(user_name, user_ip, '添加ceph存储osd节点', 'ceph_osd')
        @user_auth(user_token, user_name, user_role, user_orag, 'stg_ceh_osd_add', 'api')
        @distributed_lock('stg_ceh_osd_add', 'api')
        def ceph_osd_add(host_ip, rootpwd, jour_disk, data_disk, disk_type, weight, storage_nic):

            host_ping_check = self.ceph_driver.host_ping_check(host_ip)
            if host_ping_check == '0':
                log.warning('主机IP(%s)无法连接' %(host_ip))
                return '主机IP(%s)无法连接' %(host_ip)

            host_ssh_conf = self.ceph_driver.host_ssh_conf(host_ip, rootpwd)
            if host_ssh_conf == '2':
                log.warning('osd节点(%s)密码错误' %(host_ip))
                return 'osd节点(%s)密码错误' %(host_ip)

            host_name = self.ceph_driver.remote_host_name(host_ip)
            if not host_name:
                log.error('无法获取节点(%s)主机名' %(host_ip))
                return '无法获取节点(%s)主机名' %(host_ip)

            jour_disk_check = self.ceph_driver.disk_use_check(host_ip, jour_disk)
            if jour_disk_check != '0':
                log.warning('主机%s磁盘分区%s已被使用' %(host_name, jour_disk))
                return '主机%s磁盘分区%s已被使用' %(host_name, jour_disk)

            data_disk_check = self.ceph_driver.disk_use_check(host_ip, data_disk)
            if data_disk_check != '0':
                log.warning('主机%s磁盘分区%s已被使用' %(host_name, data_disk))
                return '主机%s磁盘分区%s已被使用' %(host_name, data_disk)

            mon_num = self.ceph_db.mon_count()
            local_mon_num = self.ceph_driver.mon_count()
            if (str(mon_num) != str(local_mon_num)):
                mon_info = self.ceph_db.mon_list()
                for mon_list in mon_info:
                    ceph_fsid = mon_list[0]
                    ceph_mon_id = mon_list[1]
                    mon_host_name = mon_list[2]
                    mon_storage_ip = mon_list[3]

                    self.ceph_driver.mon_conf_init(ceph_mon_id[-1], mon_host_name, mon_storage_ip, ceph_fsid)

            osd_id = self.ceph_driver.osd_id_create()
            self.ceph_driver.osd_conf_del(osd_id)
            self.ceph_driver.osd_conf_add(host_name, data_disk, osd_id)

            osd_conf_dist = self.ceph_driver.conf_dist(host_ip)
            if osd_conf_dist != '0':
                log.error('osd节点(主机名：%s,IP：%s)ceph配置文件分发失败' %(host_name, host_ip))

            ntp_ip = self.ceph_db.network_ip()
            ntp_ip01 = ntp_ip[0][0]
            try:
                ntp_ip02 = ntp_ip[1][0]
                osd_add = self.ceph_driver.osd_add(host_ip, jour_disk, data_disk, disk_type, osd_id, weight, ntp_ip01, ntp_ip02)
            except Exception:
                osd_add = self.ceph_driver.osd_add(host_ip, jour_disk, data_disk, disk_type, osd_id, weight, ntp_ip01)

            if osd_add != '0':
                self.ceph_driver.osd_out(osd_id)
                self.ceph_driver.osd_stop(host_ip, osd_id)
                self.ceph_driver.osd_crush_out(osd_id)
                self.ceph_driver.osd_host_del(host_ip, osd_id)
                self.ceph_driver.osd_conf_del(osd_id)

                log.error('主机%s添加osd节点失败' %(host_name))
                return '主机%s添加osd节点失败' %(host_name)

            nic_mac = self.ceph_driver.nic_mac(host_ip, storage_nic)

            control_host_name = self.ceph_driver.local_host_name()
            self.ceph_driver.host_ssh_del(host_ip, control_host_name)

            osd_id_check = self.ceph_db.osd_id_check(osd_id)
            if osd_id_check == 0:
                osd_create = self.ceph_db.osd_create(osd_id, weight, host_name, host_ip, disk_type)
                if not osd_create:
                    log.error('添加osd节点(%s)数据库写入失败' %(osd_id))
                    return '添加osd节点(%s)数据库写入失败' %(osd_id)
            else:
                osd_update = self.ceph_db.osd_update(osd_id, host_name, host_ip, disk_type)
                if not osd_update:
                    log.error('添加osd节点(%s)数据库更新失败' %(osd_id))
                    return '添加osd节点(%s)数据库更新失败' %(osd_id)

            storage_nic_check = self.ceph_db.storage_nic_check(host_name)
            if storage_nic_check == 0:
                self.ceph_db.storage_nic_create(host_name, storage_nic, nic_mac)
            else:
                self.ceph_db.storage_nic_update(host_name, storage_nic, nic_mac)

            return 'osd节点添加完成'

        return ceph_osd_add(host_ip, password, jour_disk, data_disk, disk_type, weight, storage_nic)


    def osd_del(self, dict_data):

        try:
            user_info = dict_data['user']
            parameters = dict_data['parameters']

            user_token = user_info[0]
            user_name = user_info[1]
            user_role = user_info[2]
            user_orag = user_info[3]
            user_ip = user_info[4]

            osd_id = parameters[0]
            password = parameters[1]
        except Exception, e:
            log.warning('parameters error: %s' %(e))
            return 'parameters error'


        @result_info(user_name, user_ip, '移除ceph存储osd节点', 'ceph_osd')
        @user_auth(user_token, user_name, user_role, user_orag, 'stg_ceh_osd_del', 'api')
        @distributed_lock('stg_ceh_osd_del', 'api')
        def ceph_osd_del(osd_id, rootpwd, source_ip, user):

            pool_check = self.ceph_driver.pool_disk_check()
            if pool_check != '0':
                pool_status_check = self.ceph_driver.pool_status_check()
                if pool_status_check == '0':
                    log.warning('ceph存储状态异常，不允许执行osd节点移除操作。操作用户：%s, 源IP: %s' %(user, source_ip))
                    return 'ceph状态异常，不允许执行osd节点移除操作。'

                pool_used = self.ceph_driver.pool_used()
                if pool_used >= self.ceph_warn:
                    log.warning('ceph存储池可用容量不足，不允许执行osd节点移除操作。操作用户：%s, 源IP: %s' %(user, source_ip))
                    return 'ceph存储池可用容量不足，不允许执行osd节点移除操作。'

            osd_out = self.ceph_driver.osd_out(osd_id)
            if osd_out != '0':
                log.error('将osd(%s)移出ceph存储失败' %(osd_id))
                return '将osd(%s)移出ceph存储失败' %(osd_id)

            host_ip = self.ceph_db.host_ip(osd_id)
            host_ping_check = self.ceph_driver.host_ping_check(host_ip)
            if host_ping_check != '0':
                host_ssh_conf = self.ceph_driver.host_ssh_conf(host_ip, rootpwd)
                if host_ssh_conf == '2':
                    self.ceph_driver.osd_in(osd_id)
                    log.warning('主机(%s)密码错误' %(host_ip))
                    return '主机(%s)密码错误' %(host_ip)

                osd_stop = self.ceph_driver.osd_stop(host_ip, osd_id)
                if osd_stop != '0':
                    self.ceph_driver.osd_in(osd_id)
                    log.error('无法停止存储节点(IP:%s)上osd(%s)服务' %(host_ip, osd_id))
                    return '无法停止移除的osd服务，请注意检查原因'

            osd_crush_out = self.ceph_driver.osd_crush_out(osd_id)
            if not osd_crush_out:
                log.error('将osd(%s)移出ceph存储CRUSH map失败' %(osd_id))
                return '将osd(%s)移出ceph存储CRUSH map失败' %(osd_id)

            self.ceph_driver.osd_conf_del(osd_id)

            if host_ping_check != '0':
                osd_host_del = self.ceph_driver.osd_host_del(host_ip, osd_id)
                if osd_host_del != '0':
                    log.error('无法清除osd(%s)挂载信息和目录' %(osd_id))
                    return '无法清除osd挂载信息和目录'

                control_host_name = self.ceph_driver.local_host_name()
                self.ceph_driver.host_ssh_del(host_ip, control_host_name)

            osd_delete = self.ceph_db.osd_delete(osd_id)
            if not osd_delete:
                log.error('移除osd节点(%s)更新数据库失败' %(osd_id))
                return '移除osd节点(%s)更新数据库失败' %(osd_id)

            log.info('ceph存储节点osd.%s已成功移除, 操作用户：%s, 源IP: %s' %(osd_id, user, source_ip))

            return 'ceph存储节点osd.%s已成功移除' %(osd_id)

        return ceph_osd_del(osd_id, password, user_ip, user_name)


    def osd_reweight(self, dict_data):

        try:
            user_info = dict_data['user']
            parameters = dict_data['parameters']

            user_token = user_info[0]
            user_name = user_info[1]
            user_role = user_info[2]
            user_orag = user_info[3]
            user_ip = user_info[4]

            osd_id = parameters[0]
            weight = parameters[1]
        except Exception, e:
            log.warning('parameters error: %s' %(e))
            return 'parameters error'


        @result_info(user_name, user_ip, '调整ceph存储osd节点权重', 'ceph_osd')
        @user_auth(user_token, user_name, user_role, user_orag, 'stg_ceh_osd_rwt', 'api')
        @distributed_lock('stg_ceh_osd_rwt', 'api')
        def ceph_osd_reweight(osd_id, weight):

            osd_rewt = self.ceph_driver.osd_reweight(osd_id, weight)
            if osd_rewt != '0':
                log.error('调整ceph存储osd节点(osd.%s)权重失败' %(str(osd_id)))
                return 'osd节点权重调整失败'
            else:
                self.ceph_db.osd_weight(osd_id, weight)
                log.info('调整ceph存储osd节点(osd.%s)权重完成' %(str(osd_id)))
                return 'osd节点权重调整完成'

        return ceph_osd_reweight(osd_id, weight)

