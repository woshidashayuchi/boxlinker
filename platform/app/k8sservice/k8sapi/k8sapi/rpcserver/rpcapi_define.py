# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)

from common.logs import logging as log
from common.acl import acl_check
from common.code import request_result
from common.parameters import parameter_check
from manager.create_manager import CreateManager
from manager.query_manager import QueryManager
from manager.delete_manager import DeleteManager
from manager.update_manager import UpdateManager


class KubernetesRpcAPI(object):

    def __init__(self):
        self.create_manager = CreateManager()
        self.query_manager = QueryManager()
        self.delete_manager = DeleteManager()
        self.update_manager = UpdateManager()

    @acl_check
    def service_create(self, context, parameters):
        log.info('rpc server get the data is : %s' % parameters)
        try:
            parameter_check(parameters.get('token'), ptype='pstr')
            # parameter_check(parameters.get('service_name'), ptype='pnam')
            parameter_check(parameters.get('image_id'), ptype='pimgid')
            parameter_check(parameters.get('policy'), ptype='choice')
            parameter_check(parameters.get('pods_num'), ptype='pod_num')
            parameter_check(parameters.get('auto_startup'), ptype='choice')
            # parameter_check(parameters.get('command'), ptype='command', exist='no')
            if '_' in parameters.get('service_name'):
                raise Exception('service_name can not have _')
            if int(parameters.get('container_cpu')) not in [1, 2, 4, 8]:
                raise Exception('container_cpu parameters error')
            if parameters.get('container_memory') not in ['256M', '512M', '1G', '2G']:
                raise Exception('container_memory parameters error')
            if parameters.get('cm_format').lower() not in ['1x', '2x', '4x', '8x']:
                raise Exception('cm_format parameters error')

            for i in parameters.get('container'):
                parameter_check(i.get('container_port'), ptype='container_port')
                if i.get('protocol') not in ['TCP', 'HTTP']:
                    raise Exception('protocol parameters error')
                if i.get('access_mode') not in ['TCP', 'HTTP', '']:
                    raise Exception('access_mode parameters error')
                if i.get('access_scope') not in ['inside', 'outsisde']:
                    raise Exception('access_scope parameters error')

            if parameters.get('volume') is not None and parameters.get('volume') != '':
                disk_path = []
                for j in parameters.get('volume'):
                    parameter_check(j.get('volume_uuid'), ptype='puid')
                    if j.get('readonly') not in ['True', 'False']:
                        raise Exception('volume_uuid parameter error')
                    if j.get('disk_path') is None:
                        raise Exception('disk path parameter error')
                    disk_path.append(j.get('disk_path'))
                if len(disk_path) != len(set(disk_path)):
                    raise Exception('disk path can not be same')

            if parameters.get('env') is not None and parameters.get('env') != '':
                for q in parameters.get('env'):
                    if q.get('env_key') is None or q.get('env_value') is None:
                        raise Exception('env parameter error')

        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s' % (context, parameters, e))
            return request_result(101)

        token = parameters.get('token')
        cost = parameters.get('cost')

        return self.create_manager.service_create(token, parameters, cost)

    @acl_check
    def service_query(self, context, parameters):
        try:
            ret = self.query_manager.service_list(parameters)
            log.info('get the service list result is: %s, type is: %s' % (ret, type(ret)))
            return ret
        except Exception, e:
            log.error('get the service list error, reason is: %s' % e)
            return request_result(404)

    @acl_check
    def service_detail(self, context, parameters):
        try:
            parameter_check(parameters.get('service_uuid'), ptype='puid')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s' % (context, parameters, e))
            return request_result(101)

        return self.query_manager.service_detail(parameters)

    @acl_check
    def service_delete(self, context, parameters):
        try:
            parameter_check(parameters.get('token'), ptype='pstr')
            parameter_check(parameters.get('service_uuid'), ptype='puid')
        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s' % (context, parameters, e))
            return request_result(101)

        return self.delete_manager.service_delete(parameters)

    @acl_check
    def service_update(self, context, parameters):
        try:
            rtype = parameters.get('rtype')
            parameter_check(parameters.get('token'), ptype='pstr')
            parameter_check(parameters.get('service_uuid'), ptype='puid')

            if rtype not in ['env', 'volume', 'container', 'status', 'telescopic',
                             'policy', 'command', 'domain', 'identify', 'cm', 'description']:
                raise Exception('rtype error, not have this resource type')

            if rtype == 'env' and parameters.get('env') is not None and parameters.get('env') != '':

                for q in parameters.get('env'):
                    if q.get('env_key') is None or q.get('env_value') is None:
                        raise Exception('env parameter error')

            if rtype == 'volume' and parameters.get('volume') is not None and parameters.get('volume') != '':
                disk_path = []
                for j in parameters.get('volume'):
                    parameter_check(j.get('volume_uuid'), ptype='puid')
                    if j.get('readonly') not in ['True', 'False']:
                        raise Exception('volume_uuid parameter error')
                    if j.get('disk_path') is None:
                        raise Exception('disk path parameter error')
                    disk_path.append(j.get('disk_path'))
                if len(disk_path) != len(set(disk_path)):
                    raise Exception('disk path can not be same')

            if rtype == 'container':
                for i in parameters.get('container'):
                    parameter_check(i.get('container_port'), ptype='container_port')
                    if i.get('protocol') not in ['TCP', 'HTTP']:
                        raise Exception('protocol parameters error')
                    if i.get('access_mode') not in ['TCP', 'HTTP', '']:
                        raise Exception('access_mode parameters error')
                    if i.get('access_scope') not in ['inside', 'outsisde']:
                        raise Exception('access_scope parameters error')
            if rtype == 'telescopic':
                parameter_check(parameters.get('pods_num'), ptype='pod_num')

            if rtype == 'policy':
                parameter_check(parameters.get('policy'), ptype='choice')
                if parameters.get('policy') == 0:
                    parameter_check(parameters.get('image_id'), ptype='pimgid')

            # if rtype == 'command':
            #     parameter_check(parameters.get('command'), ptype='command', exist='no')

            if rtype == 'domain' and parameters.get('domain') is not None and parameters.get('domain') != '':
                parameter_check(parameters.get('domain'), ptype='domain', exist='no')

            if rtype == 'identify':
                if (parameters.get('domain') is None or parameters.get('domain') == '') or (parameters.get('identify')
                   is None or parameters.get('identify') == '') or (str(parameters.get('identify')) not in ['0', '1']):
                    raise Exception('identify parameter error')

            if rtype == 'cm':
                try:
                    if int(parameters.get('container_cpu')) not in [1, 2, 4, 8]:
                        raise Exception('container_cpu parameters error')
                    if parameters.get('container_memory') not in ['256M', '512M', '1G', '2G']:
                        raise Exception('container_memory parameters error')
                    if parameters.get('cm_format').lower() not in ['1x', '2x', '4x', '8x']:
                        raise Exception('cm_format parameters error')
                except Exception, e:
                    log.error('parameters explain error, reason is: %s' % e)
                    raise Exception('cm parameter error')

        except Exception, e:
            log.error('parameters error, context=%s, parameters=%s, reason=%s' % (context, parameters, e))
            return request_result(101)

        return self.update_manager.service_update(parameters)

    @acl_check
    def pods_message(self, context, parameters):
        return self.query_manager.pod_message(parameters)

    def pod_status(self, parameters):
        return self.update_manager.pods_status(parameters)

    def check_name_if_use(self, context, parameters):
        log.info('check the name use or not , the data is: %s' % context)
        return self.query_manager.check_name_use_or_not(context)
