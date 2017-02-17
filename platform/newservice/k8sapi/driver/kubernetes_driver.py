# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/10
import re
import json
import requests
from conf import conf
from common.time_log import time_log
from common.code import request_result
from common.logs import logging as log
from db.service_db import ServiceDB
from db.metal_work import MetalWork
from rpcapi_client import KubernetesRpcClient


class KubernetesDriver(object):

    def __init__(self):
        self.service_db = ServiceDB()
        self.krpc_client = KubernetesRpcClient()
        self.metal = MetalWork()

    @staticmethod
    def command_query(dict_data):
        in_command = dict_data.get('command')

        if in_command != '' and in_command is not None:
            command = in_command.split(',')

            return command

    @staticmethod
    def get_image_msg(dict_data):
        image_id = dict_data.get('image_id')
        url = conf.IMAGE_SERVER
        headers = {"token": dict_data.get("token")}

    @staticmethod
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
    def fill_containerfor_volume(dict_data):
        result = []
        if dict_data.get('volume') is not None and dict_data.get('volume') != '':
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
        team_name = context.get('team_name')
        using_port = None
        tcp_lb = ''
        http_lb = ''
        m = 1

        for i in ser:
            domain_http = '%s-%s.lb1.boxlinker.com:' % (team_name, service_name)
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

    def unit_element(self, dict_data):
        namespace = dict_data.get('project_uuid')
        image_name = dict_data.get('image_name')
        image_version = dict_data.get('image_version')
        service_name = dict_data.get('service_name').replace('_', '-')
        pods_num = int(dict_data.get('pods_num'))
        team_name = dict_data.get('team_name')
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

        return namespace, image_name, image_version, service_name, pods_num, team_name, command, container, \
            env, user_uuid, rc_krud, pullpolicy, volumes

    def add_rc(self, dict_data):
        namespace, image_name, image_version, service_name, pods_num, team_name, command, container, \
            env, user_uuid, rc_krud, pullpolicy, volumes = self.unit_element(dict_data)

        try:
            add_rc = {
               "c_type": "replicationcontrollers",
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
            if dict_data.get('volume') == '' or dict_data.get('volume') is None or len(dict_data.get('volume')) == 0:
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

    def del_pod_element(self, dict_data):

        command = ''
        pullpolicy = ''
        rc_krud = ''
        image_name = "index.boxlinker.com/boxlinker/web-index"
        image_version = "latest"
        service_name = dict_data.get('service_name').replace('_', '-')
        namespace = dict_data.get('project_uuid')
        pods_num = 0
        container = []
        images = image_name + image_version

        try:
            rc_ret, containers_ret, env_ret, volume_ret = self.service_db.service_detail
        except Exception, e:
            log.error('get the all detail messages error, reason=%s' % e)
            raise

        for j in containers_ret:
            containers = {"container_port": j.get("container_port"),
                          "protocol": j.get("protocol"),
                          "access_mode": j.get("access_mode"),
                          "access_scope": j.get("access_scope")}
            container.append(containers)

        for i in rc_ret:
            if i.get('policy') == 1:
                rc_krud = images[20:].replace("/", "_").replace(":", "_")
                pullpolicy = "Always"
            else:
                pullpolicy = "IfNotPresent"
                rc_krud = "null"

            command = self.command_query({'command': rc_ret.get('command')})

        return command, pullpolicy, rc_krud, images, service_name, namespace, pods_num, container, images

    def delete_pod(self, dict_data):

        try:
            command, pullpolicy, rc_krud, images, service_name, namespace, pods_num, \
                container, images = self.del_pod_element(dict_data)
        except Exception, e:
            log.error('parameters explain error when delete pod...reason=%s' % e)
            return False

        del_pod = {
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
                            "labels": {"name": service_name, "logs": service_name}
                         },
                         "spec": {
                            "nodeSelector": {"role": "user"},
                            "imagePullSecrets": [{"name": "registry-key"}],
                            "containers": [
                               {
                                  "name": service_name, "image": images,
                                  "imagePullPolicy": pullpolicy,
                                  "command": command, "ports": self.container(container)
                               }
                            ]
                         }
                      }
                   }
                }

        if command == "" or command is None:
            j = 0
            for i in del_pod["spec"]["template"]["spec"]["containers"]:
                del del_pod["spec"]["template"]["spec"]["containers"][j]["command"]
                j += 1

        return del_pod

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
                           "c_type": "services", "kind": "Service", "apiVersion": "v1",
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

    def show_namespace(self, dict_data):
        namespace = dict_data.get('project_uuid')
        ns_ret = self.krpc_client.show_ns({'namespace': namespace})
        return ns_ret

    def create_namespace(self, dict_data):
        namespace = dict_data.get('project_uuid')
        ns_dict = {"apiVersion": "v1", "kind": "Namespace", "metadata": {"name": namespace}}
        ns_cre_ret = self.krpc_client.create_ns(ns_dict)

        if ns_cre_ret.get('kind') != 'Namespace':
            log.error('ns create error, create result is : %s' % ns_cre_ret)
            return False
        return True

    def create_secret(self, dict_data):
        namespace = dict_data.get('project_uuid')
        secret_dict = {"apiVersion": "v1", "kind": "Secret",
                       "metadata": {"name": "registry-key", "namespace": namespace},
                       "data":
                           {".dockerconfigjson":
                                "ewoJImF1dGhzIjogewoJCSJpbmRleC5ib3hsaW5rZXIuY29tIjogewoJCQkiYXV0aCI6ICJZbTk0YkdsdWEyVnlPbEZCV25kemVERXlNdz09IgoJCX0KCX0KfQ=="},
                       "type": "kubernetes.io/dockerconfigjson"
                       }
        secret_cre_ret = self.krpc_client.create_secret(secret_dict)
        if secret_cre_ret.get('kind') != 'Secret':
            return False
        return True

    def create_svc_account(self, dict_data):
        namespace = dict_data.get('project_uuid')
        service_account = self.krpc_client.get_account({'namespace': namespace, 'name': 'default'})
        log.info('get service account...the result is: %s, type is:%s' % (service_account, type(service_account)))

        account_json = {
                "kind": "ServiceAccount", "apiVersion": "v1",
                "metadata": {"name": "default", "namespace": namespace},
                "secrets": service_account.get("secrets"),
                "imagePullSecrets": [{"name": "registry-key"}]
            }

        cre_account = self.krpc_client.create_account(account_json)
        if not cre_account:
            log.error('service account create error, the create result is : %s' % cre_account)
            return False

        return True

    def get_pod_name(self, context):
        pod = []
        pod_message = {"namespace": context.get("project_uuid"), 'rtype': 'pods'}

        try:
            response = self.krpc_client.get_pod_messages(pod_message).get('items')
        except Exception, e:
            log.error("explain the kubernetes response error,reason=%s" % e)
            return False

        try:
            for i in response:
                if context.get("service_name") == i.get("metadata").get("labels").get("component"):
                    for j in i.get("spec").get("containers"):
                        p = {"ports": j.get("ports")}
                        p.update(context)

                    pod_ms = {"pod_phase": i.get("status").get("phase"), "pod_name": i.get("metadata").get("name"),
                              "pod_ip": i.get("status").get("podIP")}
                    pod.append(pod_ms)
        except Exception, e:
            log.error("explain the pods messages error,reason=%s" % e)
            return False

        return pod

    def create_service(self, context):

        try:
            check = self.service_db.create_svcaccount_or_not(context)

        except Exception, e:
            log.error('check the namespace if is exist(database select)...,reason=%s' % e)
            return request_result(501)

        ns_if_exist = self.show_namespace(context)

        if len(check) == 0:
            if ns_if_exist.get('kind') != 'Namespace':
                ret_ns = self.create_namespace(context)
                ret_secret = self.create_secret(context)
                ret_account = self.create_svc_account(context)

                if not ret_ns or not ret_secret or not ret_account:
                    log.error('CREATE NS,SECRET,ACCOUNT ERROR, RESULT:NS: %s,SECRET: %s, ACCOUNT: %s' %
                              (ret_ns, ret_secret, ret_account))
                    return request_result(501)

        add_rc = self.add_rc(context)
        add_service = self.add_service(context)
        if add_rc is False or add_service is False:
            log.info('CREATE SERVICE ERROR WHEN CREATE JSON DATA...')
            return request_result(501)

        rc_ret = json.loads(self.krpc_client.create_services(add_rc))
        svc_ret = json.loads(self.krpc_client.create_services(add_service))

        if rc_ret.get('kind') != 'ReplicationController' or svc_ret.get('kind') != 'Service':
            log.info('CREATE SERVICE ERROR WHEN USE KUBERNETES API TO CREATE... rc_ret=%s,svc_ret=%s' % (rc_ret,
                                                                                                         svc_ret))
            return request_result(501)

        return True

    def delete_service(self, context):

        pods = self.get_pod_name(context)
        if pods is False:
            log.error('PODS MESSAGES GET ERROR')
            return request_result(503)

        namespace = context.get('project_uuid')
        name = context.get('service_name')

        del_rc_json = {'namespace': namespace, 'name': name, 'rtype': 'replicationcontrollers'}
        del_svc_json = {'namespace': namespace, 'name': name, 'rtype': 'services'}
        rc_ret = self.krpc_client.delete_service_a_rc(del_rc_json)
        svc_ret = self.krpc_client.delete_service_a_rc(del_svc_json)

        for i in pods:
            log.info('pod_name is: %s' % i.get('pod_name'))
            del_pod_json = {'namespace': namespace, 'name': i.get('pod_name'), 'rtype': 'pods'}
            pod_ret = self.krpc_client.delete_service_a_rc(del_pod_json)

            if pod_ret.get('code') != 200 and pod_ret.get('code') is not None:
                log.error('DELETE POD RESULT IS--POD:%s' % pod_ret)
                return request_result(503)

        if (rc_ret.get('code') != 200 and rc_ret.get('code') != 404) or \
                (svc_ret.get('code') != 200 and svc_ret.get('code') != 404):
            log.error('DELETE SERVICE RESULT IS--RC:%s;SERVICE:%s' % (rc_ret, svc_ret))

            return request_result(503)

        return True

    def update_service(self, context):
        try:
            svc_detail_original = self.metal.service_detail(context)
        except Exception, e:
            log.error('get the service original details(kubernetes_driver) message error, reason=%s' % e)
            return request_result(404)

        if svc_detail_original.get('status') != 0:
            return request_result(404)

        try:
            log.info('context is %s, type is %s' % (context, type(context)))
            svc_detail = svc_detail_original.get('result')
            svc_detail['service_name'] = context.get('service_name')
            svc_detail['project_uuid'] = context.get('project_uuid')

            # 需要删除
            svc_detail['image_name'] = 'index.boxlinker.com/boxlinker/web-index'
            svc_detail['image_version'] = 'latest'
        except Exception, e:
            log.error('struct the params when update service error, reason=%s' % e)
            return request_result(502)

        try:
            rc_up_json = self.add_rc(svc_detail)
            # svc_up_json = self.add_service(svc_detail)
        except Exception, e:
            log.error('rc_json or svc json struct error, reason=%s' % e)
            return request_result(502)

        rc_up_json['rtype'] = 'replicationcontrollers'
        # svc_up_json['rtype'] = 'services'

        rc_up_ret = self.krpc_client.update_service(rc_up_json)
        # svc_up_ret = self.krpc_client.update_service(svc_up_json)

        if rc_up_ret.get('result') != '<Response [200]>':
                # or (svc_up_ret.get('kind') != 'Service' or svc_up_ret.get('code') != 200):
            log.info('SERVICE UPDATE ERROR,RC_RET---:%s' % rc_up_ret)
            return request_result(502)

        pods = self.get_pod_name(context)
        if pods is False:
            log.error('PODS MESSAGES GET ERROR')
            return request_result(502)

        for i in pods:
            log.info('pod_name is: %s' % i.get('pod_name'))
            del_pod_json = {'namespace': context.get('project_uuid'), 'name': i.get('pod_name'), 'rtype': 'pods'}
            pod_ret = self.krpc_client.delete_service_a_rc(del_pod_json)

            if pod_ret.get('code') != 200 and pod_ret.get('code') is not None:
                log.error('DELETE POD RESULT IS--POD:%s' % pod_ret)
                return request_result(502)

        return True

    def update_env(self, context):

        database_ret = self.service_db.update_env(context)
        if database_ret is False:
            return request_result(403)

        service_ret = self.update_service(context)
        if service_ret is not True:
            return service_ret

        return True

    def update_main(self, context):
        rtype = context.get('rtype')

        if rtype == 'env':
            return self.update_env(context)

        return True
