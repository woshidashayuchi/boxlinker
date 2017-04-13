# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.mysql_base import MysqlInit
from common.logs import logging as log


class StorageDB(MysqlInit):

    def __init__(self):

        super(StorageDB, self).__init__()

    def name_duplicate_check(self, volume_name, project_uuid):

        sql = "select count(*) from volumes a join resources_acl b \
               where a.volume_name='%s' and b.project_uuid='%s' \
               and a.volume_uuid=b.resource_uuid" \
               % (volume_name, project_uuid)

        return super(StorageDB, self).exec_select_sql(sql)[0][0]

    def volume_create(self, volume_uuid, volume_name, disk_name,
                      volume_size, fs_type, pool_name,
                      team_uuid, project_uuid, user_uuid):

        sql_01 = "insert into resources_acl(resource_uuid, resource_type, \
                  admin_uuid, team_uuid, project_uuid, user_uuid, \
                  create_time, update_time) \
                  values('%s', 'volume', '0', '%s', '%s', '%s', now(), now())" \
                  % (volume_uuid, team_uuid, project_uuid, user_uuid)
        sql_02 = "insert into volumes(volume_uuid, volume_name, volume_size, \
                  volume_status, disk_name, fs_type, mount_point, pool_name, \
                  create_time, update_time) \
                  values('%s', '%s', '%d', 'unused', '%s', '%s', 'None', \
                  '%s', now(), now())" \
                  % (volume_uuid, volume_name, int(volume_size),
                     disk_name, fs_type, pool_name)

        return super(StorageDB, self).exec_update_sql(sql_01, sql_02)

    def volume_logical_delete(self, volume_uuid):

        sql = "update volumes set volume_status='delete', update_time=now() \
               where volume_uuid='%s' and volume_status!='delete'" \
              % (volume_uuid)

        return super(StorageDB, self).exec_update_sql(sql)

    def volume_physical_delete(self, volume_uuid):

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
               from volumes where volume_uuid='%s' and volume_status!='delete'" \
               % (volume_uuid)

        return super(StorageDB, self).exec_select_sql(sql)

    def volume_delete_info(self, volume_uuid):

        sql = "select disk_name from volumes \
               where volume_uuid='%s' and volume_status='delete'" \
               % (volume_uuid)

        return super(StorageDB, self).exec_select_sql(sql)

    def volume_recovery(self, volume_uuid):

        sql = "update volumes set volume_status='unused', update_time=now() \
               where volume_uuid='%s' and volume_status='delete'" \
              % (volume_uuid)

        return super(StorageDB, self).exec_update_sql(sql)

    def volume_list_dead(self):

        sql = "select volume_uuid from volumes \
               where volume_status='delete' \
               and update_time<date_sub(now(), interval 30 day)"

        return super(StorageDB, self).exec_select_sql(sql)

    def volume_list_team(self, team_uuid):

        sql = "select a.volume_uuid from volumes a join resources_acl b \
               where a.volume_uuid=b.resource_uuid \
               and a.volume_status!='delete' \
               and b.team_uuid='%s'" \
              % (team_uuid)

        return super(StorageDB, self).exec_select_sql(sql)

    def volume_list_project(self, team_uuid, project_uuid,
                            page_size, page_num):

        page_size = int(page_size)
        page_num = int(page_num)
        start_position = (page_num - 1) * page_size

        sql_01 = "select a.volume_uuid, a.volume_name, a.volume_size, \
                  a.volume_status, a.disk_name, a.fs_type, a.mount_point, \
                  a.pool_name, a.create_time, a.update_time \
                  from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status!='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s' \
                  limit %d,%d" \
                 % (team_uuid, project_uuid,
                    start_position, page_size)

        sql_02 = "select count(*) from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status!='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s'" \
                 % (team_uuid, project_uuid)

        volumes_list = super(StorageDB, self).exec_select_sql(sql_01)
        count = super(StorageDB, self).exec_select_sql(sql_02)[0][0]

        return {
                   "volumes_list": volumes_list,
                   "count": count
               }

    def volume_list_user(self, team_uuid, project_uuid,
                         user_uuid, page_size, page_num):

        page_size = int(page_size)
        page_num = int(page_num)
        start_position = (page_num - 1) * page_size

        sql_01 = "select a.volume_uuid, a.volume_name, a.volume_size, \
                  a.volume_status, a.disk_name, a.fs_type, a.mount_point, \
                  a.pool_name, a.create_time, a.update_time \
                  from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status!='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s' \
                  and b.user_uuid='%s' \
                  limit %d,%d" \
                 % (team_uuid, project_uuid, user_uuid,
                    start_position, page_size)

        sql_02 = "select count(*) from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status!='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s' \
                  and b.user_uuid='%s'" \
                 % (team_uuid, project_uuid, user_uuid)

        volumes_list = super(StorageDB, self).exec_select_sql(sql_01)
        count = super(StorageDB, self).exec_select_sql(sql_02)[0][0]

        return {
                   "volumes_list": volumes_list,
                   "count": count
               }

    def volume_reclaim_list_project(self, team_uuid, project_uuid,
                                    page_size, page_num):

        page_size = int(page_size)
        page_num = int(page_num)
        start_position = (page_num - 1) * page_size

        sql_01 = "select a.volume_uuid, a.volume_name, a.volume_size, \
                  a.volume_status, a.disk_name, a.fs_type, a.mount_point, \
                  a.pool_name, a.create_time, a.update_time \
                  from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s' \
                  limit %d,%d" \
                 % (team_uuid, project_uuid,
                    start_position, page_size)

        sql_02 = "select count(*) from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s'" \
                 % (team_uuid, project_uuid)

        volumes_list = super(StorageDB, self).exec_select_sql(sql_01)
        count = super(StorageDB, self).exec_select_sql(sql_02)[0][0]

        return {
                   "volumes_list": volumes_list,
                   "count": count
               }

    def volume_reclaim_list_user(self, team_uuid, project_uuid,
                                 user_uuid, page_size, page_num):

        page_size = int(page_size)
        page_num = int(page_num)
        start_position = (page_num - 1) * page_size

        sql_01 = "select a.volume_uuid, a.volume_name, a.volume_size, \
                  a.volume_status, a.disk_name, a.fs_type, a.mount_point, \
                  a.pool_name, a.create_time, a.update_time \
                  from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s' \
                  and b.user_uuid='%s' \
                  limit %d,%d" \
                 % (team_uuid, project_uuid, user_uuid,
                    start_position, page_size)

        sql_02 = "select count(*) from volumes a join resources_acl b \
                  where a.volume_uuid=b.resource_uuid \
                  and a.volume_status='delete' \
                  and b.team_uuid='%s' and b.project_uuid='%s' \
                  and b.user_uuid='%s'" \
                 % (team_uuid, project_uuid, user_uuid)

        volumes_list = super(StorageDB, self).exec_select_sql(sql_01)
        count = super(StorageDB, self).exec_select_sql(sql_02)[0][0]

        return {
                   "volumes_list": volumes_list,
                   "count": count
               }

    def volume_add_list(self):

        sql = "select a.volume_uuid, a.volume_name, a.volume_size, \
               a.volume_status, b.resource_type, b.team_uuid, \
               b.project_uuid, b.user_uuid from volumes a \
               join resources_acl b where a.volume_uuid=b.resource_uuid \
               and a.create_time>=date_sub(now(), interval 24 hour)"

        return super(StorageDB, self).exec_select_sql(sql)

    def volume_delete_list(self):

        sql = "select volume_uuid from volumes \
               where volume_status='delete' \
               and update_time>=date_sub(now(), interval 24 hour)"

        return super(StorageDB, self).exec_select_sql(sql)

    def volume_update_list(self):

        sql = "select a.volume_uuid, a.volume_name, a.volume_size, \
               a.volume_status, b.resource_type, b.team_uuid, \
               b.project_uuid, b.user_uuid from volumes a \
               join resources_acl b where a.volume_uuid=b.resource_uuid \
               and a.volume_status!='delete' \
               and  a.update_time>=date_sub(now(), interval 24 hour)"

        return super(StorageDB, self).exec_select_sql(sql)
