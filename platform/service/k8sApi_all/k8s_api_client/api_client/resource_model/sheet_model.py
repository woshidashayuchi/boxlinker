#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/28
# Author:xiaofengwang
import sys
p_path = sys.path[0] + '/..'
sys.path.append(p_path)
from kubernetes_client import KubernetesClient
from common.logs import logging as log
from delete_pod import DeletePod
from create_json import SourceModel
from data_detail import GetDetails
from response_code import code
from podstatus_monitor.base_call import base_result
from data import DataOrm
from data_controller import LogicModel


class SheetModel(object):
    def __init__(self):
        pass

    @classmethod
    def start_svc(cls, json_list):
        source = SourceModel()
        json_data = GetDetails.get_details(json_list)
        json_data["operate"] = "start"
        update_json = source.create_json(json_data)
        log.info(update_json)
        json_to = {"action": "put", "resources_type": "replicationcontrollers", "parameters": update_json}
        kubeclient = KubernetesClient()
        try:
            rest = kubeclient.rpc_name(json_to)

            if rest != "<Response [200]>":
                log.error("start resource error, reason=%s" % rest)
                return code.request_result(502)
            base_result("Running", json_list)
            return code.request_result(0, "started")
        except Exception, e:
            log.error("resource update error, reason=%s" % e)
            return code.request_result(502)
        # json_list需要参数user_id service_name

    @classmethod
    def stop_svc(cls, json_list):  # json_list需要参数:service_name, user_id, pods_num
        sourceModel = SourceModel()
        delete_pod = sourceModel.delete_pod(json_list)
        kubeclient = KubernetesClient()
        log.info("aaaaaaaaaaaaaa")
        log.info(delete_pod)
        delete_pod1 = {"action": "put", "resources_type": "replicationcontrollers", "parameters": delete_pod}
        try:
            rest = kubeclient.rpc_name(delete_pod1)

            if rest != "<Response [200]>":
                log.error("stop resource error, reason=%s" % rest)
                return code.request_result(502)
            return code.request_result(0, "stopped")
        except Exception, e:
            log.error("kubernetes update error, reason=%s" % e)
            return code.request_result(502)
        # try:
        #    rest = DeletePod.delete_pod(json_list)
        #    if rest == "error":
        #        return code.request_result(502)
        #    base_result("Stopping", json_list)
        #    return code.request_result(0, "stopped")
        # except Exception, e:
        #    log.error("pod delete error, reason=%s" % e)
        #    return code.request_result(502)

    @classmethod
    def elastic_telescopic(cls, json_list):
        up_sql = ""

        log.info(json_list)
        source = SourceModel()
        json_data = GetDetails.get_details(json_list)
        update_json = source.create_json(json_data)
        log.info(update_json)
        podss_num = {"replicas": int(json_list.get("pods_num"))}
        log.info(podss_num)
        update_json.get("spec").update(podss_num)

        log.info(update_json)
        json_to = {"action": "put", "resources_type": "replicationcontrollers", "parameters": update_json}
        kubeclient = KubernetesClient()
        try:
            rest = kubeclient.rpc_name(json_to)
            if rest != "<Response [200]>":
                log.error("start resource error, reason=%s" % rest)
                return code.request_result(502)
            base_result("running", json_list)

        except Exception, e:
            log.error("resource update error, reason=%s" % e)
            return code.request_result(502)
        try:
            up_sql = DataOrm.update_pnum(json_list)
        except Exception, e:
            log.error("update sql create error, reason = %s" % e)
            return code.request_result(403)
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        try:
            logicmodel.exeUpdate(cur, up_sql)
        except Exception, e:
            log.error("database update error, reason=%s" % e)
            return code.request_result(403)
        logicmodel.connClose(conn, cur)

        return code.request_result(0, "update success")
