#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/21
# Author:wang-xf

from pod_message import pod_messages
from monitor_test import Show


def rc_monitor(json_data):
    pods = pod_messages(json_data)
    cnt = 0
    cnt1 = 0
    rc = []
    net_tx = []
    r = {"time_long": json_data.get("time_long"), "time_span": json_data.get("time_span"),
         "user_name": json_data.get("user_name"), "type": json_data.get("rtype")}

    try:
        for i in pods:
            pod_name = i.get("pod_name")
            x = {"pod_name": pod_name}
            r.update(x)
            result = Show.get_msg(r)
            for j in result:
                if j.get("name") == "cpu/usage_rate" or j.get("name") == "memory/usage" \
                        or j.get("name") == "network/rx_rate":
                    if cnt == 0:
                        rc = j.get("value")
                        cnt += 1
                    else:
                        for g in rc:
                            a = rc.index(g)
                            if g is None or g == "null":
                                pass
                            else:
                                rc[a][1] = float(j.get("value")[a][1]) + float(rc[a][1])
                        cnt += 1
                if j.get("name") == "network/tx_rate":
                    if cnt1 == 0:
                        net_tx = j.get("value")
                        cnt1 += 1
                    else:
                        for g in net_tx:
                            a = net_tx.index(g)
                            if g is None or g == "null":
                                pass
                            else:
                                net_tx[a][1] = float(j.get("value")[a][1]) + float(net_tx[a][1])
                        cnt1 += 1

        if r.get("rtype") != "network":
            return [{"name": r.get("rtype"), "value": rc}]
        else:
            return [{"name": "network/tx_rate", "value": net_tx}, {"name": "network/rx_rate", "value": rc}]
    except Exception, e:
        return False
