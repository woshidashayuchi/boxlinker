# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

import re
from db.service_db import ServiceDB
from driver.rpcapi_client import KubernetesRpcClient
from common.logs import logging as log
from common.code import request_result
# from common.parameters import rc_data


class CreateManager(object):

    def __init__(self):
        self.service_db = ServiceDB()
        self.krpc_client = KubernetesRpcClient()

    def check_name(self, context):
        try:
            using_name_info = self.service_db.name_if_used_check(context)
            if len(using_name_info) != 0:
                return False
        except Exception, e:
            log.error('Database select error when check the name..., reason=%s' % e)
            return 'error'

        return True

    def infix_db(self, context):
        try:
            infix = self.service_db.infix_db(context)
            log.info('the infix result is %s,type is %s' % (infix, type(infix)))
            if infix is not None:
                return False
        except Exception, e:
            log.error('Database infix error when create the service..., reason=%s' % e)
            return False

        return True

    def service_domain(self, context):
        ser = context.get("container")
        service_name = context.get("service_name")
        user_name = context.get("user_name")
        using_port = None
        tcp_lb = ""
        http_lb = ""
        m = 1

        for i in ser:
            domain_http = "%s-%s.lb1.boxlinker.com:" % (user_name, service_name)
            if i.get("access_mode").upper() == "HTTP" and i.get("access_scope") == "outsisde":
                http_lbadd = domain_http + str(i.get("container_port"))
                if http_lb == "":
                    http_lb = http_lb + http_lbadd
                else:
                    http_lb = http_lb + "," + http_lbadd
            if i.get("access_mode").upper() == "TCP" and i.get("access_scope") == "outsisde":

                resu = self.service_db.max_used_port()
                log.info('get the max port is %s, yuan=%s' % (str(resu[0][0]), resu))

                if len(resu) != 0 and resu[0][0] is not None:
                    using_port = resu[0][0]
                if using_port is None:
                    ran_port = "30000"
                    tcp_lb = "%s:%s" % (ran_port, i.get("container_port"))
                else:
                    ran_port = int(using_port)+m
                    m += 1
                    if tcp_lb == "":
                        tcp_lb = "%s:%s" % (ran_port, i.get("container_port"))
                    else:
                        tcp_lb = tcp_lb+"," + "%s:%s" % (ran_port, i.get("container_port"))

                i["tcp_port"] = ran_port

        container = {"container": ser}

        return http_lb, tcp_lb, container

    def container_domain(self, dict_data):
        http_lb, tcp_lb, tcp_port = self.service_domain(dict_data)
        log.info('http_lb=%s,tcp_lb=%s,tcp_port=%s' % (http_lb, tcp_lb, tcp_port))

        container = tcp_port.get("container")
        newcon = []

        if http_lb != "":
            for i in re.split(",", http_lb):
                num = i.rfind(":")
                c_port = i[num+1:]
                http_domain = i[:num]

                for j in container:
                    if j.get("access_scope") == "inside" and j.get("access_mode").upper() == "HTTP":
                        j["http_domain"] = None
                    if str(j.get("container_port")) == str(c_port) and j.get("access_mode").upper() == "HTTP":
                        j["http_domain"] = http_domain
                        newcon.append(j)

        if tcp_lb != "":
            for x in re.split(",", tcp_lb):
                num = x.rfind(":")
                c_port = x[num+1:]
                tcp_domain = "lb1.boxlinker.com" + ":" + x[:num]
                # tcp_domain = "boxlinker.com" + ":" + x[:num]
                for y in container:
                    if y.get("access_mode").upper() == "TCP" and y.get("access_scope") == "inside":
                        y["tcp_domain"] = None
                    if str(y.get("container_port")) == str(c_port) and y.get("access_mode").upper() == "TCP":
                        y["tcp_domain"] = tcp_domain
                        newcon.append(y)

        for i in container:

            if i.get("access_scope") == "inside" or i.get("access_mode") == "":
                i["http_domain"] = ""
                i["tcp_domain"] = ""
                newcon.append(i)

        return {'container': newcon}

    def diff_infix_db(self, dict_data):
        try:
            rc_uuid = self.service_db.get_rc_uuid(dict_data)[0][0]
        except Exception, e:
            log.error('Database error when get the rc_uuid...,reason=%s' % e)
            return False

        container = dict_data.get('container')
        env = dict_data.get('env')
        volume = dict_data.get('volume')

        if container is not None and len(container) != 0:
            for i in container:
                i['rc_uuid'] = rc_uuid
                try:
                    infix = self.service_db.container_infix_db(i)
                except Exception, e:
                    log.error('Database error when infix the containers...,reason=%s' % e)
                    return False

                if infix is not None:
                    return False

        if env is not None and len(env) != 0:
            for j in env:
                j['rc_uuid'] = rc_uuid
                try:
                    infix_env = self.service_db.env_infix_db(j)
                except Exception, e:
                    log.error('Database error when infix the env...,reason=%s' % e)
                    return False

                if infix_env is not None:
                    return False

        return True

    def service_create(self, context):
        log.info('the create service data is: %s' % context)

        check_name = self.check_name(context)
        if check_name is False:
            return request_result(301)
        if check_name == 'error':
            return request_result(404)

        infix = self.infix_db(context)

        # 构建http_doamin与tcp_domain
        domain = self.container_domain(context)
        context.update(domain)

        diff = self.diff_infix_db(context)

        if infix is False or diff is False:
            return request_result(401)

        return self.krpc_client.create_services(context)
