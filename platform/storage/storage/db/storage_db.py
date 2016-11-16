# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.mysql_base import MysqlInit
from common.logs import logging as log


class StorageDB(MysqlInit):

    def __init__(self):

        super(StorageDB, self).__init__()

    def name_duplicate_check(self, volume_name, orga_uuid):

        sql = "select count(*) from volumes a join resources_acl b \
               where a.volume_name='%s' and b.orga_uuid='%s' \
               and a.volume_uuid=b.resource_uuid" \
               % (volume_name, orga_uuid)

        return super(StorageDB, self).exec_select_sql(sql)[0][0]

    def volume_create(self, volume_uuid, volume_name,
                      disk_name, volume_size, fs_type,
                      pool_name, user_uuid, orga_uuid):

        sql_01 = "insert into resources_acl(resource_uuid, resource_type, \
                  admin_uuid, orga_uuid, user_uuid, create_time, update_time) \
                  values('%s', 'volume', 'global', '%s', '%s', now(), now())" \
                  % (volume_uuid, orga_uuid, user_uuid)
        sql_02 = "insert into volumes(volume_uuid, volume_name, volume_size, \
                  volume_status, disk_name, fs_type, mount_point, pool_name, \
                  create_time, update_time) \
                  values('%s', '%s', '%d', 'unused', '%s', '%s', 'None', \
                  '%s', now(), now())" \
                  % (volume_uuid, volume_name, int(volume_size),
                     disk_name, fs_type, pool_name)

        return super(StorageDB, self).exec_update_sql(sql_01, sql_02)

    def volume_delete(self, volume_uuid):

        sql_01 = "delete from resources_acl where resource_uuid='%s'" \
                 % (volume_uuid)
        sql_02 = "delete from volumes where volume_uuid='%s'" \
                 % (volume_uuid)

        return super(StorageDB, self).exec_update_sql(sql_01, sql_02)

    def volume_resize(self, volume_uuid, volume_size):

        sql = "update volumes set volume_size='%d', update_time=now() \
               where volume_uuid='%s'" \
              % (int(volume_size), volume_uuid)

        return super(StorageDB, self).exec_update_sql(sql)

    def volume_status(self, volume_uuid, volume_status):

        sql = "update volumes set volume_status='%s', update_time=now() \
               where volume_uuid='%s'" \
              % (volume_status, volume_uuid)

        return super(StorageDB, self).exec_update_sql(sql)

    def volume_info(self, volume_uuid):

        sql = "select volume_name, volume_size, volume_status, disk_name, \
               fs_type, mount_point, pool_name, create_time, update_time \
               from volumes where volume_uuid='%s'" \
              % (volume_uuid)

        return super(StorageDB, self).exec_select_sql(sql)

    def volume_list_info(self, user_uuid, orga_uuid):

        sql = "select a.volume_name, a.volume_size, a.volume_status, \
               a.disk_name, a.fs_type, a.mount_point, a.pool_name, \
               a.create_time, a.update_time \
               from volumes a join resources_acl b \
               where b.user_uuid='%s' and b.orga_uuid='%s' \
               and a.volume_uuid=b.resource_uuid" \
              % (user_uuid, orga_uuid)

        return super(StorageDB, self).exec_select_sql(sql)
