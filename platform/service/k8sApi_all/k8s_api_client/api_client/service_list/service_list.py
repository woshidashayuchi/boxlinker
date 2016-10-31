#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author: wang-xf

import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from common.logs import logging as log
from data import DataOrm
from data_controller import LogicModel
from response_code import code
import re


class ServiceList(object):
    def __init__(self):
        pass

    def base_list(self, json_list):
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        result_one = []
        try:
            if json_list.get("service_name") is None:
                select_rc = DataOrm.query_sql(json_list)
                select_co = DataOrm.list_container(json_list)
            else:
                select_one = DataOrm.query_only(json_list)
                resu = logicmodel.exeQuery(cur, select_one)
                for j in resu:
                    match_string = "[a-zA-Z0-9-_]*%s[a-zA-Z0-9-_]*" % str(json_list.get("service_name"))
                    if re.search(match_string, j.get("fservice_name")):
                        up_json = {"user_id": json_list.get("user_id"), "service_name": j.get("fservice_name")}
                        select_rc = DataOrm.query_sql(up_json)
                        logicmodel = LogicModel()
                        conn, cur = logicmodel.connection()
                        resu1 = logicmodel.exeQuery(cur, select_rc)
                        for i in resu1:
                            time_list = {}
                            update_time = str(i.get("ltime"))
                            time_list["ltime"] = DataOrm.time_diff(update_time)
                            i.update(time_list)
                        result_one.append(i)
                    else:
                        pass

                select_co = DataOrm.list_container(json_list)
                con_resu = logicmodel.exeQuery(cur, select_co)

                result_two = []
                kkkk = []
                for h in con_resu:
                    kkkk.append(h)

                for x in result_one:

                    x["container"] = []

                    for y in kkkk:
                        if x["rc_name"] == y["service_name"]:

                            x["container"].append(y)

                    if len(x["container"]) != 0:
                        result_two.append(x)

                result = code.request_result(0, result_two)
                logicmodel.connClose(conn, cur)
                return result
        except Exception, e:
            log.warning('k8sapi get some in_all running error, reason=%s'
                        % (e))
            result = code.request_result(101)
            return result


        try:
            print(select_rc)
            resu_cu = logicmodel.exeQuery(cur, select_rc)
            for i in resu_cu:
                update_time = str(i.get("ltime"))
                time_list = {}
                difftime = DataOrm.time_diff(update_time)
                time_list["ltime"] = difftime
                i.update(time_list)
                result_one.append(i)

        except Exception, e:
            log.warning('k8sapi get all running error, reason=%s'
                        % (e))
            result = code.request_result(404)
            return result

        try:
            con_resu = logicmodel.exeQuery(cur, select_co)

            kkkk = []
            result_two = []

            for h in con_resu:
                kkkk.append(h)

            for x in result_one:
                x["container"] = []
                for y in kkkk:
                    if x.get("rc_name") == y.get("service_name"):
                        x["container"].append(y)

                if len(x["container"]) != 0:
                    result_two.append(x)

            result = code.request_result(0, result_two)
            logicmodel.connClose(conn, cur)
            return result

        except Exception, e:
            log.error("containers list create error, reason=%s" % e)
