#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/1
# Author:王晓峰

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from class_apis.AllApiMethods import AllApiMethods
from common.logs import logging as log
import json
import notification
from kubernetes_client import KubernetesClient 


class KubernetesManagerAPI(object):

    def kubernetes_manager(self, json_lst):
        json_list = eval(json_lst)
        action = json_list.pop('action').upper()
        resource = json_list.get('resources_type')
        parameters1 = json_list.get('parameters')
        parameterst = str(parameters1)
        parameters = eval(parameterst)

        if 'namespace' in parameters.keys():
            if parameters.get('namespace') == '' or parameters.get('namespace') == 'default':
                namespace = 'default'
            else:
                namespace = parameters.get('namespace')
        else:
            namespace = None
        if 'name' in parameters.keys():
            name = parameters.get('name')
        else:
            name = None
        if 'other' in parameters.keys():
            other = parameters.pop('other')
        else:
            other = None

        # 绝大部分api访问路径一致的资源可以按照路径共同实现方法
        if resource == 'events':
            get_json = {
                "rtype": "events",
                "namespace": parameters.get("namespace")
            }
            response = AllApiMethods.get_namespace_resource(get_json)
            return response
        if resource == 'serviceAccount':
            if action.upper() == 'GET':
                response = AllApiMethods.get_account(parameters)
                return response
            if action.upper() == 'PUT':
                response = AllApiMethods.put_name_resource(parameters)
                return response
        if resource == 'secret':
            json_secret = parameters
            if action.upper() == 'POST':
                response = AllApiMethods.post_secret(json_secret)
                return response
        if resource != 'pods' or other is None:
            if resource == 'namespace':
                json_namespace = parameters
                if action.upper() == 'POST':
                    response = AllApiMethods.post_namespace(json_namespace)
                    return response
                if action.upper() == 'GET':
                    response = AllApiMethods.show_namespace(json_namespace)
                    return response
            
            if action.upper() == 'PUT':
                if resource == 'replicationcontrollers':
                    log.info("******************************")
                    log.info(parameters)
                    log.info("******************************")
                    response = AllApiMethods.put_name_resource(parameters)
                    log.info(response.text)
                    return response
                if resource == 'services':
                    log.info("******************************")
                    log.info(parameters)
                    log.info("******************************")
                    response = AllApiMethods.put_name_resource(parameters)
                    log.info(response.text)
                    return response

            if action.upper() == 'GET':
                if resource == 'services':
                    log.info("*******$$$$$$$")
                    response = AllApiMethods.get_name_resource(parameters)
                    log.info(response)
                    return response                    

            if namespace is not None and name is not None:
                json_to = {'rtype': resource, 'namespace': namespace, 'name': name}
                if action.upper() == 'GET':
                    response = AllApiMethods.get_name_resource(json_to)
                    return response
                if action.upper() == 'DELETE':
                    response = AllApiMethods.delete_name_resource(json_to)
                    return response
                if action.upper() == 'PATCH':
                    json_to.pop("namespace")
                    json_to.pop("name")
                    json_to.update(parameters)
                    response = AllApiMethods.patch_name_resource(json_to)
                    return response
                if action.upper() == 'PUT':
                    log.debug(parameters)
                    response = AllApiMethods.put_name_resource(parameters)
                    return response

            if namespace is not None and name is None:
                json_to = {'rtype': resource, 'namespace': namespace}
                try:
                    if action.upper() == 'GET':
                        response = AllApiMethods.get_namespace_resource(json_to)
                        return response
                except Exception, e:
                        log.error('get namespace error, reason=%s' % e)
                if action.upper() == 'POST':
                    # uid_font = parameters.pop("uid_font")
                    json_to.pop('namespace')
                    log.info("user_id:%s" % parameters.get("user_id"))
                    user_id = parameters.pop("user_id")
                    kclient = KubernetesClient()
                    json_to.update(parameters)
                    response = AllApiMethods.post_namespace_resource(json_to)
                    log.info(json.loads(response))
                    rc_name = ""
                    status = ""
                    svc_name = ""
                    if json.loads(response).get("code") is None and json.loads(response).get("kind") == "ReplicationController":
                        r_name = parameters.get("metadata").get("name")
                        pp_name = r_name.replace(parameters.get("namespace"), "")
                        json_get_pod = {"rtype": "pods", "namespace": parameters.get("namespace")}
                        res = AllApiMethods.get_namespace_resource(json_get_pod)
                        resu = json.loads(res).get("items")
                        
                        for i in resu:
                            log.info(i)
                            if rc_name in i.get("metadata").get("name"):
                                status = i.get("status").get("phase")
                                svc_name = r_name.replace(parameters.get("namespace"), "")
                                break

                        log.info("++++++++++++++++!!!!!!!!!")
                        json_insert_pod = {"user_id": user_id, "user_name": parameters.get("namespace"), "service_name":
                                           pp_name, "status": status, "token": parameters.pop("token")}
                        log.info(json_insert_pod)
                        log.info("---------------!!!!!!!!!")
                        try:
                            result = kclient.rpc_exec(json_insert_pod)
                            log.info(result)
                            if result == "success":
                                log.info("update status success")
                                pass
                            else:
                                log.error("pod status update error")
                                return
                        except Exception, e:
                            log.error("pod status update error,reason=%s" % e)
                        try:
                            notification.notify_result(parameters.get("namespace"), svc_name, 402, 300, 200)
                        except Exception, e:
                            log.error('notify error, reason=%s' % e)
                    elif json.loads(response).get("code") is not None:
                        r_name = parameters.get("metadata").get("name")
                        pp_name = r_name.replace(parameters.get("namespace"), "")
                        json_insert_pod = {"user_id": user_id, "user_name": parameters.get("namespace"), "service_name":
                                           pp_name, "token": parameters.get("token"), "status": "fail"}
                        log.info("ooooooooooooo==%s" % json_insert_pod)
                        try:
                            kclient.rpc_exec(json_insert_pod)
                        except Exception, e:
                            log.error('to es error, reason=%s' % e)
                        try:
                            notification.notify_result(parameters.get("namespace"), svc_name, 402, 300, 301)
                        except Exception, e:
                            log.error('notify error, reason=%s' % e)

            if namespace is None and name is None:
                json_to = {'rtype': resource}
                if action.upper() == 'GET':
                    response = AllApiMethods.get_noup_resource(json_to)
                    return response
                if action.upper() == 'POST':
                    response = AllApiMethods.post_nohup_resource(json_to)
                    return response

        # 个别具有很多特别路径及方法的资源api单独实现
        # 像pods这样的资源在进行消息封装时,暂实现为基于封装键为'other'的json项
        elif resource == 'pods' and other:
            json_to = {'namespace': namespace, 'name': name}
            if action.upper() == 'GET':
                if other == 'exec':
                    response = AllApiMethods.get_pods_exec(json_to)
                    return response
                if other == 'portforward':
                    response = AllApiMethods.get_pods_portforward(json_to)
                    return response
                if other == 'log':
                    response = AllApiMethods.get_pods_log(json_to)
                    return response
                else:
                    return False
            if action.upper() == 'POST':
                if other == 'exec':
                    response = AllApiMethods.post_pods_exec(json_to)
                    return response
                if other == 'portforward':
                    response = AllApiMethods.post_pods_portforward(json_to)
                    return response
                if other == 'binding':
                    response = AllApiMethods.post_pods_binding(json_to)
                    return response
                else:
                    return False
