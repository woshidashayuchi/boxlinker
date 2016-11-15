# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.mysql_base import MysqlInit
from common.logs import logging as log


class StorageDB(MysqlInit):

    def __init__(self):
        super(StorageDB, self).__init__()

    def get_uuid(self, resource_name, resource_type, organization):
        sql = "select uuid from resources_acl where resource_name='%s' and resource_type='%s' and organization='%s'" \
               % (resource_name, resource_type, organization)

        return super(StorageDB, self).exec_select_sql(sql)[0][0]

    def disk_name_check(self, disk_name, organization):
        sql = "select count(*) from resources_acl where resource_name='%s' and organization='%s'" \
               % (disk_name, organization)

        return super(StorageDB, self).exec_select_sql(sql)[0][0]

    def disk_create(self, uuid, disk_name, disk_ins_name, resource_type, disk_size, fs_type, pool_name, user_orag, user_name):
        sql_01 = "insert into resources_acl(uuid, resource_name, resource_type, admin, organization, user, create_time, update_time) \
                  values('%s', '%s', '%s', '0', '%s', '%s', now(), now())" \
                  % (uuid, disk_name, resource_type, user_orag, user_name)
        sql_02 = "insert into storage_disk(uuid, disk_name, disk_size, disk_status, fs_type, pool_name, create_time, update_time) \
                  values('%s', '%s', '%d', 'unused', '%s', '%s', now(), now())" \
                  % (uuid, disk_ins_name, int(disk_size), fs_type, pool_name)

        return super(StorageDB, self).exec_update_sql(sql_01, sql_02)

    def disk_delete(self, uuid):
        sql_01 = "delete from resources_acl where uuid='%s'" \
                 % (uuid)
        sql_02 = "delete from storage_disk where uuid='%s'" \
                 % (uuid)

        return super(StorageDB, self).exec_update_sql(sql_01, sql_02)

    def disk_resize(self, uuid, disk_size):
        sql = "update storage_disk set disk_size='%d',update_time=now() where uuid='%s'" \
              % (int(disk_size), uuid)

        return super(StorageDB, self).exec_update_sql(sql)

    def disk_status(self, uuid, disk_status):
        sql = "update storage_disk set disk_status='%s',update_time=now() where uuid='%s'" \
              % (disk_status, uuid)

        return super(StorageDB, self).exec_update_sql(sql)

    def disk_info(self, resource_name, resource_type, organization):
        sql = "select a.disk_name, a.disk_size, a.disk_status, a.fs_type, a.pool_name, a.create_time, a.update_time \
               from storage_disk a join resources_acl b \
               where a.uuid=b.uuid and b.resource_name='%s' and b.resource_type='%s' and b.organization='%s'" \
              % (resource_name, resource_type, organization)

        return super(StorageDB, self).exec_select_sql(sql)

    def disk_list_info(self, resource_type, user_name, user_role, user_orag):
        if user_role == 0:
            sql = "select b.resource_name, a.disk_name, a.disk_size, a.disk_status, a.fs_type, a.pool_name, a.create_time, a.update_time \
                   from storage_disk a join resources_acl b \
                   where a.uuid=b.uuid and b.resource_type='%s'" \
                   % (resource_type)
        elif user_role == 1:
            sql = "select b.resource_name, a.disk_name, a.disk_size, a.disk_status, a.fs_type, a.pool_name, a.create_time, a.update_time \
                   from storage_disk a join resources_acl b \
                   where a.uuid=b.uuid and b.resource_type='%s' and b.organization='%s'" \
                   % (resource_type, user_orag)
        else:
            sql = "select b.resource_name, a.disk_name, a.disk_size, a.disk_status, a.fs_type, a.pool_name, a.create_time, a.update_time \
                   from storage_disk a join resources_acl b \
                   where a.uuid=b.uuid and b.resource_type='%s' and b.organization='%s' and b.user='%s'" \
                   % (resource_type, user_orag, user_name)

        return super(StorageDB, self).exec_select_sql(sql)



