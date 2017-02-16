# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/15

from common.logs import logging as log
from common.db_operate import DbOperate
from common.code import request_result
from service_db import ServiceDB
import re


class MetalWork(object):

    def __init__(self):
        self.operate = DbOperate()
        self.service_db = ServiceDB()

    def query_service(self, dict_data):
        log.info('query the service data(in) is %s' % dict_data)

        service = []
        ret = []
        a = []
        b = []

        try:
            query_ret = self.service_db.service_list(dict_data)
        except Exception, e:
            log.error('get the service list error...reason=%s' % e)
            raise

        for i in query_ret:
            a.append(i)
            service.append(i.get('service_name'))

        service = list(set(service))

        if len(a) == 0:
            return []

        for x in a:

            try:
                x['ltime'] = self.operate.time_diff(x.get('ltime'))
            except Exception, e:
                log.error('exchange the time to chinese error, reason=%s' % e)
                raise

            for y in service:
                if x.get('service_name') == y:
                    if len(ret) == 0:
                        ret.append({'service_name': y, 'image_dir': x.get('image_dir'),
                                    'ltime': x.get('ltime'), 'service_status': x.get('service_status'),
                                    'container': [{'container_port': x.get('container_port'),
                                                   'http_domain': x.get('http_domain'),
                                                   'tcp_domain': x.get('tcp_domain')}]
                                    })
                        continue

                    for z in ret:
                        if z.get('service_name') == y:
                            for e in z['container']:
                                if e.get('container_port') != x.get('container_port'):
                                    z['container'].append({'container_port': x.get('container_port'),
                                                           'http_domain': x.get('http_domain'),
                                                           'tcp_domain': x.get('tcp_domain')})
                        for m in ret:
                            b.append(m.get('service_name'))

                        if y not in b:
                            ret.append({'service_name': y, 'image_dir': x.get('image_dir'),
                                        'ltime': x.get('ltime'), 'service_status': x.get('service_status'),
                                        'container': [{'container_port': x.get('container_port'),
                                                       'http_domain': x.get('http_domain'),
                                                       'tcp_domain': x.get('tcp_domain')}]})

        return request_result(0, ret)

    def query_only_service(self, dict_data):
        log.info('query only service, the data(in) is: %s,type:%s' % (dict_data, type(dict_data)))

        ret = []
        query_all = self.query_service(dict_data).get('result')

        for i in query_all:
            match_string = "[a-zA-Z0-9-_]*%s[a-zA-Z0-9-_]*" % str(dict_data.get("service_name"))
            if re.search(match_string, i.get("service_name")):
                ret.append(i)

        return request_result(0, ret)

    def service_detail(self, dict_data):
        log.info('query service detail, the data(in) is: %s' % dict_data)
        containers = []
        env = []
        volume = []
        rc = {}

        rc_ret, containers_ret, env_ret, volume_ret = self.service_db.service_detail(dict_data)

        for x in containers_ret:
            containers.append(x)
        for y in env_ret:
            env.append(y)
        for z in volume_ret:
            volume.append(z)

        for m in rc_ret:
            rc = m
            rc['ltime'] = self.operate.time_diff(m.get('rc_update_time'))

        rc['container'] = containers
        rc['env'] = env
        rc['volume'] = volume

        del rc['rc_update_time']
        del rc['rc_create_time']

        return request_result(0, rc)
