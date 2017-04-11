# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/31 下午6:10

from common.logs import logging as log
from common.code import request_result
from common.limit import limit_check
from db.service_db import ServiceDB
from driver.recover_driver import RecoverDriver
import requests


class RecoverManager(object):
    def __init__(self):
        self.recover_driver = RecoverDriver()
        self.service_db = ServiceDB()

    def recover_manager(self):
        try:
            self.recover_driver.update_services()
        except Exception, e:
            log.error('recover error, reason is: %s' % e)

    def service_list(self, parameters):
        project_uuid = parameters.get('project_uuid')

        try:
            ret = self.recover_driver.get_recycle_services(project_uuid)
            return request_result(0, ret)
        except Exception, e:
            log.error('get the recover services error, reason is: %s' % e)
            raise Exception(e)

    def elements_explain(self, context):
        log.info('apps data is: %s' % context)
        metal = []
        kuber = []
        try:
            db_data = self.service_db.service_regain(context)
            log.info(db_data)
        except Exception, e:
            log.error('get the service data from database error, reason is: %s' % e)
            raise Exception(e)
        try:
            if len(db_data) == 0 or len(db_data[0]) == 0:
                return request_result(0, 'ok')
            else:
                for i in db_data:
                    to_kube = {'service_name': i[0],
                               'service_uuid': i[1],
                               'pods_num': i[2],
                               'image_id': i[3],
                               'cm_format': i[4],
                               'container_cpu': i[5],
                               'container_memory': i[6],
                               'policy': i[7],
                               'auto_startup': i[8],
                               'command': i[9],
                               'container': [{'container_port': i[10], 'protocol': i[11], 'access_mode': i[12],
                                              'access_scope': i[13], 'tcp_port': i[14], 'private_domain': i[15],
                                              'identify': i[16]}],
                               'env': [{'env_key': i[17], 'env_value': i[18]}],
                               'volume': [{'volume_uuid': i[19], 'disk_path': i[20], 'readonly': i[21]}]
                               }

                    metal.append(to_kube)

                for x in metal:
                    if len(kuber) == 0:
                        kuber.append(x)
                    else:
                        for y in kuber:
                            if y.get('service_uuid') == x.get('service_uuid'):
                                kuber[kuber.index(y)]['env'] = y.get('env') + x.get('env')
                                kuber[kuber.index(y)]['volume'] = y.get('volume') + x.get('volume')
                            else:
                                kuber.append(x)

                for j in kuber:

                    for m in j.get('env'):
                        index_m = j.get('env').index(m)

                        if m.get('env_key') in ['null', 'NULL', 'None', ''] or m.get('env_key') is None:
                            del kuber[kuber.index(j)]['env'][index_m]

                        if len(j.get('env')) == 1 and (m.get('env_key') in ['null', 'NULL', 'None', ''] or m.get('env_key') is None):
                            kuber[kuber.index(j)]['env'] = ''

                    for n in j.get('volume'):
                        index_n = j.get('volume').index(n)

                        if n.get('volume_uuid') in ['null', 'NULL', 'None', ''] or n.get('volume_uuid') is None:
                            del kuber[kuber.index(j)]['volume'][index_n]

                        if len(j.get('volume')) == 1 and (n.get('volume_uuid') in ['null', 'NULL', 'None', ''] or n.get('volume_uuid')
                                                          is None):
                            kuber[kuber.index(j)]['volume'] = ''

                return kuber
        except Exception, e:
            log.error('explain the main data error, reason is: %s' % e)
            raise Exception('explain the main data error')

    @limit_check('services')
    def create_apps(self, token, context, cost):
        try:
            to_kuber = self.elements_explain(context)
        except Exception, e:
            log.error('use the elements_explain error, reason is: %s' % e)
            return request_result(404)

        for i in to_kuber:
            log.info('xxxxxxxxxxx*****:%s' % i)
            i['token'] = token
            i['rtype'] = 'lifecycle'
            service_uuid = i.get('service_uuid')
            try:
                self.recover_driver.create_service(i)
            except Exception, e:
                log.error('create services error, reason is: %s' % e)
                return request_result(501)

            try:
                db_ret = self.service_db.update_lifecycle(service_uuid)
                if db_ret is not None:
                    log.info('UPDATE THE DATABASE ERROR')
                    return request_result(403)
            except Exception, e:
                log.error('update the database error, reason is: %s' % e)
                return request_result(403)

        return request_result(0, 'recovering...')

    def physics_del(self, service_uuid):

        try:
            ret = self.recover_driver.delete_py(service_uuid)
        except Exception, e:
            log.error('delete the database error, reason is: %s' % e)
            return request_result(402)

        return ret

    def delete_in30_days(self):
        try:
            db_ret = self.service_db.delete_30days()
            if db_ret is None:
                raise Exception('db result is not zero')
        except Exception, e:
            log.error('delete the recover services in 30 days error, reason is: %s' % e)
            raise Exception('delete the recover services in 30 days error')
