#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:王晓峰
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from data import DataOrm
from data_controller import LogicModel
from call_volumn.create_volume import CreateVolume
from response_code import code
from array_iterator import ArrayIterator
from common.logs import logging as log
import json
from cpu_limits import limits_cm
from resource_model.choice_up import choice_up


class SourceModel(object):

    def __init__(self):
        pass

    def create_json(self, json_list):

        if json_list.get("tel") == None and json_list.get("operate") == None:
           json_list = choice_up(json_list)
        elif json_list.get("tel") == None and json_list.get("operate") == "start":
            json_list = choice_up(json_list)
        else:
            json_list.pop("tel")

        command = None
        com = ""
        log.info(json_list)
        volumes = []
        image_name = ""
        image_version = ""
        container_cpu = ""
        policy1 = 0
        pods_num = 1
        container = json_list.get("container")
        env = json_list.get("env")
        container_memory = ""
        auto_startup = json_list.get("auto_startup")
        select_rc = DataOrm.get_update_rc(json_list)

        try:
            logicmodel = LogicModel()
            conn, cur = logicmodel.connection()
            resu = logicmodel.exeQuery(cur, select_rc)

            for i in resu:
                image_name = i.get("image_name")
                image_version = i.get("image_version")
                container_cpu = i.get("limits_cpu")
                container_memory = i.get("limits_memory")
                pods_num = int(i.get("spec_replicas"))
                policy1 = int(i.get("policy"))
                command = i.get("command")
            logicmodel.connClose(conn, cur)
            log.info("command=====%s" % command)

            if json_list.get("command") == "" or json_list.get("command") is None:
                pass
            else:
                command = json_list.get("command")

            if command != "" and command is not None and command != "Null":
                com = command.split(",")
            else:
                com = ""
            log.info("ssssssssssssssss")
            log.info(com)
        except Exception as msg:
            result = code.request_result(403, ret={"msg": msg.message, "msg1": msg.args})
            return result
        # images = image_name+":"+image_version

        if json_list.get("image_name") is not None and json_list.get("policy") is not None:
            log.info("jsondata=====================%s" % json_list)
            image_name = json_list.get("image_name")
            image_version = json_list.get("image_version")
            policy1 = int(json_list.get("policy"))

        images = image_name
        if int(auto_startup) == 1:
            # rc_krub = images[20:].replace("/", "_").replace(":", "_")
            pass
        else:
            # rc_krub = "null"
            pods_num = 0
        if policy1 == 1:
            rc_krub = images[20:].replace("/", "_").replace(":", "_")
            pullpolicy = "Always"
        else:
            rc_krub = "null"
            pullpolicy = "IfNotPresent"

        try:
            if json_list.get("volume") != "":
                volume = CreateVolume()
                volumes = volume.define_volumes(json_list)
                if volumes == "timeout" or volumes == "error":
                    return "timeout"
            else:
                volumes = "null"

        except Exception, e:
            log.error("volume create error, reason=%s" % e)
        volume = CreateVolume()
        user_name = json_list.get("user_name")
        service_name = json_list.get("service_name")
        service_name = user_name+service_name
        service_name1 = service_name.replace("_", "-")
        if json_list.get("container_cpu") is not None:
            container_cpu, container_memory = limits_cm(json_list)

        update_rc = {
                       "kind": "ReplicationController",
                       "apiVersion": "v1",
                       "metadata": {
                          "namespace": user_name,
                          "name": service_name1,
                          "labels": {
                             "component": service_name1,
                             "rc-krud": rc_krub,
                             "name": service_name1
                          }
                       },
                       "spec": {
                          "replicas": pods_num,
                          "selector": {
                             "name": service_name1
                          },
                          "template": {
                             "metadata": {
                                "labels": {
                                   "component": service_name1,
                                   "name": service_name1,
                                   "logs": service_name1
                                }
                             },
                             "spec": {
                                "nodeSelector": {"role": "user"},
                                "imagePullSecrets": [{"name": "registry-key"}],
                                "containers": [
                                   {
                                      "name": service_name1,
                                      "image": image_name+":"+image_version,
                                      "imagePullPolicy": pullpolicy,
                                      "command": com,
                                      # "resources": {"limits": {"cpu": container_cpu,
                                      #                         "memory": container_memory}},
                                      "ports": ArrayIterator.container(container),
                                      "env": ArrayIterator.env(env),
                                      "volumeMounts": volume.fill_containerfor_volume(json_list)
                                   }
                                ],
                                "volumes": volumes
                             }
                          }
                       },
                       "namespace": user_name,
                       "name": service_name1,
                       "rtype": "replicationcontrollers"
                    }
        try:
            if json_list.get("env") == "":
                j = 0
                for i in update_rc["spec"]["template"]["spec"]["containers"]:
                    del update_rc["spec"]["template"]["spec"]["containers"][j]["env"]
                    j += 1
            if json_list.get("volume") == "":
                del update_rc["spec"]["template"]["spec"]["volumes"]
                j = 0
                for i in update_rc["spec"]["template"]["spec"]["containers"]:
                    del update_rc["spec"]["template"]["spec"]["containers"][j]["volumeMounts"]
                    j += 1
            if com is None or com == "" or com == "Null":
                j = 0
                for i in update_rc["spec"]["template"]["spec"]["containers"]:
                    del update_rc["spec"]["template"]["spec"]["containers"][j]["command"]
                    j += 1
        except Exception, e:
            log.error("have an error, reason=%s" % e)
        log.info(update_rc)
        return update_rc

    def add_rc(self, json_list):
        add_rc=dict()
        namespace = json_list.get("user_name")
        image_name = json_list.get("image_name")
        image_version = json_list.get("image_version")
        service_name = json_list.get("service_name")

        # container_memory = json_list.get("container_memory")

        # container_cpu = json_list.get("container_cpu")

        pods_num = int(json_list.get("pods_num"))

        user_name = json_list.get("user_name")

        command = ArrayIterator.command_query(json_list)

        policy1 = json_list.get("policy")
        # images = image_name+":"+image_version
        images = image_name
        container = json_list.get("container")
        env = json_list.get("env")
        auto_startup = json_list.get("auto_startup")
        log.info("8888888888888888888888+++%s" % command)
        if int(auto_startup) == 1:
            # rc_krub = images[20:].replace("/", "_").replace(":", "_")
            pass
        else:
            # rc_krub = "null"
            pods_num = 0
        if int(policy1) == 1:
            rc_krub = images[20:].replace("/", "_").replace(":", "_")
            pullpolicy = "Always"
        else:
            rc_krub = "null"
            pullpolicy = "IfNotPresent"
            # status = "running"

        try:
            if json_list.get("volume") is not None:
                volume = CreateVolume()
                volumes = volume.define_volumes(json_list)
                if volumes == "timeout":
                    return "timeout"
            else:
                volumes = "null"
            volume = CreateVolume()
            service_name2 = user_name+service_name
            service_name1 = service_name2.replace("_", "-")

            container_cpu, container_memory = limits_cm(json_list)

            # 创建rc
            log.info("user_id================%s" % json_list.get("user_id"))
            add_rc = {
                       "kind": "ReplicationController",
                       "apiVersion": "v1",
                       "metadata": {
                          "namespace": namespace,
                          "name": service_name1,
                          "labels": {
                             "component": service_name1,
                             "rc-krud": rc_krub,
                             "name": service_name1
                          }
                       },
                       "spec": {
                          "replicas": pods_num,
                          "selector": {
                             "name": service_name1
                          },
                          "template": {
                             "metadata": {
                                "labels": {
                                   "component": service_name1,
                                   "name": service_name1,
                                   "logs": service_name1
                                }
                             },
                             "spec": {
                                "nodeSelector": {"role": "user"},
                                "imagePullSecrets": [{"name": "registry-key"}],
                                "containers": [
                                   {
                                      "name": service_name1,
                                      "image": image_name+":"+image_version,
                                      "imagePullPolicy": pullpolicy,
                                      "command": command,
                                      # "resources": {"limits": {"cpu": container_cpu,
                                      #                         "memory": container_memory}},
                                      "ports": ArrayIterator.container(container),
                                      "env": ArrayIterator.env(env),
                                      "volumeMounts": volume.fill_containerfor_volume(json_list)
                                   }
                                ],
                                "volumes": volumes,
                             }
                          }
                       },
                       "namespace": namespace,
                       "user_id": json_list.get("user_id")
                    }
            if json_list.get("env") == [{"env_key": "", "env_value": ""}] or json_list.get("env") == "":
                j = 0
                for i in add_rc["spec"]["template"]["spec"]["containers"]:
                    del add_rc["spec"]["template"]["spec"]["containers"][j]["env"]
                    j += 1
            if json_list.get("volume") == "":
                j = 0
                del add_rc["spec"]["template"]["spec"]["volumes"]
                for i in add_rc["spec"]["template"]["spec"]["containers"]:
                    del add_rc["spec"]["template"]["spec"]["containers"][j]["volumeMounts"]
                    j += 1
            if command == "" or command is None or command == "Null":
                j = 0
                for i in add_rc["spec"]["template"]["spec"]["containers"]:
                    del add_rc["spec"]["template"]["spec"]["containers"][j]["command"]
                    j += 1
            else:
                pass
        except Exception, e:
            log.error("rc json create error,reason=%s" % (e))
        return add_rc

    def add_service(self, json_list):
        # namespace = json_list.get("user_name")
        service_name = json_list.get("service_name")
        user_name = json_list.get("user_name")
        # domain_name = user_name+"-"+service_name+".boxlinker.com"
        # status = "running"
        try:
            http_lb, tcp_lb, tcp_port = ArrayIterator.service_domain(json_list)
        except Exception, e:
            log.error("the domain create error, reason=%s"
                      % (e))
        try:
            log.info("the container data=%s,type=%s" % (json_list.get("container"), type(json_list.get("container"))))
            container = json_list.get("container")
        except Exception, e:
            log.error('service json create error data=%s, reason=%s' % (container, e))
            return
        try:
                service_name2 = user_name+service_name
                service_name1 = service_name2.replace("_", "-")

                add_service = {
                               "kind": "Service",
                               "apiVersion": "v1",
                               "metadata": {
                                  "annotations": {"serviceloadbalancer/lb.http": http_lb,
                                                  "serviceloadbalancer/lb.tcp": tcp_lb,
                                                  "serviceloadbalancer/lb.node": "lb1"

                                                  },
                                  "name": service_name1,
                                  "labels": {
                                     "name": service_name1
                                  }
                               },
                               "spec": {
                                  "ports": ArrayIterator.service_port(container),
                                  "selector": {
                                     "component": service_name1,
                                     "name": service_name1
                                  }
                               },
                               "namespace": user_name,
                               "user_id": json_list.get("user_id")
                            }

                if http_lb == "":
                    add_service["metadata"]["annotations"].pop("serviceloadbalancer/lb.http")
                elif tcp_lb == "":
                    add_service["metadata"]["annotations"].pop("serviceloadbalancer/lb.tcp")
                else:
                    pass
        except Exception, e:
            log.error("service create json error reason=%s" % (e))
            return
        return add_service

    def update_service(self, json_list):
        http_lb = ""
        tcp_lb = ""
        log.info("::::::::::::::::::::::::::::")
        log.info(json_list)
        service_name = json_list.get("service_name")
        user_name = json_list.get("user_name")
        container = json_list.get("container")
        try:
            http_lb, tcp_lb, tcp_port = ArrayIterator.service_domain(json_list)
        except Exception, e:
            log.error("the domain create error, reason=%s"
                      % (e))
        try:
            log.info("the container data=%s,type=%s" % (json_list.get("container"), type(json_list.get("container"))))

        except Exception, e:
            log.error('service json create error data=%s, reason=%s' % (container, e))
            return
        try:
                service_name2 = user_name+service_name
                service_name1 = service_name2.replace("_", "-")

                update_service = {
                               "kind": "Service",
                               "apiVersion": "v1",
                               "metadata": {
                                  "annotations": {"serviceloadbalancer/lb.http": http_lb,
                                                  "serviceloadbalancer/lb.tcp": tcp_lb,
                                                  "serviceloadbalancer/lb.node": "lb1"

                                                  },
                                  "name": service_name1,
                                  "namespace": user_name,
                                  "labels": {
                                     "name": service_name1
                                  }
                               },
                               "spec": {
                                  "ports": ArrayIterator.service_port(container),
                                  "selector": {
                                     "component": service_name1,
                                     "name": service_name1
                                  }
                               },
                               "namespace": user_name,
                               "name": service_name1,
                               "rtype": "services"
                            }

                if http_lb == "":
                    update_service["metadata"]["annotations"].pop("serviceloadbalancer/lb.http")
                elif tcp_lb == "":
                    update_service["metadata"]["annotations"].pop("serviceloadbalancer/lb.tcp")
                else:
                    pass
        except Exception, e:
            log.error("service create json error reason=%s" % (e))
            return
        return update_service

    def delete_pod(self, json_list):
        com = ""
        command = ""
        image_name = ""
        image_version = ""
        container_cpu = ""
        policy1 = 0
        pods_num = 0
        container_memory = ""
        auto_startup = 0
        select_rc = DataOrm.get_update_rc(json_list)
        containers_pod = DataOrm.detail_container(json_list)
        try:
            logicmodel = LogicModel()
            conn, cur = logicmodel.connection()
            resu = logicmodel.exeQuery(cur, select_rc)
            conn, cur = logicmodel.connection()
            xxx = logicmodel.exeQuery(cur, containers_pod)
            res = []
            for j in xxx:
                containers = {"container_port": j.get("containerPort"),
                       "protocol": j.get("protocol"),
                       "access_mode": j.get("access_mode"),
                       "access_scope": j.get("access_scope")}
                res.append(containers)
            for i in resu:
                image_name = i.get("image_name")
                image_version = i.get("image_version")
                container_cpu = i.get("limits_cpu")
                container_memory = i.get("limits_memory")
                policy1 = int(i.get("policy"))
                com = i.get("command")
            logicmodel.connClose(conn, cur)
            if json_list.get("command") != "" and json_list.get("command") is not None:
                com = json_list.get("command")
            if com != "" and com is not None:
                command = com.split(",")
            log.info("0000000000000000")
            log.info(command)
        except Exception as msg:
            result = code.request_result(403, ret={"msg": msg.message, "msg1": msg.args})
            return result
        images = image_name
        if int(auto_startup) == 1:
           pass
        else:
           pass
        if policy1 == 1:
            rc_krub = images[20:].replace("/", "_").replace(":", "_")
            pullpolicy = "Always"
        else:
            pullpolicy = "IfNotPresent"
            rc_krub = "null"
        user_name = json_list.get("user_name")
        service_name = json_list.get("service_name")
        service_name = user_name+service_name
        service_name1 = service_name.replace("_", "-")
        del_pod = {
                       "kind": "ReplicationController",
                       "apiVersion": "v1",
                       "metadata": {
                          "namespace": user_name,
                          "name": service_name1,
                          "labels": {
                             "component": service_name1,
                             "rc-krud": rc_krub,
                             "name": service_name1
                          }
                       },
                       "spec": {
                          "replicas": pods_num,
                          "selector": {
                             "name": service_name1
                          },
                          "template": {
                             "metadata": {
                                "labels": {
                                   "name": service_name1,
                                   "logs": service_name1
                                }
                             },
                             "spec": {
                                "nodeSelector": {"role": "user"},
                                "imagePullSecrets": [{"name": "registry-key"}],
                                "containers": [
                                   {
                                      "name": service_name1,
                                      "image": image_name+":"+image_version,
                                      "imagePullPolicy": pullpolicy,
                                      "command": command,
                                      # "resources": {"limits": {"cpu": container_cpu,
                                      #                         "memory": container_memory}},
                                      "ports": ArrayIterator.container(res),
                                      # "env": ArrayIterator.env(env)

                                   }
                                ],
                             }
                          }
                       },
                       "namespace": user_name,
                       "name": service_name1,
                       "rtype": "replicationcontrollers"
                    }
        # if json_list.get("env") == [{"env_key": "", "env_value": ""}] or json_list.get("env") is None :
        #    update_rc["spec"]["template"]["spec"]["containers"].pop("env")
        # else:
        #    pass
        if command == "" or command is None:
            j = 0
            for i in del_pod["spec"]["template"]["spec"]["containers"]:
                del del_pod["spec"]["template"]["spec"]["containers"][j]["command"]
                j += 1
        log.info(del_pod)

        return del_pod

    def add_volume_rc(self, json_list):
        namespace = json_list.get("user_name")
        image_name = json_list.get("image_name")
        image_version = json_list.get("image_version")
        service_name = json_list.get("service_name")

        container_memory = json_list.get("container_memory")
        container_cpu = json_list.get("container_cpu")
        pods_num = int(json_list.get("pods_num"))

        user_name = json_list.get("user_name")

        policy1 = json_list.get("policy")
        images = image_name+":"+image_version

        container = json_list.get("container")
        env = json_list.get("env")
        auto_startup = json_list.get("auto_startup")
        log.error("data=%s,type=%s" % (container, type(container)))

        if int(auto_startup) == 1:
            pass
        else:
            pods_num = 0
        if int(policy1) == 1:
            rc_krub = images[20:].replace("/", "_").replace(":", "_")
            pullpolicy = "Always"
        else:
            rc_krub = "null"
            pullpolicy = "IfNotPresent"
        service_name2 = user_name+service_name
        service_name1 = service_name2.replace("_", "-")
        try:
            volume_mounts = CreateVolume.fill_containerfor_volume(json_list)
        except Exception, e:
            log.error("get the volume message error, reason=%s" % (e))

        add_volume_rc = {
                       "kind": "ReplicationController",
                       "apiVersion": "v1",
                       "metadata": {
                          "namespace": namespace,
                          "name": service_name1,
                          "labels": {
                             "component": service_name1,
                             "rc-krud": rc_krub,
                             "name": service_name1
                          }
                       },
                       "spec": {
                          "replicas": pods_num,
                          "selector": {
                             "name": service_name1
                          },
                          "template": {
                             "metadata": {
                                "labels": {
                                   "name": service_name1
                                }
                             },
                             "spec": {
                                "nodeSelector": {"role": "node"},
                                "imagePullSecrets": [{"name": "registry-key"}],
                                "containers": [
                                   {
                                      "name": service_name1,
                                      "image": image_name+":"+image_version,
                                      "imagePullPolicy": pullpolicy,
                                      # "resources": {"limits": {"cpu": container_cpu,
                                      #                         "memory": container_memory}},
                                      "ports": ArrayIterator.container(container),
                                      "env": ArrayIterator.env(env),
                                      "volumeMounts": volume_mounts

                                   },
                                ],

                                "volumes": CreateVolume.define_volumes(json_list)
                             }
                          }
                       },
                       "namespace": namespace
                    }
        return add_volume_rc

    def create_namespace(self, json_list):
        namespace_name =json_list.get("user_name")
        namespace_json = {"apiVersion": "v1", "kind": "Namespace", "metadata": {"name": namespace_name}}
        return namespace_json

    def create_secret(self, json_list):
        namespace_name = json_list.get("user_name")
        secret_json = {"apiVersion": "v1",
                       "kind": "Secret",
                       "metadata":
                           {"name": "registry-key",
                            "namespace": namespace_name},
                       "data":
                           {".dockerconfigjson": "ewoJImF1dGhzIjogewoJCSJpbmRleC5ib3hsaW5rZXIuY29tIjogewoJCQkiYXV0aCI6ICJZbTk0YkdsdWEyVnlPbEZCV25kemVERXlNdz09IgoJCX0KCX0KfQ=="},
                       "type": "kubernetes.io/dockerconfigjson",
                       "namespace": namespace_name
                       }
        return secret_json
