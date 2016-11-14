#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/1
# Author:王晓峰
import pymysql
import pymysql.cursors
import os


class LogicModel(object):

    def __init__(self):
        pass

    def connection(self):
        conn = pymysql.connect(host=os.environ.get('MYSQL_HOST'),
                               db='clouddata',
                               port=int(os.environ.get('MYSQL_PORT')),
                               user='cloud', passwd='cloud',
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
        except Exception:
            print("发生异常")
            return
