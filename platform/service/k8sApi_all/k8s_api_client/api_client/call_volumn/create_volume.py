#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/13
# Author:王晓峰

import requests
from common.logs import logging as log
import json
import os
import httplib


class CreateVolume(object):
    def __init__(self):
        pass

    @classmethod
    def define_volumes(cls, json_list):
        resu = {}
        result = []
        readonly = True
        request_para = json_list.get("volume")
        headers = {"token": json_list.get("token")}
        monitors = [x for x in os.environ.get("VOLUMEIP").split(',')]
        if request_para is not None and request_para != "":
            for i in request_para:

                get_url = "http://%s/api/v1.0/storage/volumes/%s" % (os.environ.get("STORAGE_HOST"), i.get("volume_id"))
                try:
                    log.info(headers)
                    log.info("get_url===%s" % get_url)
                    resu = json.loads(requests.get(get_url, headers=headers, timeout=5).text).get("result")
                    if resu == {}:
                        return "error"
                    else:
                        pass
                except Exception, e:
                    log.error("select volumes error,reason=%s"% (e))
                    return "timeout"

                log.info(resu)
                vname = resu.get("volume_name")
                pool_name = resu.get("pool_name")
                image = resu.get("image_name")
                readonly1 = i.get("readonly")
                if readonly1 == "True":
                    readonly = True
                else:
                    readonly = False
                fs_type = resu.get("fs_type")
                log.info(resu)
                volumes = {
                            "name": vname,
                            "rbd": {
                                "monitors": monitors,
                                "pool": pool_name,
                                "image": image,
                                "user": "admin",
                                "keyring": "/etc/ceph/keyring",
                                "fsType": fs_type,
                                "readOnly": readonly
                            }
                        }

                result.append(volumes)
            log.info(result)
            return result
        else:

            pass

    @classmethod
    def fill_containerfor_volume(cls, json_list):
        result = []
        request_para = json_list.get("volume")
        readonly = True

        headers = {"token": json_list.get("token")}

        for i in request_para:
            if i.get("readonly") == "True":
                readonly = True
            else:
                readonly = False

            get_url = "http://%s/api/v1.0/storage/volumes/%s" % (os.environ.get("STORAGE_HOST"), i.get("volume_id"))
            try:
                    log.info(headers)
                    resu = json.loads(requests.get(get_url, headers=headers, timeout=5).text).get("result")
                    if resu == {}:
                        return "error"
                    else:
                        pass
                    log.info(resu)
            except Exception, e:
                log.error("select volumes error,reason=%s"% (e))
                return "timeout"
            vname = resu.get("volume_name")

            disk_msg = {"name": vname, "readOnly": readonly, "mountPath": i.get("disk_path")}
            result.append(disk_msg)

        return result

    @classmethod
    def put_using(cls, json_list):

        headers = {"token": json_list.get("token")}
        put_url = "http://%s/api/v1.0/storage/volumes/%s/status" % (os.environ.get("STORAGE_HOST"), json_list.get("volume_id"))
        log.info("inner parameters========================%s" % headers)
        log.info(json_list)
        using = {"volume_status": json_list.get("volume_status")}
        resu = ""
        try:
            resu = requests.put(put_url, headers=headers, data=json.dumps(using))

            log.info(resu.text)
        except Exception, e:
            log.error("update storage error, reason=%s" % e)
        return resu
