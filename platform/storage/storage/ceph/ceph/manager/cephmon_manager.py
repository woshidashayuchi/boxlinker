#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import uuid

from time import sleep

from common.logs import logging as log
from common.code import request_result
from ceph.driver import ceph_driver


class CephMonManager(object):

    def __init__(self):

        self.ceph_driver = ceph_driver.CephDriver()

    def cephmon_init(self, cluster_info,
                     mon01_hostip, mon01_rootpwd, mon01_snic,
                     mon02_hostip, mon02_rootpwd, mon02_snic):

        host_ssh_conf = self.ceph_driver.host_ssh_conf(
                             mon01_hostip, mon01_rootpwd)
        if host_ssh_conf != 0:
            if host_ssh_conf == 1:
                log.warning('mon节点(%s)密码错误' % (mon01_hostip))
                return request_result(523)
            elif host_ssh_conf == 2:
                log.warning('mon节点(%s)连接超时' % (mon01_hostip))
                return request_result(522)
            else:
                log.warning('mon节点(%s)连接错误' % (mon01_hostip))
                return request_result(601)

        host_ssh_conf = self.ceph_driver.host_ssh_conf(
                             mon02_hostip, mon02_rootpwd)
        if host_ssh_conf != 0:
            if host_ssh_conf == 1:
                log.warning('mon节点(%s)密码错误' % (mon01_hostip))
                return request_result(523)
            elif host_ssh_conf == 2:
                log.warning('mon节点(%s)连接超时' % (mon01_hostip))
                return request_result(522)
            else:
                log.warning('mon节点(%s)连接错误' % (mon01_hostip))
                return request_result(601)

        mon01_hostname = self.ceph_driver.remote_host_name(mon01_hostip)
        if not mon01_hostname:
            log.error('无法获取节点(%s)主机名' % (mon01_hostip))
            return request_result(524)

        mon02_hostname = self.ceph_driver.remote_host_name(mon02_hostip)
        if not mon02_hostname:
            log.error('无法获取节点(%s)主机名' % (mon02_hostip))
            return request_result(524)

        mon01_storage_ip = self.ceph_driver.storage_ip(
                                mon01_hostip, mon01_snic)
        if not mon01_storage_ip:
            log.error('无法获取节点(%s)存储IP' % (mon01_hostip))
            return request_result(524)

        mon02_storage_ip = self.ceph_driver.storage_ip(
                                mon02_hostip, mon02_snic)
        if not mon02_storage_ip:
            log.error('无法获取节点(%s)存储IP' % (mon02_hostip))
            return request_result(524)

        if cluster_info:
            cluster_uuid = cluster_info[0][0]
            cluster_name = cluster_info[0][1]
            cluster_auth = cluster_info[0][2]
            service_auth = cluster_info[0][3]
            client_auth = cluster_info[0][4]
            ceph_pgnum = cluster_info[0][5]
            ceph_pgpnum = cluster_info[0][6]
            public_network = cluster_info[0][7]
            cluster_network = cluster_info[0][8]
            osd_full_ratio = cluster_info[0][9]
            osd_nearfull_ratio = cluster_info[0][10]
            journal_size = cluster_info[0][11]
        else:
            cluster_uuid = str(uuid.uuid4())
            cluster_auth = 'none'
            service_auth = 'none'
            client_auth = 'none'
            ceph_pgnum = 300
            ceph_pgpnum = 300
            public_network = '192.168.1.0/24'
            cluster_network = '10.10.1.0/24'
            osd_full_ratio = '.85'
            osd_nearfull_ratio = '.70'
            journal_size = 5000

        self.ceph_driver.ceph_conf_init(
             cluster_uuid, cluster_auth, service_auth, client_auth,
             ceph_pgnum, ceph_pgpnum, public_network, cluster_network,
             osd_full_ratio, osd_nearfull_ratio, journal_size)

        self.ceph_driver.mon_conf_update(
             cluster_uuid, '1', mon01_hostname, mon01_storage_ip)
        self.ceph_driver.mon_conf_update(
             cluster_uuid, '2', mon02_hostname, mon02_storage_ip)

        mon01_conf_dist = self.ceph_driver.conf_dist(
                               cluster_uuid, mon01_hostip)
        if int(mon01_conf_dist) != 0:
            log.error('mon节点(主机名:%s, IP:%s)ceph配置文件分发失败'
                      % (mon01_hostname, mon01_hostip))
            return request_result(525)

        mon02_conf_dist = self.ceph_driver.conf_dist(
                               cluster_uuid, mon02_hostip)
        if int(mon02_conf_dist) != 0:
            log.error('mon节点(主机名:%s, IP:%s)ceph配置文件分发失败'
                      % (mon02_hostname, mon02_hostip))
            return request_result(525)

        monmap_init = self.ceph_driver.monmap_init(
                           mon01_hostname, mon01_storage_ip,
                           mon02_hostname, mon02_storage_ip,
                           mon01_hostip, mon02_hostip, cluster_uuid)
        if int(monmap_init) != 0:
            log.error('Ceph monmap init failure')
            return request_result(526)

        mon01_init = self.ceph_driver.mon_host_init(
                          mon01_hostname, mon01_hostip)
        if int(mon01_init) != 0:
            log.error('mon节点(主机名：%s,IP：%s)初始化失败'
                      % (mon01_hostname, mon01_hostip))
            return request_result(526)

        mon02_init = self.ceph_driver.mon_host_init(
                          mon02_hostname, mon02_hostip)
        if int(mon02_init) != 0:
            log.error('mon节点(主机名：%s,IP：%s)初始化失败'
                      % (mon02_hostname, mon02_hostip))
            return request_result(526)

        sleep(2)

        crush_ssd_add = self.ceph_driver.crush_ssd_add()
        if int(crush_ssd_add) != 0:
            log.error('创建ssd bucket失败')
            return request_result(526)

        control_host_name = self.ceph_driver.local_host_name()
        self.ceph_driver.host_ssh_del(mon01_hostip, control_host_name)
        self.ceph_driver.host_ssh_del(mon02_hostip, control_host_name)

        result = {
                     "mon01_hostip": mon01_hostip,
                     "mon02_hostip": mon02_hostip,
                     "mon01_hostname": mon01_hostname,
                     "mon02_hostname": mon02_hostname,
                     "cluster_uuid": cluster_uuid,
                     "mon01_storage_ip": mon01_storage_ip,
                     "mon02_storage_ip": mon02_storage_ip
                 }

        return request_result(0, result)

    def cephmon_add(self, cluster_info, mon_id,
                    host_ip, rootpwd, storage_nic,
                    mon_list):

        host_ssh_conf = self.ceph_driver.host_ssh_conf(
                             host_ip, rootpwd)
        if host_ssh_conf != 0:
            if host_ssh_conf == 1:
                log.warning('mon节点(%s)密码错误' % (mon01_hostip))
                return request_result(523)
            elif host_ssh_conf == 2:
                log.warning('mon节点(%s)连接超时' % (mon01_hostip))
                return request_result(522)
            else:
                log.warning('mon节点(%s)连接错误' % (mon01_hostip))
                return request_result(601)

        host_name = self.ceph_driver.remote_host_name(host_ip)
        if not host_name:
            log.error('无法获取节点(%s)主机名' % (host_ip))
            return request_result(524)

        storage_ip = self.ceph_driver.storage_ip(
                          host_ip, storage_nic)
        if not storage_ip:
            log.error('无法获取节点(%s)存储IP' % (host_ip))
            return request_result(524)

        if cluster_info:
            cluster_uuid = cluster_info[0][0]
            cluster_name = cluster_info[0][1]
            cluster_auth = cluster_info[0][2]
            service_auth = cluster_info[0][3]
            client_auth = cluster_info[0][4]
            ceph_pgnum = cluster_info[0][5]
            ceph_pgpnum = cluster_info[0][6]
            public_network = cluster_info[0][7]
            cluster_network = cluster_info[0][8]
            osd_full_ratio = cluster_info[0][9]
            osd_nearfull_ratio = cluster_info[0][10]
            journal_size = cluster_info[0][11]
        else:
            log.warning('Ceph cluster info not exists')
            return request_result(528)

        if not self.ceph_driver.ceph_conf_check(cluster_uuid):
            self.ceph_driver.ceph_conf_init(
                 cluster_uuid, cluster_auth, service_auth, client_auth,
                 ceph_pgnum, ceph_pgpnum, public_network, cluster_network,
                 osd_full_ratio, osd_nearfull_ratio, journal_size)
            for mon_info in mon_list:
                ceph_mon_id = mon_info[0]
                mon_host_name = mon_info[1]
                mon_storage_ip = mon_info[2]

                self.ceph_driver.mon_conf_update(
                     cluster_uuid, ceph_mon_id[-1],
                     mon_host_name, mon_storage_ip)

        self.ceph_driver.mon_conf_update(
             cluster_uuid, mon_id[-1], host_name, storage_ip)

        mon_conf_dist = self.ceph_driver.conf_dist(cluster_uuid, host_ip)
        if int(mon_conf_dist) != 0:
            log.error('mon节点(主机名:%s, IP:%s)ceph配置文件分发失败'
                      % (host_name, host_ip))
            return request_result(525)

        mon_add = self.ceph_driver.mon_host_add(host_name, host_ip, storage_ip)
        if int(mon_add) != 0:
            log.error('mon节点(主机名：%s,IP：%s)添加失败'
                      % (host_name, host_ip))
            return request_result(526)

        control_host_name = self.ceph_driver.local_host_name()
        self.ceph_driver.host_ssh_del(host_ip, control_host_name)

        result = {
                     "host_ip": host_ip,
                     "host_name": host_name,
                     "cluster_uuid": cluster_uuid,
                     "storage_ip": storage_ip
                 }

        return request_result(0, result)
