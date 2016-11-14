# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.logs import logging as log
from common.single import Singleton
from common.DBUtils.PooledDB import PooledDB

try:
    import MySQLdb
except ImportError, e:
    log.error('MySQLdb import error: %s' % (e))


class MysqlInit(object):

    __metaclass__ = Singleton

    def __init__(self):
        try:
            self.pool = PooledDB(MySQLdb, 2,
                                 host='db_server01', port=3306,
                                 user='manage', passwd='manage',
                                 db='kvmcenter', charset='utf8')
        except Exception, e:
            log.error('db_server01 connection error: reason= %s' % (e))
            try:
                self.pool = PooledDB(MySQLdb, 2,
                                     host='db_server02', port=3306,
                                     user='manage', passwd='manage',
                                     db='kvmcenter', charset='utf8')
            except Exception, e:
                log.error('db_server02 connection error: reason=%s' % (e))
                raise

    def exec_select_sql(self, sql):
        try:
            self.conn = self.pool.connection()
            self.cursor = self.conn.cursor()
            self.cursor.execute('SET NAMES utf8')
            self.cursor.execute('SET CHARACTER SET utf8')
            self.cursor.execute('SET character_set_connection=utf8')

            try:
                self.cursor.execute(sql)
                result = self.cursor.fetchall()
                log.debug('exec sql success, sql=%s' % (sql))
            except Exception, e:
                result = False
                log.error('exec sql error, sql=%s, reason=%s' % (sql, e))

            self.cursor.close()
            self.conn.close()

            return result

        except Exception, e:
            log.error('Get MySQL cursor error: reason=%s' % (e))
            raise

    def exec_update_sql(self, *sql):
        try:
            self.conn = self.pool.connection()
            self.cursor = self.conn.cursor()
            self.cursor.execute('SET NAMES utf8')
            self.cursor.execute('SET CHARACTER SET utf8')
            self.cursor.execute('SET character_set_connection=utf8')

            try:
                for v_sql in sql:
                    self.cursor.execute(v_sql)

                self.conn.commit()
                log.debug('exec sql success, sql=%s' % (str(sql)))
                result = True
            except Exception, e:
                try:
                    for v_sql in sql:
                        self.cursor.execute(v_sql)

                    self.conn.commit()
                    log.debug('exec sql success, sql=%s' % (str(sql)))
                    result = True
                except Exception, e:
                    result = False
                    log.error('exec sql error, sql=%s, reason=%s'
                              % (str(sql), e))

            self.cursor.close()
            self.conn.close()

            return result

        except Exception, e:
            log.error('Get MySQL cursor error: reason=%s' % (e))
            raise
