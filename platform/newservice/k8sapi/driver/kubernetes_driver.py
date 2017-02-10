# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/10

from common.logs import logging as log
from conf import conf
import json
import requests
from common.time_log import time_log
import re
from db.service_db import ServiceDB


class KubernetesDriver(object):

    def __init__(self):
        self.service_db = ServiceDB()

    @staticmethod
    @time_log
    def command_query(dict_data):
        in_command = dict_data.get('command')

        if in_command != '' and in_command is not None:
            command = in_command.split(',')

            return command

    @staticmethod
    @time_log
    def define_volumes(dict_data):
        result = []
        request_para = dict_data.get('volume')
        headers = {'token': dict_data.get('token')}
        monitors = [x for x in conf.VOLUMEIP.split(',')]
        if request_para is not None and request_para != '':
            for i in request_para:

                get_url = '%s/%s' % (conf.STORAGE_HOST, i.get('volume_id'))
                try:
                    resu = json.loads(requests.get(get_url, headers=headers, timeout=5).text).get('result')
                    if resu == {}:
                        return 'error'
                except Exception, e:
                    log.error('select volumes error,reason=%s' % e)
                    return "timeout"

                log.info(resu)
                vname = resu.get('volume_name')
                pool_name = resu.get('pool_name')
                image = resu.get('image_name')
                readonly1 = i.get('readonly')
                if readonly1 == 'True':
                    readonly = True
                else:
                    readonly = False
                fs_type = resu.get('fs_type')
                log.info(resu)
                volumes = {
                            "name": vname,
                            "rbd": {
                                "monitors": monitors, "pool": pool_name, "image": image, "user": "admin",
                                "keyring": "/etc/ceph/keyring", "fsType": fs_type, "readOnly": readonly
                            }
                        }

                result.append(volumes)
            log.info(result)
            return result

    @staticmethod
    @time_log
    def fill_containerfor_volume(dict_data):
        result = []
        request_para = dict_data.get('volume')

        headers = {'token': dict_data.get('token')}

        for i in request_para:
            if i.get('readonly') == 'True':
                readonly = True
            else:
                readonly = False

            get_url = '%s/%s' % (conf.STORAGE_HOST, i.get('volume_id'))
            try:
                resu = json.loads(requests.get(get_url, headers=headers, timeout=5).text).get('result')
                if resu == {}:
                    return 'error'
            except Exception, e:
                log.error('select volumes error,reason=%s' % e)
                return 'timeout'
            vname = resu.get('volume_name')

            disk_msg = {'name': vname, 'readOnly': readonly, 'mountPath': i.get('disk_path')}
            result.append(disk_msg)

        return result

    @staticmethod
    @time_log
    def container(con):
        ret = []
        for i in con:
            container_port = i.get('container_port')
            protocol = i.get('protocol')
            # access_mode = i.get("access_mode")
            # access_scope = i.get("access_scope")
            result = {'containerPort': container_port, 'protocol': protocol.upper()}
            ret.append(result)
        return ret

    @staticmethod
    def env(en):
        result = []
        if en is not None:
            for i in en:
                env_name = i.get('env_key')
                env_value = i.get('env_value')
                result.append({'name': env_name, 'value': env_value})
        return result

    def service_domain(self, context):
        ser = context.get('container')
        service_name = context.get('service_name')
        user_name = context.get('project_name')
        using_port = None
        tcp_lb = ''
        http_lb = ''
        m = 1

        for i in ser:
            domain_http = '%s-%s.lb1.boxlinker.com:' % (user_name, service_name)
            if i.get('access_mode').upper() == 'HTTP' and i.get('access_scope') == 'outsisde':
                http_lbadd = domain_http + str(i.get('container_port'))
                if http_lb == '':
                    http_lb = http_lb + http_lbadd
                else:
                    http_lb = http_lb + ',' + http_lbadd
            if i.get('access_mode').upper() == 'TCP' and i.get('access_scope') == 'outsisde':

                resu = self.service_db.max_used_port()
                log.info('get the max port is %s, yuan=%s' % (str(resu[0][0]), resu))

                if len(resu) != 0 and resu[0][0] is not None:
                    using_port = resu[0][0]
                if using_port is None:
                    ran_port = '30000'
                    tcp_lb = '%s:%s' % (ran_port, i.get('container_port'))
                else:
                    ran_port = int(using_port)+m
                    m += 1
                    if tcp_lb == '':
                        tcp_lb = '%s:%s' % (ran_port, i.get('container_port'))
                    else:
                        tcp_lb = tcp_lb+',' + '%s:%s' % (ran_port, i.get('container_port'))

                i['tcp_port'] = ran_port

        container = {'container': ser}

        return http_lb, tcp_lb, container

    def container_domain(self, dict_data):
        http_lb, tcp_lb, tcp_port = self.service_domain(dict_data)
        log.info('http_lb=%s,tcp_lb=%s,tcp_port=%s' % (http_lb, tcp_lb, tcp_port))

        container = tcp_port.get("container")
        newcon = []

        if http_lb != '':
            for i in re.split(',', http_lb):
                num = i.rfind(':')
                c_port = i[num+1:]
                http_domain = i[:num]

                for j in container:
                    if j.get('access_scope') == 'inside' and j.get('access_mode').upper() == 'HTTP':
                        j['http_domain'] = None
                    if str(j.get('container_port')) == str(c_port) and j.get('access_mode').upper() == 'HTTP':
                        j['http_domain'] = http_domain
                        newcon.append(j)

        if tcp_lb != '':
            for x in re.split(',', tcp_lb):
                num = x.rfind(':')
                c_port = x[num+1:]
                tcp_domain = 'lb1.boxlinker.com' + ':' + x[:num]
                # tcp_domain = "boxlinker.com" + ":" + x[:num]
                for y in container:
                    if y.get('access_mode').upper() == 'TCP' and y.get('access_scope') == 'inside':
                        y['tcp_domain'] = None
                    if str(y.get('container_port')) == str(c_port) and y.get('access_mode').upper() == 'TCP':
                        y['tcp_domain'] = tcp_domain
                        newcon.append(y)

        for i in container:

            if i.get('access_scope') == 'inside' or i.get('access_mode') == '':
                i['http_domain'] = ''
                i['tcp_domain'] = ''
                newcon.append(i)

        return newcon

    def service_port(self, ser):
        result = []
        x = 1
        y = 1
        for i in ser:
            port = int(i.get("container_port"))
            targetport = int(i.get("container_port"))
            if i.get("access_mode").upper() == "HTTP":
                name_c = "http"+str(x)
                x += 1
                result1 = {"name": name_c, "port": port, "targetPort": targetport}
                result.append(result1)
            elif i.get("access_mode").upper() == "TCP":
                name_c = "tcp"+str(y)
                y += 1
                result1 = {"name": name_c, "port": port, "targetPort": targetport}
                result.append(result1)

        return result

    @time_log
    def unit_element(self, dict_data):
        namespace = dict_data.get('project_uuid')
        image_name = dict_data.get('image_name')
        image_version = dict_data.get('image_version')
        service_name = dict_data.get('service_name').replace('_', '-')
        pods_num = int(dict_data.get('pods_num'))
        project_name = dict_data.get('project_name')
        command = self.command_query(dict_data)
        policy1 = dict_data.get('policy')
        images = image_name
        container = dict_data.get('container')
        env = dict_data.get('env')
        auto_startup = dict_data.get('auto_startup')
        user_uuid = dict_data.get('user_uuid')

        if int(auto_startup) != 1:
            pods_num = 0

        if int(policy1) == 1:
            rc_krud = images[20:].replace('/', '_').replace(':', '_')
            pullpolicy = 'Always'
        else:
            rc_krud = 'null'
            pullpolicy = 'IfNotPresent'

        try:
            if dict_data.get('volume') is not None and dict_data.get('volume') != '':
                volumes = self.define_volumes(dict_data)
                if volumes == 'timeout':
                    return 'timeout'
            else:
                volumes = 'null'
        except Exception, e:
            log.error('volume define error, reason=%s' % e)
            raise

        return namespace, image_name, image_version, service_name, pods_num, project_name, command, container, \
            env, user_uuid, rc_krud, pullpolicy, volumes

    @time_log
    def add_rc(self, dict_data):
        namespace, image_name, image_version, service_name, pods_num, project_name, command, container, \
            env, user_uuid, rc_krud, pullpolicy, volumes = self.unit_element(dict_data)

        try:
            add_rc = {
               "kind": "ReplicationController", "apiVersion": "v1",
               "metadata": {
                  "namespace": namespace, "name": service_name,
                  "labels": {"component": service_name, "rc-krud": rc_krud, "name": service_name}
               },
               "spec": {
                  "replicas": pods_num,
                  "selector": {"name": service_name},
                  "template": {
                     "metadata": {
                        "labels": {"component": service_name, "name": service_name, "logs": service_name}
                     },
                     "spec": {
                        "nodeSelector": {"role": "user"},
                        "containers": [
                           {"name": service_name, "image": image_name+":"+image_version, "imagePullPolicy": pullpolicy,
                            "command": command, "ports": self.container(container), "env": self.env(env),
                            "volumeMounts": self.fill_containerfor_volume(dict_data)}
                        ], "volumes": volumes,
                     }
                  }
               },
            }

            if dict_data.get('env') == [{'env_key': '', 'env_value': ''}] or dict_data.get('env') == '':
                j = 0
                for i in add_rc['spec']['template']['spec']['containers']:
                    del add_rc['spec']['template']['spec']['containers'][j]['env']
                    j += 1
            if dict_data.get('volume') == '' or dict_data.get('volume') is None:
                j = 0
                del add_rc['spec']['template']['spec']['volumes']
                for i in add_rc['spec']['template']['spec']['containers']:
                    del add_rc['spec']['template']['spec']['containers'][j]['volumeMounts']
                    j += 1
            if command == '' or command is None or command == 'Null':
                j = 0
                for i in add_rc['spec']['template']['spec']['containers']:
                    del add_rc['spec']['template']['spec']['containers'][j]['command']
                    j += 1
        except Exception, e:
            log.error('rc json create error,reason=%s' % e)
            return False

        return add_rc

    @time_log
    def add_service(self, dict_data):
        namespace = dict_data.get('project_uuid')
        service_name = dict_data.get('service_name')

        try:
            http_lb, tcp_lb, tcp_port = self.service_domain(dict_data)
        except Exception, e:
            log.error('the domain create error, reason=%s' % e)
            return False

        try:
            log.info('the container data=%s,type=%s' % (dict_data.get('container'), type(dict_data.get('container'))))
            container = dict_data.get('container')
        except Exception, e:
            log.error('service json create error data=%s, reason=%s' % (container, e))
            return False

        try:
            service_name1 = service_name.replace('_', '-')
            add_service = {
                           "kind": "Service", "apiVersion": "v1",
                           "metadata": {
                              "annotations": {"serviceloadbalancer/lb.http": http_lb,
                                              "serviceloadbalancer/lb.tcp": tcp_lb,
                                              "serviceloadbalancer/lb.node": "lb1"
                                              },
                              "name": service_name1,
                              "namespace": namespace,
                              "labels": {"name": service_name1}
                           },
                           "spec": {
                              "ports": self.service_port(container),
                              "selector": {"component": service_name1, "name": service_name1}
                           },
                        }

            if http_lb == '' or http_lb is None:
                add_service['metadata']['annotations'].pop('serviceloadbalancer/lb.http')
            if tcp_lb == '' or tcp_lb is None:
                add_service['metadata']['annotations'].pop('serviceloadbalancer/lb.tcp')
            if (http_lb == '' and tcp_lb == '') or (http_lb is None and tcp_lb is None):
                add_service['metadata'].pop('annotations')
        except Exception, e:
            log.error('service create json error reason=%s' % e)
            return False

        return add_service
