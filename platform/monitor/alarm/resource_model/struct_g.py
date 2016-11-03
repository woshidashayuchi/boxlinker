#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/17
# Author:wang-xf

import sys
import urllib
import json
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log


class MonitorAct(object):
    def __init__(self):
        pass

    def nape(self, json_data):
        result = []
        rtype = json_data.get("rtype")
        if rtype == "cpu":
            result.append("cpu/usage_rate")
            result.append("cpu/limit")
            result.append("cpu/request")
            return result
        if rtype == "memory":
            result.append("memory/usage")
            result.append("memory/working_set")
            result.append("memory/limit")
            result.append("memory/request")
            return result
        if rtype == "filesystem":
            result.append("filesystem/usage")
            result.append("filesystem/limit")
            return result

    def struct(self, json_data):
        node_name = json_data.get("node_name")
        time_long = json_data.get("time_long")
        rtype = json_data.get("rtype")
        result = json_data.get("result")
        STATICFONT = "http://grafana.boxlinker.com/api/datasources/proxy/1/query?db=k8s&q="

        if rtype == "cpu":

            STATICCPU = "SELECT sum(\"value\") FROM \"%s\" WHERE \"type\" = 'node' " \
                        "AND \"nodename\" =~ /'node_name'$/ " \
                        "AND time > now() - %s GROUP BY time(1m), \"nodename\" fill(null);SELECT sum(\"value\") " \
                        "FROM \"%s\" WHERE \"type\" = 'node' " \
                        "AND \"nodename\" =~ /'node_name'$/ AND time > now() - %s GROUP BY time(1m), " \
                        "\"nodename\" fill(null);SELECT sum(\"value\") FROM \"%s\" WHERE \"type\" = 'node' " \
                        "AND \"nodename\" =~ /'node_name'$/ AND time > now() - %s GROUP BY time(1m), " \
                        "\"nodename\" fill(null)&epoch=ms" % (result[0], time_long, result[1],
                                                              time_long, result[2], time_long)
            if node_name is None or node_name == "":
                c_sql = STATICCPU.replace("AND \"nodename\" =~ /'node_name'$/", "")
                return STATICFONT+c_sql
            else:
                c_sql = STATICCPU.replace("node_name", node_name)
                return STATICFONT+c_sql
        elif rtype == "memory":
            STATICMEMORY = "SELECT sum(\"value\") FROM \"%s\" WHERE \"type\" = 'node' " \
                           "AND \"nodename\" =~ /'node_name'$/ " \
                           " AND time > now() - %s " \
                           "GROUP BY time(1m) fill(null);SELECT sum(\"value\") FROM \"%s\" " \
                           "WHERE \"type\" = 'node' AND \"nodename\" =~ /'node_name'$/ "\
                           "AND time > now() - %s GROUP BY time(1m) fill(null);SELECT sum(\"value\") FROM \"%s\" " \
                           "WHERE \"type\" = 'node' AND \"nodename\" =~ /'node_name'$/" \
                           "AND time > now() - %s GROUP BY time(1m) fill(null);SELECT sum(\"value\") " \
                           "FROM \"%s\" WHERE \"type\" = 'node' AND \"nodename\" =~ /'node_name'$/ " \
                           "AND time > now() - %s GROUP BY time(1m) " \
                           "fill(null)&epoch=ms " % (result[0], time_long, result[1], time_long,
                                                     result[2], time_long, result[3], time_long)
            if node_name is None or node_name == "":
                m_sql = STATICMEMORY.replace("AND \"nodename\" =~ /'node_name'$/", "")
                return STATICFONT+m_sql
            else:
                m_sql = STATICMEMORY.replace("node_name", node_name)
                return STATICFONT+m_sql
        elif rtype == "filesystem":
            STATICFILESYSTEM = "SELECT sum(\"value\") FROM \"%s\" WHERE \"type\" = 'node' " \
                               "AND \"nodename\" =~ /'node_name'$/ " \
                               "AND time > now() - %s GROUP BY time(1m) fill(null);SELECT sum(\"value\") FROM " \
                               "\"%s\" WHERE \"type\" = 'node' AND \"nodename\" =~ /'node_name'$/  " \
                               "AND time > now() - %s GROUP BY time(1m) " \
                               "fill(null)&epoch=ms" % (result[0], time_long, result[1], time_long)
            if node_name is None or node_name == "":
                f_sql = STATICFILESYSTEM.replace("AND \"nodename\" =~ /'node_name'$/", "")
                return STATICFONT+f_sql
            else:
                f_sql = STATICFILESYSTEM.replace("node_name", node_name)
                return STATICFONT+f_sql
        else:
            return "error"

    def count_msg(self, json_data):
        log.info("----------------+++%s" % json_data)
        result = self.nape(json_data)
        log.info(result)
        json_data["result"] = result
        url = self.struct(json_data)
        rest = ""
        try:
            rest = json.loads(urllib.urlopen(url).read())
        except Exception, e:
            log.info(rest)
            log.error("get the node message error, reason= %s" % e)

        log.info("rest type is %s,data is %s" % (type(rest), rest))
        return rest


