#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/8
# Author:王晓峰
import random
import sys
p_path = sys.path[0] + '/..'
from data import DataOrm
from data_controller import LogicModel
from common.logs import logging as log


class ArrayIterator(object):

    def __init__(self):
        pass

    @classmethod
    def container(cls, con):
        result = []
        for i in con:
            container_port = i.get("container_port")
            protocol = i.get("protocol")
            # access_mode = i.get("access_mode")
            # access_scope = i.get("access_scope")
            result1 = {"containerPort": container_port, "protocol": protocol.upper()}
            result.append(result1)
        print(result)
        return result

    @classmethod
    def env(cls, en):
        result = []
        if en is None:
            pass
        else:
            for i in en:
                env_name = i.get("env_key")
                env_value = i.get("env_value")
                result1 = {"name": env_name, "value": env_value}
                result.append(result1)
        return result

    @classmethod
    def service_port(cls, ser):
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
            else:
                pass
        return result

    @classmethod
    def service_domain(cls, json_list):
        ser = json_list.get("container")
        service_name = json_list.get("service_name")
        user_name = json_list.get("user_name")
        using_port = ""
        tcp_lb = ""
        http_lb = ""
        m = 1
        for i in ser:
            domain_http = "%s-%s%s.lb1.boxlinker.com:" % (user_name, service_name, i.get("container_port"))
            log.info("-------------------%s" % i)
            if i.get("access_mode").upper() == "HTTP":
                http_lbadd = domain_http + i.get("container_port")
                if http_lb == "":
                    http_lb = http_lb + http_lbadd
                else:
                    http_lb = http_lb + "," + http_lbadd
            elif i.get("access_mode").upper() == "TCP":

                logical = LogicModel()
                conn, cur = logical.connection()
                select_max_port = DataOrm.max_tcp_port()
                resu1 = logical.exeQuery(cur, select_max_port)
                for n in resu1:
                    log.info("&&&&&&&,n=%s,&&&&&,x=%s" % (n, n.get("tcp_port")))
                    using_port = n.get("tcp_port")
                if using_port is None:
                    ran_port = "30000"
                    tcp_lb = "%s:%s" % (ran_port, i.get("container_port"))
                    pass
                else:

                    ran_port = int(n.get("tcp_port"))+m
                    m += 1
                    if tcp_lb == "":
                        tcp_lb = "%s:%s" % (ran_port, i.get("container_port"))
                    else:
                        tcp_lb = tcp_lb+"," + "%s:%s" % (ran_port, i.get("container_port"))

                i["tcp_port"] = ran_port

                logical.connClose(conn, cur)

        tcp_port = {"container": ser}

        return http_lb, tcp_lb, tcp_port

    @classmethod
    def command_query(cls, json_list):
        log.info("command=%s,%s"%(type(json_list.get("command")),json_list.get("command")))
        if json_list.get("command") != "" and json_list.get("command") is not None:
            com = json_list.get("command")
            command = com.split(",")
            log.info(command)
            return command
        else:
            return None
