# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

from conf import conf
from common.logs import logging as log
from common.code import request_result
from common.acl import acl_check
from common.parameters import parameter_check
from common.token_ucenterauth import token_auth

from storage.manager import cephcluster_manager
from storage.manager import cephmon_manager
from storage.manager import clouddisk_manager


class StorageRpcManager(object):

    def __init__(self):

        self.balancecheck = conf.balance_check
        self.cephcluster_manager = cephcluster_manager.CephClusterManager()
        self.cephmon_manager = cephmon_manager.CephMonManager()
        self.clouddisk_manager = clouddisk_manager.CloudDiskManager()

    @acl_check
    def cephcluster_create(self, context, parameters):

        try:
            token = context['token']
            source_ip = context.get('source_ip')

            cluster_name = parameters.get('cluster_name')
            cluster_auth = parameters.get('cluster_auth')
            service_auth = parameters.get('service_auth')
            client_auth = parameters.get('client_auth')
            ceph_pgnum = parameters.get('ceph_pgnum')
            ceph_pgpnum = parameters.get('ceph_pgpnum')
            public_network = parameters.get('public_network')
            cluster_network = parameters.get('cluster_network')
            osd_full_ratio = parameters.get('osd_full_ratio')
            osd_nearfull_ratio = parameters.get('osd_nearfull_ratio')
            journal_size = parameters.get('journal_size')

            source_ip = parameter_check(source_ip, ptype='pnip',
                                        exist='no')
            cluster_name = parameter_check(cluster_name, ptype='pnam')
            cluster_auth = parameter_check(cluster_auth, ptype='pnam',
                                           exist='no')
            service_auth = parameter_check(service_auth, ptype='pnam',
                                           exist='no')
            client_auth = parameter_check(client_auth, ptype='pnam',
                                          exist='no')
            ceph_pgnum = parameter_check(ceph_pgnum, ptype='pint',
                                         exist='no')
            ceph_pgpnum = parameter_check(ceph_pgpnum, ptype='pint',
                                          exist='no')
            public_network = parameter_check(public_network, ptype='pstr',
                                             exist='no')
            cluster_network = parameter_check(cluster_network, ptype='pstr',
                                              exist='no')
            osd_full_ratio = parameter_check(osd_full_ratio, ptype='pflt',
                                             exist='no')
            osd_nearfull_ratio = parameter_check(osd_nearfull_ratio, ptype='pflt',
                                                 exist='no')
            journal_size = parameter_check(journal_size, ptype='pint')
            if int(journal_size) < 1000:
                raise(Exception('Parameter cost error, '
                                'journal_size must greater than 1000'))
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.cephcluster_manager.cephcluster_create(
                    cluster_name, cluster_auth, service_auth,
                    client_auth, ceph_pgnum, ceph_pgpnum,
                    public_network, cluster_network,
                    osd_full_ratio, osd_nearfull_ratio, journal_size,
                    token=token, source_ip=source_ip,
                    resource_name=cluster_name)

    @acl_check
    def cephcluster_info(self, context, parameters):

        try:
            cluster_uuid = parameters.get('cluster_uuid')

            cluster_uuid = parameter_check(cluster_uuid, ptype='pstr')
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.cephcluster_manager.cephcluster_info(cluster_uuid)

    @acl_check
    def cephcluster_list(self, context, parameters):

        return self.cephcluster_manager.cephcluster_list()




    @acl_check
    def volume_create(self, context, parameters):

        try:
            token = context['token']
            source_ip = context.get('source_ip')
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            team_uuid = user_info.get('team_uuid')
            project_uuid = user_info.get('project_uuid')

            volume_name = parameters.get('volume_name')
            volume_size = parameters.get('volume_size')
            fs_type = parameters.get('fs_type')
            cost = parameters.get('cost')

            source_ip = parameter_check(source_ip, ptype='pnip', exist='no')
            volume_name = parameter_check(volume_name, ptype='pnam')
            volume_size = parameter_check(volume_size, ptype='pint')
            if self.balancecheck is True:
                cost = parameter_check(cost, ptype='pflt')
                if float(cost) < 0:
                    raise(Exception('Parameter cost error, '
                                    'cost must greater than 0'))
            else:
                cost = parameter_check(cost, ptype='pflt', exist='no')
            if (fs_type != 'xfs') and (fs_type != 'ext4'):
                raise
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.clouddisk_manager.volume_create(
                    team_uuid, project_uuid, user_uuid,
                    volume_name, volume_size, fs_type, cost,
                    token=token, source_ip=source_ip,
                    resource_name=volume_name)

    @acl_check
    def volume_delete(self, context, parameters):

        try:
            token = context['token']
            volume_uuid = context['resource_uuid']
            source_ip = context.get('source_ip')

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
            source_ip = parameter_check(source_ip, ptype='pnip', exist='no')
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.clouddisk_manager.volume_logical_delete(
                    volume_uuid, token=token, source_ip=source_ip,
                    resource_uuid=volume_uuid)

    @acl_check
    def volume_info(self, context, parameters):

        try:
            volume_uuid = context['resource_uuid']

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.clouddisk_manager.volume_info(volume_uuid)

    @acl_check
    def volume_list(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            team_uuid = user_info.get('team_uuid')
            team_priv = user_info.get('team_priv')
            project_uuid = user_info.get('project_uuid')
            project_priv = user_info.get('project_priv')

            page_size = parameters.get('page_size')
            page_num = parameters.get('page_num')

            page_size = parameter_check(page_size, ptype='pint')
            page_num = parameter_check(page_num, ptype='pint')
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.clouddisk_manager.volume_list(
                    user_uuid, team_uuid, team_priv,
                    project_uuid, project_priv,
                    page_size, page_num)

    @acl_check
    def volume_update(self, context, parameters):

        try:
            token = context['token']
            volume_uuid = context['resource_uuid']
            source_ip = context.get('source_ip')

            update = parameters.get('update')
            volume_size = parameters.get('volume_size')
            volume_status = parameters.get('volume_status')

            token = parameter_check(token, ptype='pstr')
            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
            source_ip = parameter_check(source_ip, ptype='pnip', exist='no')
            if update == 'size':
                volume_size = parameter_check(volume_size, ptype='pint')
            elif update == 'status':
                if (volume_status != 'using') and (volume_status != 'unused'):
                    raise
            else:
                raise
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.clouddisk_manager.volume_update(
                    volume_uuid, update, volume_size,
                    volume_status, token=token,
                    source_ip=source_ip, resource_uuid=volume_uuid)

    @acl_check
    def volume_reclaim_list(self, context, parameters):

        try:
            user_info = token_auth(context['token'])['result']
            user_uuid = user_info.get('user_uuid')
            team_uuid = user_info.get('team_uuid')
            team_priv = user_info.get('team_priv')
            project_uuid = user_info.get('project_uuid')
            project_priv = user_info.get('project_priv')

            page_size = parameters.get('page_size')
            page_num = parameters.get('page_num')

            page_size = parameter_check(page_size, ptype='pint')
            page_num = parameter_check(page_num, ptype='pint')
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.clouddisk_manager.volume_reclaim_list(
                    user_uuid, team_uuid, team_priv,
                    project_uuid, project_priv,
                    page_size, page_num)

    @acl_check
    def volume_reclaim_recovery(self, context, parameters):

        try:
            token = context['token']
            volume_uuid = context['resource_uuid']
            source_ip = context.get('source_ip')

            volume_uuid = parameter_check(volume_uuid, ptype='pstr')
            source_ip = parameter_check(source_ip, ptype='pnip', exist='no')
        except Exception, e:
            log.warning('parameters error, context=%s, '
                        'parameters=%s, reason=%s'
                        % (context, parameters, e))
            return request_result(101)

        return self.clouddisk_manager.volume_reclaim_recovery(
                    volume_uuid, token=token, source_ip=source_ip,
                    resource_uuid=volume_uuid)
