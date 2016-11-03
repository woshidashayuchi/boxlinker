#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/17
# Author:wang-xf


def email_text(json_data):
    result = []
    email_te = dict()
    for i in json_data:
        now_d = i.get("now_d")
        node_name = i.get("node_name")
        rtype = i.get("rtype")
        proportion = i.get("proportion")
        text = "<h5>hi, admin:</h5></br>" +\
               "<h5>in the boxlinker server,some device alarming, specific:</h5></br>"+\
               "<h2>time:%s</h2></br>" % now_d +\
               "<h2>ip:%s</h2></br>" % node_name +\
               "<h2>type:%s</h2></br>" % rtype +\
               "<h2>proportion:%s</h2>" +\
               "<h5>please take immediate actions<h5>"
        email_te = {"to": "wxf_come_on@163.com", "title": "boxlinker resource alarming", "html": text}
    return email_te