#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:王晓峰
from data_controller import LogicModel
import uuid
from kubernetes_client import KubernetesClient
from data import DataOrm
from resource_model.create_json import SourceModel
from response_code import code
from podstatus_monitor.podlist_status import list_status
import re
from es.to_es import post_es
import json
from resource_check.check_name import CheckName
from resource_model.array_iterator import ArrayIterator
from common.logs import logging as log
from notification import notification
from resource_model.container_domain import ContainerDomain
from call_volumn.inner_api import InnerApi
from time import sleep


class SheetController(object):

    def __init__(self):
        pass

    def sheet_controller(self, json_list):

        if json_list.get("volume") is None:
            json_list.pop("token")
        else:
            pass

        try:
            post_es(json_list, 'check the name which you use ok or not')
        except Exception, e:
            log.error("es error, reason=%s" % e)

        log.info("{'userid': '%s', 'log_info': 'check the name which you use ok or not'}"
                 % (json_list.get("user_name")))

        try:
            res = CheckName.check_name(json_list)
            if res == False:
                return code.request_result(301)
            else:
                log.info("{'userid': '%s', 'log_info': 'the name is ok'}"
                         % (json_list.get("user_name")))
        except Exception, e:
            log.error("check the name happend exception, reason=%s" % (e))
            return code.request_result(404)
        source_model = SourceModel()
        uid_rc = str(uuid.uuid4())
        uid_service = str(uuid.uuid4())
        uid_font = str(uuid.uuid4())

        try:

            log.info("{'userid': '%s', 'log_info': 'readying...'}"
                     % (json_list.get("user_name")))

            add_rc = source_model.add_rc(json_list)
            add_service = source_model.add_service(json_list)

            log.info("{'userid': '%s', 'log_info': 'begin create service...'}"
                     % (json_list.get("user_name")))

            if add_rc == "timeout":
                return code.request_result(501)
        except Exception, e:

            log.error('creating the resource_bunch running error, reason=%s'
                      % (e))

            result = code.request_result(101)
            return result

        json_list1 = {"action": "post", "resources_type": "services", "parameters": add_service}
        json_list2 = str(json_list1)

        try:
            log.info("{'userid': '%s', 'log_info': 'creating the service,this maybe need a while...'}"
                        % (json_list.get("user_name")))

            kubernete_sclient = KubernetesClient()
            log.info("AAAAAAAAAAAAAAA---BBBBBBBBBBBBBB")
            log.info("go-------")
            log.info("CCCCCCCCCCCCCCC---DDDDDDDDDDDDDD")
            kubernete_sclient.rpc_exec(json_list2)

            log.info("end------------")

        except Exception, e:
            # log.info("{'userid': '%s', 'log_info': 'oh,no,create faild...'}"
            #            % (json_list.get("user_name")))

            log.error('k8sapi creating the service running error, reason=%s'
                        % (e))

            result = code.request_result(501)
            return result

        # log.info("{'userid': '%s', 'log_info': 'the service has be created'}"
        #             % (json_list.get("user_name")))

        typee = {"rtype": "service", "uid_service": uid_service}
        json_list.update(typee)
        try:
            log.info("{'userid': '%s', 'log_info': 'adding the service message to database...'}"
                     % (json_list.get("user_name")))

            DataOrm.add_method(json_list)

            log.info("{'userid': '%s', 'log_info': 'adding the message sucessful...'}"
                     % (json_list.get("user_name")))

        except Exception, e:
            log.info("{'userid': '%s', 'log_info': 'adding the message faild...'}"
                     % (json_list.get("user_name")))

            log.error('k8sapi entering the resource(service) running error, reason=%s'
                        % (e))
            result = code.request_result(401)
            return result

        add_rc["token"] = json_list.get("token")
        json_list1 = {"action": "post", "resources_type": "replicationcontrollers", "parameters": add_rc}
        json_list2 = str(json_list1)

        try:
            # log.info("{'userid': '%s', 'log_info': 'creating the replicationcontroller and pod...'}"
            #         % (json_list.get("user_name")))
            kubernete_client = KubernetesClient()
            log.info("EEEEEEEEEEEEEEE---BBBBBBBBBBBBBB")
            log.info("go-------")
            log.info("FFFFFFFFFFFFFFF---DDDDDDDDDDDDDD")
            kubernete_client.rpc_exec(json_list2)
            # log.info("{'userid': '%s', 'log_info': 'create the replicationcontroller and pod sucessful...'}"
            #         % (json_list.get("user_name")))
            log.info("ending-----rc---")
        except Exception, e:
            log.error("uuuuuuuuuuuuu==%s" % e)
            # log.info("{'userid': '%s', 'log_info': 'creating the replicationcontroller and pod faild...'}"
            #         % (json_list.get("user_name")))
            # log.warning('creating the rc running error, reason=%s'
            #            % (e))
            result = code.request_result(501)

            return result

        # 更新storage状态
        try:
            log.info("volume+++++++++++++++++++++++")

            resul = InnerApi.change_status(json_list)

            log.info(resul)
            log.info("volume++++++++++++++++++!!!!!")
        except Exception, e:
            log.error("storage status update error,reason=%s" % e)

        typee = {"rtype": "rc", "uid_rc": uid_rc}
        json_list.update(typee)
        try:
            # log.info("{'userid': '%s', 'log_info': 'entering the replicationcontroller and pod...'}"
            #         % (json_list.get("user_name")))
            DataOrm.add_method(json_list)

            # log.info("{'userid': '%s', 'log_info': 'entering the replicationcontroller and pod sucessful...'}"
            #         % (json_list.get("user_name")))
        except Exception, e:
            log.warning('rc entering the database running error, reason=%s'
                        % (e))
            return code.request_result(401)

        type_con = {"rtype": "containers"}
        # http_lb, tcp_lb, tcp_port = ArrayIterator.service_domain(json_list)
        try:
            domain_con = ContainerDomain()
            domain = domain_con.container_domain(json_list)
            log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            log.info(domain)
            log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            json_list.update(type_con)
            domain_in = {"container": domain}
            json_list.update(domain_in)
        except Exception, e:
            log.error("create container domain error,reason=%s" % e)
            return code.request_result(401)

        try:
            log.info("{'userid': '%s', 'log_info': 'creating other message to database...'}"
                     % (json_list.get("user_name")))
            DataOrm.add_method(json_list)

        except Exception, e:
            log.warning('container entering the database running error, reason=%s'
                        % (e))
            return code.request_result(401)

        type_env = {"rtype": "env"}

        json_list.update(type_env)
        try:
            DataOrm.add_method(json_list)
        except Exception, e:
            log.warning('k8sapi entering the resource(rc) running error, reason=%s'
                        % (e))
            result = code.request_result(401)
            return result

        type_volume = {"rtype": "volume"}
        json_list.update(type_volume)
        try:
            DataOrm.add_method(json_list)
        except Exception, e:
            log.error('k8sapi entering the resource(volume) runing error,reason=%s'
                      % e)
        typee = {"rtype": "fservice", "uid_font": uid_font, "status": "Pending", "all_name": json_list.get("user_name")+json_list.get("service_name")}
        json_list.update(typee)

        try:
            DataOrm.add_method(json_list)
            # log.info("{'userid': '%s', 'log_info': 'created success!!!'}"
            #         % (json_list.get("user_name")))

            result = code.request_result(0, add_rc)
        except Exception, e:
            log.warning('k8sapi entering the resource(fservice) running error, reason=%s'
                        % (e))
            result = code.request_result(401)
            return result

        try:
            post_es(json_list, 'service is creating...')
        except Exception, e:
            log.error("es error, reason=%s" % e)

        try:
            notification.notify_result(json_list.get("user_name"), json_list.get("service_name"), 402, 107, 300)
        except Exception, e:
            log.error("notification error,reason=%s" % e)

        result = "service is creating..."
        return code.request_result(0, result)

    def service_list(self, json_list):

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

    def detail_service(self, json_list):
        logicmodel = LogicModel()

        try:
            select_all = DataOrm.detail_list(json_list)
        except Exception, e:
            log.warning('k8sapi get the detail resource(sql) running error, reason=%s'
                        % (e))
            result = code.request_result(101)
            return result
        try:
            select_con = DataOrm.detail_container(json_list)
        except Exception, e:
            log.warning('k8sapi get the detail resource(sql) running error, reason=%s'
                        % (e))
            result = code.request_result(101)
            return result
        try:
            select_env = DataOrm.detail_env(json_list)
        except Exception, e:
            log.warning('k8sapi get the detail resource(sql) running error, reason=%s'
                        % (e))
        try:
            select_volume = DataOrm.detail_volume(json_list)
        except Exception, e:
            log.warning('k8sapi get the detail resource(volume) running error, reason=%s'
                        % (e))

            result = code.request_result(101)
            return result
        try:
            conn, cur = logicmodel.connection()
            resu = logicmodel.exeQuery(cur, select_all)
            logicmodel.connClose(conn, cur)
            conn, cur = logicmodel.connection()
            resu_con = logicmodel.exeQuery(cur, select_con)
            logicmodel.connClose(conn, cur)
            conn, cur = logicmodel.connection()
            resu_env = logicmodel.exeQuery(cur, select_env)
            logicmodel.connClose(conn, cur)
            conn, cur = logicmodel.connection()
            resu_volume = logicmodel.exeQuery(cur, select_volume)
            logicmodel.connClose(conn, cur)
            result_one = []
            result_con = []
            result_env = []
            result_volume = []
            for i in resu:
                for j in resu_con:
                    try:
                        if j.get("rc_id") == i.get("uuid"):
                            container = {"container_port": j.get("containerPort"),
                                        "protocol": j.get("protocol"),
                                        "access_mode": j.get("access_mode"),
                                        "access_scope": j.get("access_scope"),
                                        "http_domain": j.get("http_domain"),
                                        "tcp_domain": j.get("tcp_domain")}

                            result_con.append(container)
                    except Exception, e:
                        log.warning('select container running error, reason=%s'
                        % (e))
                for x in resu_env:
                    if x.get("rc_id") == i.get("uuid"):
                        env = {"env_key": x.get("env_name"),
                               "env_value": x.get("env_value")}
                        result_env.append(env)
                for g in resu_volume:
                    if g.get("rc_id") == i.get("uuid"):
                        volume = {"disk_name": g.get("volume_name"),
                                  "disk_path": g.get("volume_path"),
                                  "readonly": g.get("read_only")}
                        result_volume.append(volume)
                into_result = {"container": result_con, "env": result_env, "volume": result_volume}
                i.update(into_result)
                update_time = str(i.get("ltime"))
                time_list = {}
                difftime = DataOrm.time_diff(update_time)
                time_list["ltime"] = difftime
                i.update(time_list)

                service_name2 = json_list.get("user_name")+json_list.get("service_name")
                service_name1 = service_name2.replace("_", "-")
                i["logs_labels"] = service_name1

                result_one.append(i)
            result = code.request_result(0, result_one)
        except Exception, e:
            log.warning('k8sapi get the detail resource(out) running error, reason=%s'
                        % (e))
            result = code.request_result(404)
            return result
        return result

    def del_service(self, json_list):

        kubernete_sclient = KubernetesClient()
        del_pod = SourceModel()
        del_type = {"del_type": "pod"}
        json_list.update(del_type)

        log.info("{'userid': '%s', 'log_info': 'deleting pod and replicationcontroller...'}"
                     % (json_list.get("user_name")))

        try:
            post_es(json_list, 'deleting the service...')
        except Exception, e:
            log.error("es error, reason=%s" % e)

        delete_pod = del_pod.delete_pod(json_list)
        log.info(delete_pod)
        delete_pod1 = {"action": "put", "resources_type": "replicationcontrollers", "parameters": delete_pod}
        json_list_pod = str(delete_pod1)

        try:
            kubernete_sclient.rpc_exec(json_list_pod)

            log.info("{'userid': '%s', 'log_info': 'pod has be deleted!'}"
                     % (json_list.get("user_name")))

        except Exception, e:
            log.error('k8sapi delete the pod from k8s running error, reason=%s'
                        % (e))
            log.error("{'userid': '%s', 'log_info': 'service delete failed'}"
                     % (json_list.get("user_name")))
            post_es(json_list, 'deleting the service failed')

            result = code.request_result(503)
            return result

        rc_name1 = json_list.get("user_name")+json_list.get("service_name")
        del_service1 = json_list.get("user_name")+json_list.get("service_name")
        rc_name = rc_name1.replace("_", "-")
        serv_service_name = del_service1.replace("_", "-")
        del_rc = {"namespace": json_list.get("namespace"), "name": rc_name}
        json_list1 = {"action": "delete", "resources_type": "replicationcontrollers", "parameters": del_rc}
        json_list_rc = str(json_list1)
        kubernete_sclient = KubernetesClient()
        try:
            rc_response = kubernete_sclient.rpc_exec(json_list_rc)

            log.info("{'userid': '%s', 'log_info': 'replicationcontroller has be deleted!'}"
                     % (json_list.get("user_name")))

        except Exception, e:
            log.warning('k8sapi delete the rc running error, reason=%s'
                        % (e))

            log.error("{'userid': '%s', 'log_info': 'service delete failed'}"
                     % (json_list.get("user_name")))
            post_es(json_list, 'deleting the service failed')

            result = code.request_result(503)
            return result

        del_service = {"namespace": json_list.get("namespace"), "name": serv_service_name}
        json_list1 = {"action": "delete", "resources_type": "services", "parameters": del_service}
        json_list_service = str(json_list1)
        kubernete_sclient = KubernetesClient()
        try:
            service_response = kubernete_sclient.rpc_exec(json_list_service)

            log.info("{'userid': '%s', 'log_info': 'service has be deleted'}"
                     % (json_list.get("user_name")))

        except Exception, e:
            log.error('k8sapi delete the service running error, reason=%s'
                        % (e))

            log.error("{'userid': '%s', 'log_info': 'service delete failed'}"
                     % (json_list.get("user_name")))

            post_es(json_list, 'deleting the service failed')

            result = code.request_result(503)
            return result

        logic = LogicModel()
        conn, cur = logic.connection()
        sel_sql = DataOrm.get_using_volume(json_list)
        resu = logic.exeQuery(cur, sel_sql)
        xxx = []
        for i in resu:
            disk_name = i.get("volume_name")
            xxx.append({"disk_name":disk_name})
        if len(xxx) != 0:

            json_up = {"volume": xxx,"token": json_list.get("token")}
            try:
                log.info("------------------------------")
                log.info(json_up)
                resul = InnerApi.change_status1(json_up)
                log.info(resul)
                log.info("------------------------!!!!!!")
            except Exception, e:
                log.error("storage to unused faild, reason=%s" % e)
            logic.connClose(conn, cur)
        else:
            pass

        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()

        try:
            del_rc, del_service, del_fservice, del_container, del_env, del_volume = DataOrm.delete_sql(json_list)
        except Exception, e:
            log.warning('k8sapi struct the sql running error, reason=%s'
                        % (e))

            log.error("{'userid': '%s', 'log_info': 'service delete failed'}"
                     % (json_list.get("user_name")))
            post_es(json_list, 'deleting the service failed')
            result = code.request_result(101)
            return result

        try:
            logicmodel.exeDelete(cur, del_service)
            logicmodel.exeDelete(cur, del_rc)
            logicmodel.exeDelete(cur, del_fservice)
            logicmodel.exeDelete(cur, del_container)
            logicmodel.exeDelete(cur, del_env)
            logicmodel.exeDelete(cur, del_volume)

            log.info("{'userid': '%s', 'log_info': 'service delete success!'}"
                     % (json_list.get("user_name")))

        except Exception, e:
            log.error('k8sapi exec the sql running error, reason=%s'
                        % (e))

            log.error("{'userid': '%s', 'log_info': 'service delete failed'}"
                     % (json_list.get("user_name")))
            post_es(json_list, 'deleting the service failed')
            result = code.request_result(402)
            return result

        logicmodel.connClose(conn, cur)

        try:
            post_es(json_list, 'delete the service successfully!')
        except Exception, e:
            log.error("es error, reason=%s" % e)

        return code.request_result(0, "delete success")

    def update_service(self, json_list):

            update_svc = dict()
            create_json = SourceModel()
            kubernete_sclient = KubernetesClient()
            del_type = {"del_type": "rc"}
            json_list.update(del_type)
            try:
                post_es(json_list, 'updating the service...')
            except Exception, e:
                log.error("es error, reason=%s" % e)
            try:
                log.info("{'userid': '%s', 'log_info': 'begin to update the service...'}"
                     % (json_list.get("user_name")))

                update_json = create_json.create_json(json_list)
                log.info(update_json)
                if update_json == "timeout":
                    return code.request_result(502)
                update_svc = create_json.update_service(json_list)

            except Exception, e:
                log.warning('k8sapi struct the update_sql running error, reason=%s'
                        % (e))

                log.error("{'userid': '%s', 'log_info': 'update the service failed!'}"
                     % (json_list.get("user_name")))
                post_es(json_list, 'update the service failed!')
                result = code.request_result(101)
                return result
            json_list1 = {"action": "put", "resources_type": "replicationcontrollers", "parameters": update_json}
            json_list2 = str(json_list1)
            try:

                log.info("{'userid': '%s', 'log_info': 'updating the replication and pod...'}"
                     % (json_list.get("user_name")))

                kubernete_sclient.rpc_exec(json_list2)
            except Exception, e:
                log.warning('k8sapi update the rc running error, reason=%s'
                        % (e))
                post_es(json_list, 'update the service failed!')
                result = code.request_result(502)
                return result

            log.info("delete pod****************************************")
            del_pod = SourceModel()
            del_type = {"del_type": "pod"}
            json_list.update(del_type)
            delete_pod = del_pod.delete_pod(json_list)
            log.info(delete_pod)
            delete_pod1 = {"action": "put", "resources_type": "replicationcontrollers", "parameters": delete_pod}
            json_list_pod = str(delete_pod1)
            try:
                kubernete_sclient = KubernetesClient()
                kubernete_sclient.rpc_exec(json_list_pod)
            except Exception, e:
                log.warning('k8sapi delete the pod from k8s running error, reason=%s'
                            % (e))
                post_es(json_list, 'update the service failed!')
                result = code.request_result(503)
                return result

            json_list1 = {"action": "put", "resources_type": "replicationcontrollers", "parameters": update_json}
            log.info("****************************************")
            log.info(update_json)
            json_list2 = str(json_list1)
            try:
                kubernete_sclient = KubernetesClient()
                kubernete_sclient.rpc_exec(json_list2)

                log.info("{'userid': '%s', 'log_info': 'update the replicationcontroller and pod success!'}"
                     % (json_list.get("user_name")))

            except Exception, e:
                log.error('k8sapi update the rc running error, reason=%s'
                        % (e))

                log.error("{'userid': '%s', 'log_info': 'update the replicationcontroller and pod failed!'}"
                     % (json_list.get("user_name")))
                post_es(json_list, 'update the service failed!')

                result = code.request_result(502)
                return result

            logic = LogicModel()
            conn, cur = logic.connection()
            sel_sql = DataOrm.get_using_volume(json_list)
            resu = logic.exeQuery(cur, sel_sql)
            xxx = []
            for i in resu:
                disk_name = i.get("volume_name")
                xxx.append({"disk_name":disk_name})
            if len(xxx) != 0:

                json_up = {"volume": xxx,"token": json_list.get("token")}
                try:
                    log.info("------------------------------")
                    log.info(json_up)
                    resul = InnerApi.change_status1(json_up)
                    log.info(resul)
                    log.info("------------------------!!!!!!")
                except Exception, e:
                    log.error("storage to unused faild, reason=%s" % e)
                    post_es(json_list, 'update the service failed!')
                logic.connClose(conn, cur)
            else:
                pass

            # 更新volume
            try:
                log.info("volume+++++++++++++++++++++++")

                resul = InnerApi.change_status(json_list)

                log.info(resul)
                log.info("volume++++++++++++++++++!!!!!")
            except Exception, e:
                log.error("storage status update error,reason=%s" % e)
                post_es(json_list, 'update the service failed!')

            service_name = json_list.get("service_name")
            user_name = json_list.get("user_name")
            service_name2 = user_name+service_name
            service_name1 = service_name2.replace("_", "-")
            get_service = {"rtype": "services", "namespace": user_name, "name": service_name1}
            json_get = {"action": "get", "resources_type": "services", "parameters": get_service}
            json_get1 = str(json_get)
            kubernete_get = KubernetesClient()
            try:

                log.info("{'userid': '%s', 'log_info': 'get the using service message...'}"
                     % (json_list.get("user_name")))

                res = eval(kubernete_get.rpc_name(json_get1))
                log.info(res)
            except Exception, e:
                log.error("get clusterIP error, reason=%s" % (e))

                log.error("{'userid': '%s', 'log_info': 'get the message of using service failed!'}"
                     % (json_list.get("user_name")))
                post_es(json_list, 'update the service failed!')

                result = code.request_result(502)
                return result
            # up_json = {"spec": {"clusterIP": res["spec"]["clusterIP"]}}
            # log.info(up_json)
            log.info("''''''''''''''''''''''''''''x")
            log.info(update_svc)
            update_svc["spec"]["clusterIP"] = res["spec"]["clusterIP"]
            log.info("''''''''''''''''''''''''''''y")
            update_svc["metadata"]["resourceVersion"] = res["metadata"]["resourceVersion"]
            log.info("''''''''''''''''''''''''''''z")
            log.info(update_svc)

            json_list3 = {"action": "put", "resources_type": "services", "parameters": update_svc}
            json_list4 = str(json_list3)
            kubernete_svc = KubernetesClient()
            try:

                log.info("{'userid': '%s', 'log_info': 'updating the using service...'}"
                     % (json_list.get("user_name")))

                kubernete_svc.rpc_exec(json_list4)

                log.info("{'userid': '%s', 'log_info': 'update the using service success!'}"
                     % (json_list.get("user_name")))

            except Exception, e:
                log.error("k8sapi update the service running error, reason=%s"
                          % (e))

                log.error("{'userid': '%s', 'log_info': 'update the using service failed!'}"
                     % (json_list.get("user_name")))
                post_es(json_list, 'update the service failed!')

                result = code.request_result(502)
                return result

            try:
                logicmodel = LogicModel()
                conn, cur = logicmodel.connection()
                update_sql = DataOrm.update_sql(json_list)
                logicmodel.exeUpdate(cur, update_sql)
                logicmodel.connClose(conn, cur)
                result = code.request_result(0, update_svc)
            except Exception, e:
                log.error("update database error, reason=%s" % e)
                post_es(json_list, 'update the service failed!')

                return code.request_result(403)

            try:
                post_es(json_list, 'update the service successfully!')
            except Exception, e:
                log.error("es error, reason=%s" % e)
            return result

    def update_container(self, json_list):
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        try:
            delete_container_sql = DataOrm.delete_container_sql(json_list)
            print delete_container_sql
            logicmodel.exeDelete(cur, delete_container_sql)
        except:
            result = code.request_result(403)
            return result

        rc_id_sql = DataOrm.get_rc_id(json_list)

        try:
            resu = logicmodel.exeQuery(cur, rc_id_sql)
            logicmodel.connClose(conn, cur)
            for i in resu:
                print i.get("rc_id")
                rc = {"uid_rc": i.get("rc_id"), "rtype": "containers"}
                json_list.update(rc)

        except Exception, e:
            log.warning('query rc_id running error, json=%s, reason=%s'
                        % (json_list, e))
            return code.request_result(402)
        try:
            domain_con = ContainerDomain()
            domain = domain_con.container_domain(json_list)
            domain_in = {"container": domain}
            json_list.update(domain_in)

            DataOrm.add_method(json_list)
        except Exception, e:
            log.warning('update container running error, reason=%s'
                        % (e) )
            return code.request_result(401)
        result = code.request_result(0, "success")

        return result

    def update_volume(self, json_list):
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        try:
            delete_container_sql = DataOrm.delete_volume_sql(json_list)
            using_volume = InnerApi.using_volume(json_list)

            # 更新storage状态
            try:
                InnerApi.change_status(using_volume)
            except Exception, e:
                log.error("storage status update error,reason=%s" % e)

            logicmodel.exeDelete(cur, delete_container_sql)
        except Exception, e:
            log.error("delete volume message error,reason=%s" % e)
            result = code.request_result(403)
            return result

        rc_id_sql = DataOrm.get_rc_id(json_list)

        try:
            resu = logicmodel.exeQuery(cur, rc_id_sql)
            logicmodel.connClose(conn, cur)
            for i in resu:
                print i.get("rc_id")
                rc = {"uid_rc": i.get("rc_id"), "rtype": "volume"}
                json_list.update(rc)

        except Exception, e:
            log.warning('query rc_id running error, json=%s, reason=%s'
                        % (json_list, e))
            return code.request_result(402)

        # 更新storage状态
        try:
            InnerApi.change_status(using_volume)
        except Exception, e:
            log.error("storage status update error,reason=%s" % e)

        try:
            DataOrm.add_method(json_list)
        except Exception, e:
            log.warning('update container running error, reason=%s'
                        % (e) )
            return code.request_result(401)
        result = code.request_result(0, "success")

        return result

    def update_env(self, json_list):
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        try:
            delete_env_sql = DataOrm.delete_env_sql(json_list)
            logicmodel.exeDelete(cur, delete_env_sql)

        except:
            result = code.request_result(403)
            return result

        rc_id_sql = DataOrm.get_rc_id(json_list)
        try:
            resu = logicmodel.exeQuery(cur, rc_id_sql)
            logicmodel.connClose(conn, cur)
            for i in resu:
                rc = {"uid_rc": i.get("rc_id"), "rtype": "env"}
                json_list.update(rc)

        except Exception, e:
            log.warning('query rc_id running error, reason=%s'
                        % (e))
        try:
            DataOrm.add_method(json_list)
        except Exception, e:
            log.warning('update envs running error, reason=%s'
                        % (e) )
            return code.request_result(403)
        result = code.request_result(0, "success")

        return result

    def update_cm(self, json_list):
        logicmodel = LogicModel()
        conn, cur = logicmodel.connection()
        rc_id_sql = DataOrm.get_rc_id(json_list)
        try:
            resu = logicmodel.exeQuery(cur, rc_id_sql)

            for i in resu:
                rc = {"rc_id": i.get("rc_id")}
                json_list.update(rc)
        except Exception, e:
            log.warning('query rc_id running error, reason=%s'
                        % (e))
        try:
            if json_list.get("auto") is None:
                update_cm_sql = DataOrm.put_cpu_memory(json_list)
                logicmodel.exeUpdate(cur, update_cm_sql)
                logicmodel.connClose(conn, cur)
            elif json_list.get("auto") == "auto":
                update_auto_sql = DataOrm.put_auto_startup(json_list)
                logicmodel.exeUpdate(cur, update_auto_sql)
                logicmodel.connClose(conn, cur)
        except Exception, e:
            log.error("cm entering the database error data=%s,reason=%s" % (update_cm_sql, e))
            result = code.request_result(403)
            return result
        return code.request_result(0, "success")

    def create_namespace(self, json_list):
        namespace_c = SourceModel()
        kubernete_sclient = KubernetesClient()
        namespace_json = namespace_c.create_namespace(json_list)
        secret_json = namespace_c.create_secret(json_list)
        json_list1 = {"action": "post", "resources_type": "namespace", "parameters": namespace_json}
        json_list2 = str(json_list1)


        try:
            log.info("AAAAAAAAAAAAAAAAA")
            resul = kubernete_sclient.rpc_name(json_list2)
            log.info(resul.text)
            log.info("BBBBBBBBBBBBBBBBBBBB")
            result = code.request_result(0, namespace_json)
        except:
            result = code.request_result(501)
            return result
        return result

    def create_secret(self, json_list):
        secret_c = SourceModel()
        kubernete_sclient = KubernetesClient()
        secret_json = secret_c.create_secret(json_list)
        json_secret = {"action": "post", "resources_type": "secret", "parameters": secret_json}
        log.info("json_secret=%s****************************" % str(json_secret))
        json_list1 = str(json_secret)
        try:
            kubernete_sclient.rpc_name(json_list1)
            result = code.request_result(0, json_secret)
        except:
            result = code.request_result(501)
            return result
        return result

    def show_namespace(self, json_list):
        kubernete_sclient = KubernetesClient()
        # json_list:{"name":"xxx"}
        json_list1 = {"action": "get", "resources_type": "namespace", "parameters": json_list}
        json_list2 = str(json_list1)
        try:
            res = kubernete_sclient.rpc_name(json_list2)
            log.info("(((((((((((((((((())))))))))))))))()()()()()")
            # log.info(type(res))
            # log.info(res)
            if eval(str(res)).get("kind") != 'Status' and eval(str(res)).get("kind") is not None:
                return "ok"
            else:
                return "no"
        except Exception, e:
            log.error("errorerror-------------------, reason=%s" % e)
            result = code.request_result(504)
            return result

