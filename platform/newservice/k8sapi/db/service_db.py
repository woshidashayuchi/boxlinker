# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

from common.mysql_base import MysqlInit
from common.logs import logging as log
from unit_element import font_infix_element, rc_infix_element, container_element, env_element, volume_element


class ServiceDB(MysqlInit):

    def __init__(self):
        super(ServiceDB, self).__init__()

    def name_if_used_check(self, dict_data):

        service_name = dict_data.get("service_name")
        project_uuid = dict_data.get("project_uuid")

        sql = "select * from font_service where service_name =\'%s\' and " \
              "project_uuid = \'%s\'" % (service_name, project_uuid)

        return super(ServiceDB, self).exec_select_sql(sql)

    def infix_db(self, dict_data):

        font_uuid, rc_uuid, service_uuid, user_uuid, team_uuid, project_uuid, service_name = font_infix_element(
                                                                                                            dict_data)

        pods_num, image_id, container_cpu, container_memory, policy, auto_startup, command, \
            isUpdate = rc_infix_element(dict_data)

        sql_font = "insert into font_service(uuid, rc_uuid, service_uuid, user_uuid, " \
                   "team_uuid, project_uuid, service_name) VALUES('%s', '%s', '%s', '%s', " \
                   "'%s', '%s', '%s')" % (font_uuid, rc_uuid, service_uuid, user_uuid, team_uuid,
                                          project_uuid, service_name)

        sql_rc = "insert into replicationcontrollers(uuid, labels_name, pods_num, " \
                 "image_id, container_cpu, container_memory, policy, auto_startup, command, isUpdate) " \
                 "VALUES ('%s', '%s', %d, '%s', '%s', '%s', %d, %d," \
                 "'%s', %d)" % (rc_uuid, service_name, pods_num, image_id, container_cpu,
                                container_memory, policy, auto_startup, command, isUpdate)

        return super(ServiceDB, self).exec_update_sql(sql_font, sql_rc)

    def get_rc_uuid(self, dict_data):

        project_uuid = dict_data.get('project_uuid')
        service_name = dict_data.get('service_name')

        sql = "select rc_uuid from font_service where service_name='%s' and project_uuid='%s'" % (service_name,
                                                                                                  project_uuid)

        return super(ServiceDB, self).exec_select_sql(sql)

    def container_infix_db(self, dict_data):

        container_uuid, rc_uuid, container_port, protocol, access_mode, access_scope, tcp_port, http_domain, \
            tcp_domain = container_element(dict_data)

        sql = "insert into containers(uuid,rc_uuid,container_port,protocol,access_mode,access_scope," \
              "tcp_port,http_domain,tcp_domain) VALUES('%s','%s', %d, '%s', '%s', '%s', '%s', '%s'," \
              "'%s')" % (container_uuid, rc_uuid, container_port, protocol, access_mode, access_scope,
                         tcp_port, http_domain, tcp_domain)

        return super(ServiceDB, self).exec_update_sql(sql)

    def env_infix_db(self, dict_data):
        env_uuid, rc_uuid, env_key, env_value = env_element(dict_data)
        sql = "insert into env(uuid,rc_uuid,env_key,env_value) VALUES ('%s','%s','%s','%s')" % (env_uuid, rc_uuid,
                                                                                                env_key, env_value)
        return super(ServiceDB, self).exec_update_sql(sql)

    def volume_infix_db(self, dict_data):
        v_uuid, rc_uuid, volume_uuid, disk_path, readonly = volume_element(dict_data)
        sql = "insert into volume(uuid, rc_uuid, volume_uuid, disk_path, readonly) VALUES ('%s','%s','%s','%s'," \
              "'%s')" % (v_uuid, rc_uuid, volume_uuid, disk_path, readonly)

        return super(ServiceDB, self).exec_update_sql(sql)

    def max_used_port(self):

        sql = 'select max(CAST(tcp_port AS SIGNED)) tcp_port from containers'

        return super(ServiceDB, self).exec_select_sql(sql)

    def create_svcaccount_or_not(self, dict_data):

        sql = "select uuid from font_service where project_uuid='%s'" % dict_data.get('project_uuid')

        return super(ServiceDB, self).exec_select_sql(sql)
