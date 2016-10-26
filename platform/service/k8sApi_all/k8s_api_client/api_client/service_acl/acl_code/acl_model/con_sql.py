#! /usr/bin python
# -*- coding:utf8 -*-
# Date: 2016/8/9
# Author: wang-xf


class AclSql(object):
    def __init__(self):
        pass

    @classmethod
    def del_sql(cls, json_data):
        del_sql = "delete from service_acl where uuid=\'%s\'" % json_data.get("uuid")
        return del_sql

    @classmethod
    def up_sql(cls, json_data):
        up_sql = "update service_acl set \'%s\'='\%s\' where uuid=\'%s\'" % (
                                                        json_data.get("colume"),
                                                        json_data.get("value"),
                                                        json_data.get("uuid"))
        return up_sql

    @classmethod
    def li_sql(cls, json_data):
        list_sql = "select * from service_acl"
        return list_sql
