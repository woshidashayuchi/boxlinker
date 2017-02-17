#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:wang-xf
from flask import request
from sheet_controller import SheetController
import json
from response_code import code
from token_about.token_for_api import TokenForApi
from common.logs import logging as log
from podstatus_monitor.anytime_update_status import Up
from resource_model.sheet_model import SheetModel
from podstatus_monitor.pod_message import pod_messages
from podstatus_monitor.get_svcid import get_id
from resource_model.change_domain import ChangeDomain
from domain_identify.domain_identify import DomainIdentify


class ApiSource(object):
    def __init__(self):
        pass

    @staticmethod
    def encode_change(get_token):
        token_get1 = get_token.decode("utf-8")
        token_get = token_get1.encode("utf-8")
        return get_token, token_get

    @classmethod
    def create_service(cls, service_name):

        controller = SheetController()

        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
            user_msg = {"user_id": user_id, "user_name": user_name, "user_orga": user_orga, "role_uuid": role_uuid}
        except Exception, e:
            log.error("author registry error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        try:
            json_list = json.loads(request.get_data())
        except Exception, e:
            log.error("parameters error, reason=%s" % e)
            return json.dumps(code.request_result(101))

        show_resource = {"name": user_name}
        if controller.show_namespace(show_resource) != "ok":
            try:
                controller.create_namespace(user_msg)
                controller.create_secret(user_msg)
            except Exception, e:
                log.error("resource create error ,reason =%s" % e)
                return json.dumps(code.request_result(501))
        else:
            log.info("should not create namespace,going...")

        json_name = {"service_name": service_name, "namespace": user_name}
        json_list.update(json_name)
        json_list.update(user_msg)
        json_list["token"] = token_get1

        controller = SheetController()
        response = controller.sheet_controller(json_list)
        return json.dumps(response)

    @classmethod
    def get_all_service(cls):

        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)

        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        try:
            service_name = request.args.get("service_name",)
            json_list = {"user_id": user_id, "user_name": user_name,
                         "user_orga": user_orga, "role_uuid": role_uuid}
            if service_name is not None:
                json_list = {"user_id": user_id, "user_name": user_name,
                             "service_name": service_name,  "user_orga": user_orga,
                             "role_uuid": role_uuid}
            controller = SheetController()
            response = controller.service_list(json_list)
            return json.dumps(response)
        except Exception, e:
            log.error("start error, reason=%s" % e)
            return json.dumps(code.request_result(404))

    @classmethod
    def detail_service(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = {"user_id": user_id, "user_name": user_name,
                     "service_name": service_name,  "user_orga": user_orga, "role_uuid": role_uuid}
        controller = SheetController()
        response = controller.detail_service(json_list)
        return json.dumps(response)

    @classmethod
    def del_service(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = {"token": token_get1, "service_name": service_name,
                     "user_name": user_name, "namespace": user_name, "user_id": user_id,
                     "user_orga": user_orga, "role_uuid": role_uuid}
        controller = SheetController()
        response = controller.del_service(json_list)
        return json.dumps(response)

    @classmethod
    def put_service(cls, service_name):
        json_list = dict()
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list1 = json.loads(request.get_data())
        try:
            json_list = {"service_name": service_name, "user_id": user_id, "user_name": user_name,
                         "user_orga": user_orga, "role_uuid": role_uuid}
            json_list = json.loads(json.dumps(json_list))
            json_list.update(json_list1)
            json_list["token"] = token_get1
        except Exception, e:
            log.error("error=%s" % e)
        controller = SheetController()
        response = controller.update_service(json_list)
        return json.dumps(response)

    @classmethod
    def put_container(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def put_volume(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def put_env(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def put_cm(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def start_service(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def telescopic(cls, service_name):
        response = {}
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def pod_message(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def update_status(cls):
        json_list = json.loads(request.get_data())
        try:
            response = Up.update_status(json_list)
            return json.dumps(response)
        except Exception, e:
            log.error("status update error, reason=%s" % e)
            return json.dumps(code.request_result(502))

    @classmethod
    def put_auto_startup(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def put_policy(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def put_command(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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

    @classmethod
    def get_uuid(cls, service_name):
        try:
            return json.dumps(get_id(service_name))
        except Exception, e:
            log.error("get the uuid error, reason=%s" % e)
            return json.dumps(code.request_result(404))

    @classmethod
    def change_domain(cls, service_name):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
            user_id, user_name, user_orga, role_uuid = TokenForApi.get_msg(token_get)
        except Exception, e:
            log.error("authentication error, reason=%s" % e)
            return json.dumps(code.request_result(201))
        json_list = json.loads(request.get_data())
        change_info = {"service_name": service_name, "cname": json_list.get("cname"),
                       "domain": json_list.get("domain"), "rtype": "domain_change", "token": token_get1,
                       "user_id": user_id, "user_name": user_name, "user_orga": user_orga, "role_uuid": role_uuid}

        change = ChangeDomain()
        try:
            return json.dumps(change.domain(change_info))
        except Exception, e:
            log.error("change the domain error, reason=%s" % e)
            return code.request_result(502)

    @classmethod
    def domain_identify(cls):
        try:
            token_get1, token_get = cls.encode_change(request.headers.get("token"))
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