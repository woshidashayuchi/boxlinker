#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/10/17
# Author:wang-xf
from common.logs import logging as log


class EmailAb(object):
    def __init__(self):
        pass

    def email_text(self, json_data):
        email_text = ""
        for i in json_data:
            now_d = i.get("now_d")
            node_name = i.get("node_name")
            rtype = i.get("rtype")
            proportion = i.get("proportion")

            log.info("now_d===%s" % now_d)
            log.info("node_name===%s" % node_name)
            log.info("rtype===%s" % rtype)
            log.info("proportion===%s" % proportion)

            try:

                tex = "<tr>" \
                     "<td>%s</td>" \
                     "<td>%s</td>" \
                     "<td>%s</td>" \
                     "<td>%s</td>" \
                     "</tr>" % (node_name, rtype, proportion, now_d)

                email_text = email_text + tex

            except Exception, e:
                log.error("etext create error, reason=%s" % e)
                return "error"

        return email_text

    def send_email(self, json_data):
        email_text = self.email_text(json_data)
        log.info("hahahahahahahahaha===%s" % email_text)
        text = "<h3>Hi, admin:</h3></br>" \
               "<div style=margin-left:30px>" \
               "<h3>in the boxlinker server,some device alarming, specific:</h3></br>" \
               "<table width=\"700px\" border=\"1\" cellspacing=\"0\" cellpadding=\"2\" " \
               "bordercolor=\"#009900\"><tr><th \"align\"=\"center\">nodename</th>" \
               "<th \"align\"=\"center\">type</th><th \"align\"=\"center\">proportion</th>" \
               "<th \"align\"=\"center\">time</th>" \
               "</tr>" + email_text + "</table>" \
               "<h3>please take immediate actions!!!<h3>" \
               "</div>"
        log.info("text========#########%s" % text)
        email_te = {"to": "wxf_come_on@163.com", "title": "boxlinker resource alarming", "html": text}
        return email_te
