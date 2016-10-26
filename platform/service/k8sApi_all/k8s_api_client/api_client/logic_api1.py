#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:wang-xf
from flask import Flask
from flask import request
from sheet_controller import SheetController
import json
from response_code import code
from token_about.token_for_api import TokenForApi
from flask_cors import CORS
from common.logs import logging as log
from time import sleep
from podstatus_monitor.anytime_update_status import Up
from resource_model.sheet_model import SheetModel
from podstatus_monitor.pod_message import pod_messages
from token_about.token_for_out import p_out

app = Flask(__name__)
CORS(app=app)


@app.route('/api/v1/application/service/<service_name>', methods=['POST'])
def create_service(service_name):
    controller = SheetController()
    auth_ret = p_out()
    if auth_ret != "failed":
       user_id, user_name, user_orga, role_uuid = auth_ret
       user_msg = {"user_id": user_id, "user_name": user_name}
    else:
        return json.dumps(code.request_result(202))

    try:
        json_list = json.loads(request.get_data())
    except:
        return json.dumps(code.request_result(101))

    show_resource = {"name": user_name}
    # log.info(controller.show_namespace(show_resource))
    if controller.show_namespace(show_resource) != "ok":
        log.info("begin@@@@@@@@@@@@@@@@@@@@----")
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


@app.route('/create/service', methods=['GET'])
def test():

    return "some"


@app.route('/api/v1/application/service', methods=['GET'])
def get_all_service():

    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)

    except Exception, e:

        return json.dumps(code.request_result(202))
    # user_id = json_list1.encode("utf-8")
    try:
        service_name = request.args.get("service_name",)
        # service_name = json_list2.encode("utf-8")
        json_list = {"user_id": user_id}
        if service_name is not None:
            json_list = {"user_id": user_id, "user_name":user_name, "service_name": service_name}
        controller = SheetController()
        response = controller.service_list(json_list)
        return json.dumps(response)
    except Exception, e:
        log.error("start error, reason=%s" % e)
        return json.dumps(code.request_result(404))


@app.route('/api/v1/application/service/<service_name>/details', methods=['GET'])
def detail_service(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
    except:
        return json.dumps(code.request_result(202))
    # json_list1 = request.args.get('user_id',)
    json_list = {"user_id": user_id, "user_name": user_name, "service_name": service_name}
    controller = SheetController()
    response = controller.detail_service(json_list)
    print(response)
    return json.dumps(response)


@app.route('/api/v1/application/remove/service/<service_name>', methods=['DELETE'])
def del_service(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
    except:
        return json.dumps(code.request_result(202))
    # json_list = json.loads(request.get_data())
    json_list = {"token": token_get1, "service_name": service_name, "user_name": user_name, "namespace": user_name, "user_id": user_id}
    controller = SheetController()
    response = controller.del_service(json_list)
    return json.dumps(response)


@app.route('/api/v1/application/service/<service_name>', methods=['PUT'])
def put_service(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
    except:
       return json.dumps(code.request_result(202))

    json_list1 = json.loads(request.get_data())
    log.debug("json_list1=%s" % (json_list1))
    try:
        json_list = {"service_name": service_name, "user_id": user_id, "user_name": user_name}
        json_list = json.loads(json.dumps(json_list))
        json_list.update(json_list1)
        json_list["token"] = token_get1
    except Exception, e:
        log.error("error=%s" % (e))

    controller = SheetController()
    response = controller.update_service(json_list)
    return json.dumps(response)


@app.route('/api/v1/application/service/<service_name>/container', methods=['PUT'])
def put_container(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name}
    except:
        return json.dumps(code.request_result(202))
    json_list = json.loads(request.get_data())
    json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name, "type": "container"}
    json_list.update(json_name)
    json_list["token"] = token_get1
    controller = SheetController()
    try:
        controller.update_service(json_list)
        response = controller.update_container(json_list)

        return json.dumps(response)
    except Exception, e:
        log.error("update error, reason = %s" % e)
        return json.dumps(code.request_result(502))


@app.route('/api/v1/application/service/<service_name>/volume', methods=['PUT'])
def put_volume(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name}
    except:
        return json.dumps(code.request_result(202))
    json_list = json.loads(request.get_data())
    json_name = {"token": token_get1, "service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name, "type":"volume"}
    json_list.update(json_name)
    controller = SheetController()
    try:
        controller.update_service(json_list)
        response = controller.update_volume(json_list)

        return json.dumps(response)
    except Exception, e:
        log.error("update error, reason = %s" % e)
        return json.dumps(code.request_result(502))


@app.route('/api/v1/application/service/<service_name>/env', methods=['PUT'])
def put_env(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name}
    except:
        return json.dumps(code.request_result(202))
    json_list = json.loads(request.get_data())
    json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name, "type":"env"}

    json_list.update(json_name)
    json_list["token"] = token_get1
    controller = SheetController()
    try:
        controller.update_service(json_list)
        response = controller.update_env(json_list)

        return json.dumps(response)
    except Exception, e:
        log.error("update error, reason = %s" % e)
        return json.dumps(code.request_result(502))


@app.route('/api/v1/application/service/<service_name>/cm', methods=['PUT'])
def put_cm(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name}
    except:
        return json.dumps(code.request_result(202))
    json_list = json.loads(request.get_data())
    json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name, "type": "limits"}
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


@app.route('/api/v1/application/service/<service_name>/status', methods=['PUT'])
def start_service(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name}
    except:
        return json.dumps(code.request_result(202))
    json_list = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name}
    json_get = json.loads(request.get_data())

    if json_get.get("operate") == "start":
        json_list["token"] = token_get1
        log.info(json_list)
        response = SheetModel.start_svc(json_list)
        return json.dumps(response)
    if json_get.get("operate") == "stop":
        response = SheetModel.stop_svc(json_list)
        return json.dumps(response)


