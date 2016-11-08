# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.mysql_base import MysqlInit
from common.logs import logging as log


class AuthDB(MysqlInit):

    def __init__(self):
        super(AuthDB, self).__init__()

    def resource_ac(self, resource_name, resource_type, user_role, user_orag):
        if user_role == 0:
            sql = "select admin from resources_acl where resource_name = '%s' and resource_type = '%s' and organization in ('global', '%s')" \
                  %(resource_name, resource_type, user_orag)
        elif user_role == 1:
            sql = "select organization from resources_acl where resource_name = '%s' and resource_type = '%s' and organization in ('global', '%s')" \
                  %(resource_name, resource_type, user_orag)
        else:
            sql = "select user from resources_acl where resource_name = '%s' and resource_type = '%s' and organization in ('global', '%s')" \
                  %(resource_name, resource_type, user_orag)

        result = super(AuthDB, self).exec_select_sql(sql)

        return result[0][0]

