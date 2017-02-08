#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/1
# Author:王晓峰
import pymysql
import pymysql.cursors
import os
from common.logs import logging as log


class LogicModel(object):

    def __init__(self):
        pass

    def connection(self):
        conn = pymysql.connect(host=os.environ.get('MYSQL_HOST'),
                               db='kuberdata',
                               port=int(os.environ.get('MYSQL_PORT')),
                               user='kuber',
                               passwd='kuber',
                               charset='UTF8',
                               cursorclass=pymysql.cursors.DictCursor)
        cur = conn.cursor()
        return conn, cur

    def exeUpdate(self, cur, sql):
        sta = cur.execute(sql)
        return sta

    def exeDelete(self, cur, sql):
        sta = cur.execute(sql)
        return sta

    def exeQuery(self, cur, sql):
        cur.execute(sql)
        return cur

    def connClose(self, conn, cur):
        try:
            cur.close()
            conn.commit()
            conn.close()
        except Exception, e:
            log.error("close the connect to mysql server is error, reason=%s" % e)
            return
