# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/06

import json
from flask import request
# from common.time_log import time_log
from common.logs import logging as log
from common.code import request_result
from common.token_ucenterauth import token_auth
from rpcapi.rpc_client import KubernetesRpcClient


class KubernetesClientApi(object):
    def __init__(self):
        pass

    kuber = KubernetesRpcClient()

    @classmethod
    def create_service(cls, service_name):

        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return json.dumps(request_result(201))

        try:
            context = json.loads(request.get_data())
            context['token'] = token
            context['service_name'] = service_name
            context.update(token_ret.get('result'))
        except Exception, e:
            log.error("parameters error,reason=%s" % e)
            return json.dumps(request_result(101))

        ret = cls.kuber.create_services(context)

        return json.dumps(ret)

    @classmethod
    def get_all_service(cls):

        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return json.dumps(request_result(201))

        context = token_ret.get('result')
        context['service_name'] = request.args.get('service_name',)
        ret = cls.kuber.query_service(context)

        return json.dumps(ret)

    @classmethod
    def detail_service(cls, service_name):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error, reason=%s' % e)
            return json.dumps(request_result(201))

        context = token_ret.get('result')
        context['service_name'] = service_name

        ret = cls.kuber.detail_service(context)

        return json.dumps(ret)

    @classmethod
    def del_service(cls, service_name):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return json.dumps(request_result(201))

        context = token_ret.get('result')
        context['service_name'] = service_name

        ret = cls.kuber.delete_service(context)

        return json.dumps(ret)

    @classmethod
    def put_service(cls, service_name, rtype):
        try:
            token = request.headers.get('token')
            token_ret = token_auth(token)
        except Exception, e:
            log.error('Token check error,reason=%s' % e)
            return json.dumps(request_result(201))

        context = token_ret.get('result')
        context['service_name'] = service_name
        context['token'] = token
        context['rtype'] = rtype

        try:
            in_data = json.loads(request.get_data())
            if not in_data and rtype == 'container':
                return json.dumps(request_result(101))
            context.update(in_data)
        except Exception, e:
            log.error('parameters error, reason is: %s' % e)
            return json.dumps(request_result(101))

        ret = cls.kuber.update_service(context)
        return json.dumps(ret)

    @classmethod
    def put_container(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))

        json_list = json.loads(request.get_data())
        json_name = {"service_name": service_name, "user_id": user_id,
                     "user_name": user_name, "type": "container",
                     "user_orga": user_orga, "role_uuid": role_uuid}

        json_list.update(json_name)
        json_list["token"] = token_get1
        # cname, domain, containerPort = GetAll.get_cname_and_domain(json_list)
        # aaa = {"containerPort": containerPort, "domain": domain}
        # json_list.update(aaa)
        controller = SheetController()
        try:
            rest = controller.update_service(json_list)
            if int(rest.get("status")) != 0:
                log.error(rest)
                return json.dumps(code.request_result(502))
            response = controller.update_container(json_list)
            if int(response.get("status")) != 0:
                log.error(response)
                return json.dumps(code.request_result(502))
            return json.dumps(response)
        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def put_volume(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name,  "user_orga": user_orga, "role_uuid": role_uuid}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_name = {"token": token_get1, "service_name": service_name, "user_id": user_msg.get("user_id"),
                     "user_name": user_name, "user_orga": user_orga, "role_uuid": role_uuid, "type": "volume"}
        json_list.update(json_name)
        controller = SheetController()
        try:
            rest = controller.update_service(json_list)
            if int(rest.get("status")) != 0:
                return json.dumps(code.request_result(502))
            log.info(json_list)
            response = controller.update_volume(json_list)
            if int(response.get("status")) != 0:
                return json.dumps(code.request_result(502))

            return json.dumps(response)

        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def put_env(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name,
                     "type": "env",  "user_orga": user_orga, "role_uuid": role_uuid}

        json_list.update(json_name)
        json_list["token"] = token_get1
        controller = SheetController()
        try:
            rest = controller.update_service(json_list)

            if int(rest.get("status")) != 0:
                log.error(rest)
                return json.dumps(code.request_result(502))
            response = controller.update_env(json_list)
            if int(response.get("status")) != 0:
                log.error(response)
                return json.dumps(code.request_result(502))

            return json.dumps(response)

        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def put_cm(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name,
                     "type": "limits",  "user_orga": user_orga, "role_uuid": role_uuid}
        json_list["token"] = token_get1
        json_list.update(json_name)
        try:
            controller = SheetController()
            rest = controller.update_service(json_list)
            response = controller.update_cm(json_list)
            if int(rest.get("status")) == 0 and int(response.get("status")) == 0:
                return json.dumps(response)
            else:
                return json.dumps(code.request_result(502))

        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def start_service(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name,
                     "user_orga": user_orga, "role_uuid": role_uuid}
        json_get = json.loads(request.get_data())

        if json_get.get("operate") == "start":
            json_list["token"] = token_get1
            log.info(json_list)
            response = SheetModel.start_svc(json_list)
            return json.dumps(response)
        if json_get.get("operate") == "stop":
            response = SheetModel.stop_svc(json_list)
            return json.dumps(response)
    '''
    @classmethod
    def telescopic(cls, service_name):
        pass
    '''
        response = {}
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name, "service_name": service_name,
                        "tel": "tel", "user_orga": user_orga, "role_uuid": role_uuid, "token": token_get1}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_list.update(user_msg)
        try:
            response = SheetModel.elastic_telescopic(json_list)
        except Exception, e:
            log.error("elastic telescopic error, reason = %s" % e)
        return json.dumps(response)
    '''

    @classmethod
    def pod_message(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name, "service_name": service_name,
                        "user_orga": user_orga, "role_uuid": role_uuid}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        try:
            response = pod_messages(user_msg)
            return json.dumps(response)
        except Exception, e:
            log.error("get the message of pod error,reason=%s" % e)
    '''
    @classmethod
    def update_status(cls):
        pass
    '''
        json_list = json.loads(request.get_data())
        try:
            response = Up.update_status(json_list)
            return json.dumps(response)
        except Exception, e:
            log.error("status update error, reason=%s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def put_auto_startup(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name,
                     "type": "auto_startup",  "user_orga": user_orga, "role_uuid": role_uuid}

        json_list["token"] = token_get1
        json_list["auto"] = "auto"
        json_list.update(json_name)
        try:
            controller = SheetController()
            rest = controller.update_service(json_list)
            response = controller.update_cm(json_list)

            if int(rest.get("status")) == 0 and int(response.get("status")) == 0:
                return json.dumps(response)
            else:
                return json.dumps(code.request_result(502))

        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''

    @classmethod
    def put_policy(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name,
                     "user_orga": user_orga, "role_uuid": role_uuid}
        json_list["token"] = token_get1
        json_list.update(json_name)
        try:
            controller = SheetController()
            response = controller.update_service(json_list)
            return json.dumps(response)
        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def put_command(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name}
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name,
                     "user_orga": user_orga, "role_uuid": role_uuid}
        json_list["token"] = token_get1
        json_list.update(json_name)
        try:
            controller = SheetController()
            controller.update_service(json_list)
            response = controller.update_cm(json_list)

            return json.dumps(response)
        except Exception, e:
            log.error("update error, reason = %s" % e)
            return json.dumps(code.request_result(502))
    '''
    @classmethod
    def get_uuid(cls, service_name):
        pass
    '''
        try:
            return json.dumps(get_id(service_name))
        except Exception, e:
            log.error("get the uuid error, reason=%s" % e)
            return json.dumps(code.request_result(404))
    '''
    @classmethod
    def change_domain(cls, service_name):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        change_info = {"service_name": service_name, "cname": json_list.get("cname"),"identify":json_list.get("identify"),
                       "domain": json_list.get("domain"), "rtype": "domain_change", "token": token_get1,
                       "user_id": user_id, "user_name": user_name, "user_orga": user_orga, "role_uuid": role_uuid}

        change = ChangeDomain()
        try:
            return json.dumps(change.domain(change_info))
        except Exception, e:
            log.error("change the domain error, reason=%s" % e)
            return code.request_result(502)
    '''
    @classmethod
    def domain_identify(cls):
        pass
    '''
        try:
            token_get1 = request.headers.get("token")
            token_get2 = token_get1.decode("utf-8")
            token_get = token_get2.encode("utf-8")
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_data = json.loads(request.get_data())
        change_info = {"domain": json_data.get("domain"), "identify": json_data.get("identify"), "user_name": user_name,
                       "user_orga": user_orga, "role_uuid": role_uuid, "user_id": user_id, "token": token_get1}
        change = ChangeDomain()
        try:
            return json.dumps(change.change_identify(change_info))
        except Exception, e:
            log.error("change the domain identify error, reason=%s" % e)
            return code.request_result(502)
    '''