@app.route('/api/v1/application/service/<service_name>/telescopic', methods=['PUT'])
def telescopic(service_name):
    response = {}
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name, "service_name": service_name,"tel":"tel"}
    except Exception, e:
        log.error("telescopic error, reason=%s" % e)
        return json.dumps(code.request_result(202))
    json_list = json.loads(request.get_data())
    json_list.update(user_msg)
    try:
        response = SheetModel.elastic_telescopic(json_list)
    except Exception, e:
        log.error("elastic telescopic error, reason = %s" % e)
    return json.dumps(response)


@app.route('/api/v1/application/service/<service_name>/pod/message', methods=['GET'])
def pod_message(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name, "service_name": service_name}
    except Exception, e:
        log.error("telescopic error, reason=%s" % e)
        return json.dumps(code.request_result(202))
    try:
        response = pod_messages(user_msg)
        return json.dumps(response)
    except Exception, e:
        log.error("get the message of pod error,reason=%s" % e)


@app.route('/api/v1/application/service/status', methods=['POST'])
def update_status():
    json_list = json.loads(request.get_data())
    response = Up.update_status(json_list)
    return json.dumps(response)


@app.route('/api/v1/application/service/<service_name>/autostartup', methods=['PUT'])
def put_auto_startup(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name}
    except:
        return json.dumps(code.request_result(202))
    json_list = json.loads(request.get_data())
    json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name, "type": "auto_startup"}
    json_list["token"] = token_get1
    json_list["auto"] = "auto"
    json_list.update(json_name)
    try:
        controller = SheetController()
        controller.update_service(json_list)
        response = controller.update_cm(json_list)

        return json.dumps(response)
    except Exception, e:
        log.error("update error, reason = %s" % e)
        return json.dumps(code.request_result(502))


@app.route('/api/v1/application/service/<service_name>/publish', methods=['PUT'])
def put_policy(service_name):
    try:
        token_get1 = request.headers.get("token")
        token_get2 = token_get1.decode("utf-8")
        token_get = token_get2.encode("utf-8")
        user_id, user_name = TokenForApi.get_msg(token_get)
        user_msg = {"user_id": user_id, "user_name": user_name}
    except:
        return json.dumps(code.request_result(202))
    json_list = json.loads(request.get_data())
    json_name = {"service_name": service_name, "user_id": user_msg.get("user_id"), "user_name": user_name}
    json_list["token"] = token_get1
    json_list.update(json_name)
    log.info("awsdesacdsc=====%s" % json.dumps(json_list))
    try:
        controller = SheetController()
        response = controller.update_service(json_list)
        return json.dumps(response)
    except Exception, e:
        log.error("update error, reason = %s" % e)
        return json.dumps(code.request_result(502))

if __name__ == '__main__':
    # app.run(debug=True, host="0.0.0.0", port=9000)
    while True:
        try:
            app.run(debug=True, host="0.0.0.0", port=9000, threaded=True)
            log.info("restart----------------------------------")
        except Exception, e:
            log.warning('k8s RESTful API Server running error, reason=%s' % e)
        sleep(8)
