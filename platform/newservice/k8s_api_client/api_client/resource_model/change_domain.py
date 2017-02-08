#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/12/19
# Author:王晓峰

import sys
p_path = sys.path[0] + '/../..'
x_path = sys.path[0] + '/..'
sys.path.append(p_path)
sys.path.append(x_path)
from service_acl.acl_code.acl_model.controller import Controller
from common.logs import logging as log
from data import DataOrm
from data_controller import LogicModel
import re
from response_code.code import request_result
from sheet_controller import SheetController
import requests
import json
import os


class ChangeDomain(object):
    def __init__(self):
        pass

    @staticmethod
    def check_domain(json_data):
        response = 1
        domain = json_data.get("domain")
        try:
            domain_used = DataOrm.change_domain()
        except Exception, e:
            log.error("create the sql error, reason=%s" % e)
            return "error"
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        try:
            resu = logicmodel.exeQuery(cur, domain_used)
        except Exception, e:
            log.error("get the used domain error, reason=%s" % e)
            return "error"
        logicmodel.connClose(conn, cur)
        for i in resu:
            if i.get("private_domain") == "" or i.get("private_domain") is None:
                pass
            else:
                for j in re.split(",", i.get("private_domain")):
                    if j == domain:
                        response = 0

        return response

    @staticmethod
    def change_service(json_data):
        controller = SheetController()
        rest = controller.update_service(json_data)
        return rest

    @staticmethod
    def get_orga_id(json_list):
        # 得到服务的orga_id
        orga_id = ""
        try:
            get_sql = DataOrm.get_orga_id(json_list)
            logical = LogicModel()
            conn, cur = logical.connection()
            result = logical.exeQuery(cur, get_sql)
            for i in result:
                orga_id = i.get("orga_id")
            logical.connClose(conn, cur)
            return orga_id

        except Exception, e:
            log.error("get the orga_id error, reason=%s" % e)

    @staticmethod
    def up_http_domain(json_list):
        if json_list.get("identify_info") == "identify":
            pass

    def get_orga_name(self, json_list):
        # get orga_id
        orga_id = self.get_orga_id(json_list)
        # 得到组织名
        try:
            url = "http://auth:80/api/v1.0/usercenter/orgs/%s" % orga_id
            log.info("orga++++++>>>>>%s" % orga_id)
            header = {"token": json_list.get("token")}
            response = json.loads(requests.get(url, headers=header).text)
            log.info(response)
            if response.get("status") == 0:
                orga_name = response.get("result").get("orga_name")
                return orga_name, orga_id
            else:
                log.error("can't get the orga message+++++++")
                return 0, 0
        except Exception, e:
            log.error("get the orga_name error, reason=%s" % e)
            return 0, 0

    def get_cname(self, json_list):
        orga_id = self.get_orga_id(json_list)
        json_list["user_orga"] = orga_id
        get_sql = DataOrm.detail_containers(json_list)
        logical = LogicModel()
        conn, cur = logical.connection()
        result = logical.exeQuery(cur, get_sql)
        cname = ""
        for i in result:
            cname = i.get("http_domain")
        logical.connClose(conn, cur)
        return cname

    def change_svc(self, json_data):
        domain = json_data.get("domain")
        service_name = ""
        # 获取组织名
        orga_name, orga_id = self.get_orga_name(json_data)
        if orga_id == 0:
            return 2
        a = {"user_name": orga_name, "user_orga": orga_id}
        json_data.update(a)
        # 获取服务名
        try:
            sql = DataOrm.get_service_name(domain)
            logical = LogicModel()
            conn, cur = logical.connection()
            result = logical.exeQuery(cur, sql)
            for i in result:
                service_name = i.get("service_name")
            logical.connClose(conn, cur)
        except Exception, e:
            log.error("get the service_name error, reason=%s" % e)
        json_data["rtype"] = "domain_change"
        json_data["service_name"] = service_name
        try:
            cname = self.get_cname(json_data)
            json_data["cname"] = cname
        except Exception, e:
            log.error("get the cname error, reason=%s" % e)
        try:
            sheet = SheetController()
            response = sheet.update_service(json_data)
            log.info("the---------------response=%s" % response)
            if response.get("status") == 0:
                return 0
        except Exception, e:
            log.error("update the service is error, reason=%s" % e)
            return 1

    def domain(self, json_data):
        try:
            check_name = self.check_domain(json_data)
            log.info("check_name========%s" % check_name)
            if check_name == 0:
                return request_result(301)
        except Exception, e:
            log.error("check the domain_name error,reason=%s" % e)
            return request_result(502)

        try:
            return self.change_service(json_data)
        except Exception, e:
            log.error("change the service error, reason=%s" % e)
            return request_result(502)

    def change_identify(self, json_list):
        # 权限验证,非管理员无权操作
        acl = Controller()
        if int(acl.domain_identify_acl(json_list)) == 0:
            return request_result(202)
        # 更改数据库(认证是否通过)
        result = ""
        try:
            logical = LogicModel()
            conn, cur = logical.connection()
            up_sql = DataOrm.change_domain_identify(json_list)
            result = logical.exeUpdate(cur, up_sql)
            log.info("result===========>>>>>%d" % result)
            logical.connClose(conn, cur)
        except Exception, e:
            log.error("update the database error, reason=%s" % e)
        try:
            if result >= 0:
                # 数据库更改成功,更改服务
                json_list["domain_identify"] = 1
                json_list["identify_info"] = "identify"
                response = self.change_svc(json_list)

                if response == 0:

                    return request_result(0, "update success")

                if response == 2:
                    log.error("token error")
                    return request_result(202)
                else:
                    log.error("bu ming yuanyin==%d" % response)
                    return request_result(502)
            else:
                log.error("database update error")
                return request_result(502)
        except Exception, e:
            log.error("update error, reason=%s" % e)
            return request_result(502)
