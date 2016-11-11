# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.mysql_base import MysqlInit
from common.logs import logging as log


class AuthDB(MysqlInit):

    def __init__(self):

        super(AuthDB, self).__init__()

    def acl_check(self, resource_uuid, role_uuid):

        role_uuid = int(role_uuid)
        if (role_uuid/100 == 1):
            sql = "select admin_uuid from resources_acl where resource_uuid = '%s'" \
                  % (resource_uuid)
        elif (role_uuid/100 == 2):
            sql = "select orga_uuid from resources_acl where resource_uuid = '%s'" \
                  % (resource_uuid)
        else:
            sql = "select user_uuid from resources_acl where resource_uuid = '%s'" \
                  % (resource_uuid)

        result = super(AuthDB, self).exec_select_sql(sql)

        return result[0][0]
