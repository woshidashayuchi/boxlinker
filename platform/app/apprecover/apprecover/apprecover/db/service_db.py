# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/3/31 下午6:10

from common.mysql_base import MysqlInit
from common.logs import logging as log


class ServiceDB(MysqlInit):

    def __init__(self):
        super(ServiceDB, self).__init__()

    @staticmethod
    def element_explain(team_list):
        try:
            sql = '('
            for i in team_list:
                sql = sql+"'"+i+"'"+','
            sql = sql[:-1] + ')'
        except Exception, e:
            log.error('explain the element for database error, reason is: %s' % e)
            raise Exception('explain the element for database error')
        return sql

    def update_zero_services(self, teams_list):
        # sql = "update font_service set lifecycle='stop' where team_uuid in " + self.element_explain(teams_list)
        sql = "update font_service set lifecycle='stop' where team_uuid='99acbcae-76f0-42b4-90e8-279a6f96c327'"
        log.info('update the db sql is: %s,type is: %s' % (sql, type(sql)))

        return super(ServiceDB, self).exec_update_sql(sql)

    def get_zero_services(self, teams_list):

        # sql = "select service_name, project_uuid, uuid from " \
        #       "font_service WHERE team_uuid IN " + self.element_explain(teams_list)

        sql = "select service_name, project_uuid, uuid from " \
              "font_service WHERE team_uuid='99acbcae-76f0-42b4-90e8-279a6f96c327'"
        log.info('get the zero money service sql is: %s' % sql)

        return super(ServiceDB, self).exec_select_sql(sql)

    def recycle_svc_list(self, project_uuid):

        sql = "select service_name,service_create_time ltime, uuid from font_service WHERE project_uuid='%s' and " \
              "lifecycle='stop'" % project_uuid

        return super(ServiceDB, self).exec_select_sql(sql)

    def service_regain(self, dict_data):
        service_uuid = dict_data.get('service_uuid')
        services = self.element_explain(service_uuid)

        sql = "select t.*,v.volume_uuid,v.disk_path,v.readonly from (select l.*,e.env_key,e.env_value from " \
              "(select a.service_name,a.rc_uuid,c.pods_num,c.image_id,c.cm_format,c.container_cpu," \
              "c.container_memory,c.policy,c.auto_startup,c.command,b.container_port,b.protocol," \
              "b.access_mode,b.access_scope,b.tcp_port," \
              "b.private_domain,b.identify from font_service a inner join containers b inner join " \
              "replicationcontrollers c on a.uuid in %s and ((b.http_domain is not NULL and b.http_domain != '' " \
              "and b.http_domain !='None') or (b.tcp_domain is not NULL and b.tcp_domain != '' and " \
              "b.tcp_domain !='None')) and b.rc_uuid = a.rc_uuid and c.uuid=a.rc_uuid AND " \
              "a.lifecycle ='stop') l left join env e " \
              "on l.rc_uuid = e.rc_uuid) t left join volume v on v.rc_uuid = t.rc_uuid order by rc_uuid" % services
        log.info('to operate the databse, the sql is: %s' % sql)
        return super(ServiceDB, self).exec_select_sql(sql)

    def update_lifecycle(self, service_uuid):
        sql = "update font_service set lifecycle=NULL WHERE rc_uuid='%s'" % service_uuid
        log.info('update the database sql is: %s' % sql)
        return super(ServiceDB, self).exec_update_sql(sql)

    def delete_physics(self, service_uuid):

        sql_volume = "delete from volume WHERE rc_uuid =(SELECT rc_uuid from font_service WHERE " \
                     "uuid ='%s')" % service_uuid

        sql_env = "delete from env WHERE rc_uuid =(SELECT rc_uuid from font_service WHERE " \
                  "uuid ='%s')" % service_uuid

        sql_container = "delete from containers WHERE rc_uuid =(SELECT rc_uuid from font_service WHERE " \
                        "uuid ='%s')" % service_uuid

        sql_rc = "delete from replicationcontrollers WHERE uuid =(SELECT rc_uuid from font_service WHERE " \
                 "uuid ='%s')" % service_uuid

        sql_font = "delete from font_service WHERE uuid ='%s'" % service_uuid

        sql_acl = "delete from resources_acl WHERE resource_uuid ='%s'" % service_uuid

        log.info('##sql_volume is: %s' % sql_volume)

        return super(ServiceDB, self).exec_update_sql(sql_volume, sql_env, sql_container, sql_rc, sql_font, sql_acl)
