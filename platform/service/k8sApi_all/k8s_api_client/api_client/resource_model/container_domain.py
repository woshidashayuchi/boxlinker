#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/8
# Author:王晓峰

from array_iterator import ArrayIterator
import re
from common.logs import logging as log


class ContainerDomain(object):
    def __init__(self):
        pass

    def container_domain(self,json_list):
        http_lb, tcp_lb, tcp_port = ArrayIterator.service_domain(json_list)
        log.info("^^^^^^^^^^^^^^^^^^^^^^^^^")
        log.info(tcp_port)
        log.info("^^^^^^^^^^^^^^^^^^^^^^^^^")
        container = tcp_port.get("container")
        newcon = []
        if http_lb == "":
            pass
        else:
            for i in re.split(",", http_lb):
                num = i.rfind(":")
                c_port = i[num+1:]
                http_domain = i[:num]
                log.info("http_domain=============%s" % http_domain)
                for j in container:
                    if j.get("container_port") == c_port and j.get("access_mode").upper() == "HTTP":
                        j["http_domain"] = http_domain
                        newcon.append(j)
        if tcp_lb == "":
            pass
        else:
            for x in re.split(",", tcp_lb):
                num = x.rfind(":")
                c_port = x[num+1:]
                log.info("c_port===============%s" % c_port)
                tcp_domain = "lb1.boxlinker.com" + ":" + x[:num]
                log.info("tcp_domain=============%s" % tcp_domain)
                for y in container:
                    if y.get("container_port") == c_port and y.get("access_mode").upper() == "TCP":
                        log.info("container_port===========%s" % y.get("container_port"))
                        log.info("access_mode===========%s" % y.get("access_mode"))
                        y["tcp_domain"] = tcp_domain
                        newcon.append(y)

        return newcon
