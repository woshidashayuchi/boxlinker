# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

from common.mysql_base import MysqlInit
from common.logs import logging as log
from unit_element import font_infix_element, rc_infix_element, container_element, env_element, volume_element,\
    normal_call, uuid_ele
from common.db_operate import DbOperate


class ServiceDB(MysqlInit):

    def __init__(self):
        super(ServiceDB, self).__init__()
        self.operate = DbOperate()

    def name_if_used_check(self, dict_data):

        service_name = dict_data.get("service_name")
        project_uuid = dict_data.get("project_uuid")

        sql = "select * from font_service where service_name ='%s' and " \
              "project_uuid = '%s'" % (service_name, project_uuid)

        return super(ServiceDB, self).exec_select_sql(sql)

    def infix_db(self, dict_data):

        font_uuid, rc_uuid, service_uuid, user_uuid, team_uuid, project_uuid, service_name, \
            image_dir = font_infix_element(dict_data)

        pods_num, image_id, container_cpu, container_memory, policy, auto_startup, command, \
            isUpdate = rc_infix_element(dict_data)

        sql_font = "insert into font_service(uuid, rc_uuid, service_uuid, user_uuid, " \
                   "team_uuid, project_uuid, service_name,image_dir) VALUES('%s', '%s', '%s', '%s', " \
                   "'%s', '%s', '%s', '%s')" % (font_uuid, rc_uuid, service_uuid, user_uuid, team_uuid,
                                                project_uuid, service_name, image_dir)

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

    def service_list(self, dict_data):

        project_uuid, service_name = normal_call(dict_data)

        sql = "SELECT a.service_name, b.http_domain, b.tcp_domain, b.container_port, a.service_status," \
              "a.image_dir, a.service_update_time ltime FROM font_service a, " \
              "containers b WHERE (a.rc_uuid = b.rc_uuid AND a.project_uuid='%s')" % project_uuid

        conn, cur = self.operate.connection()
        ret = self.operate.exeQuery(cur, sql)
        self.operate.connClose(conn, cur)

        return ret

    def service_detail(self, dict_data):
        service_name = dict_data.get('service_name')
        project_uuid = dict_data.get('project_uuid')

        sql_rc = "select * from replicationcontrollers where uuid = (select rc_uuid from font_service where " \
                 "project_uuid='%s' and service_name='%s')" % (project_uuid, service_name)

        sql_container = "select * from containers where rc_uuid = (select rc_uuid from font_service where " \
                        "project_uuid='%s' and service_name='%s')" % (project_uuid, service_name)

        sql_env = "select * from env where rc_uuid = (select rc_uuid from font_service where " \
                  "project_uuid='%s' and service_name='%s')" % (project_uuid, service_name)

        sql_volume = "select * from volume where rc_uuid = (select rc_uuid from font_service where " \
                     "project_uuid='%s' and service_name='%s')" % (project_uuid, service_name)

        conn, cur = self.operate.connection()
        rc_ret = self.operate.exeQuery(cur, sql_rc)
        self.operate.connClose(conn, cur)

        conn, cur = self.operate.connection()
        env_ret = self.operate.exeQuery(cur, sql_env)
        self.operate.connClose(conn, cur)

        conn, cur = self.operate.connection()
        volume_ret = self.operate.exeQuery(cur, sql_volume)
        self.operate.connClose(conn, cur)

        conn, cur = self.operate.connection()
        containers_ret = self.operate.exeQuery(cur, sql_container)
        self.operate.connClose(conn, cur)

        return rc_ret, containers_ret, env_ret, volume_ret

    def delete_all(self, dict_data):

        service_name = dict_data.get('service_name')
        project_uuid = dict_data.get('project_uuid')

        del_volume = "delete from volume where rc_uuid=(select rc_uuid from font_service " \
                     "where service_name='%s' and project_uuid='%s')" % (service_name, project_uuid)

        del_container = "delete from containers where rc_uuid=(select rc_uuid from font_service " \
                        "where service_name='%s' and project_uuid='%s')" % (service_name, project_uuid)

        del_env = "delete from env where rc_uuid=(select rc_uuid from font_service " \
                  "where service_name='%s' and project_uuid='%s')" % (service_name, project_uuid)

        del_rc = "delete from replicationcontrollers where uuid=(select rc_uuid from font_service " \
                 "where service_name='%s' and project_uuid='%s')" % (service_name, project_uuid)

        del_font = "delete from font_service where project_uuid='%s' and service_name='%s'" % (project_uuid,
                                                                                               service_name)

        return super(ServiceDB, self).exec_update_sql(del_volume, del_container, del_env, del_rc, del_font)

    def update_container(self, dict_data):

        uuid_c = uuid_ele()
        project_uuid, service_name = normal_call(dict_data)
        container = dict_data.get('container')

        for i in container:

            container_uuid, rc_uuid, container_port, protocol, access_mode, access_scope, tcp_port, http_domain, \
                tcp_domain = container_element(i)

            sql_delete = "delete from containers where rc_uuid=(select rc_uuid from font_service where " \
                         "project_uuid='%s' and service_name='%s')" % (project_uuid, service_name)

            sql_insert = "insert into containers(uuid, rc_uuid, container_port, protocol, access_mode," \
                         "access_scope,tcp_port,http_domain,tcp_domain,private_domain,identify) VALUES " \
                         "('%s',(select rc_uuid from font_service where service_name='%s' " \
                         "and project_uuid='%s'),%d,'%s','%s','%s','%s','%s','%s','%s'," \
                         "'%s')" % (uuid_c, service_name, project_uuid, int(container_port), protocol, access_mode,
                                    access_scope, tcp_port, http_domain, tcp_domain, i.get('domain'), i.get('identify'))
            try:
                if super(ServiceDB, self).exec_update_sql(sql_delete, sql_insert) is not None:
                    return False
            except Exception, e:
                log.error('database update(env) error, reason=%s' % e)
                return False

            return True

    def update_env(self, dict_data):
        uuid_e = uuid_ele()
        env = dict_data.get('env')
        project_uuid, service_name = normal_call(dict_data)

        for i in env:
            sql_delete = "delete from env where rc_uuid=(select rc_uuid from font_service where " \
                         "project_uuid='%s' and service_name='%s')" % (project_uuid, service_name)

            sql_insert = "insert INTO env(uuid,rc_uuid,env_key,env_value) VALUES ('%s'," \
                         "((select rc_uuid from font_service where service_name='%s' " \
                         "and project_uuid='%s')),'%s','%s')" % (uuid_e, service_name, project_uuid,
                                                                 i.get('env_key'), i.get('env_value'))
            try:
                if super(ServiceDB, self).exec_update_sql(sql_delete, sql_insert) is not None:
                    return False
            except Exception, e:
                log.error('database update(env) error, reason=%s' % e)
                return False

        return True

    def update_status(self, dict_data):
        project_uuid, service_name = normal_call(dict_data)

        sql_start = "update font_service SET service_status='%s' WHERE service_name='%s' " \
                    "and project_uuid='%s'" % ('ContainerCreating', service_name, project_uuid)

        sql_stop = "update font_service SET service_status='%s' WHERE service_name='%s'" \
                   "and project_uuid='%s'" % ('Stopping', service_name, project_uuid)

        if dict_data.get('operate') == 'start':
            return super(ServiceDB, self).exec_update_sql(sql_start)
        if dict_data.get('operate') == 'stop':
            return super(ServiceDB, self).exec_update_sql(sql_stop)
        else:
            return False

    def update_telescopic(self, dict_data):
        project_uuid, service_name = normal_call(dict_data)
        pods_num = dict_data.get('pods_num')
        sql = "update replicationcontrollers SET pods_num=%d WHERE uuid=(SELECT rc_uuid from " \
              "font_service WHERE service_name='%s' and project_uuid='%s')" % (pods_num,
                                                                               service_name,
                                                                               project_uuid)
        return super(ServiceDB, self).exec_update_sql(sql)

    def update_command(self, dict_data):
        project_uuid, service_name = normal_call(dict_data)
        command = dict_data.get('command')
        sql = "update replicationcontrollers SET command='%s' WHERE uuid=(SELECT rc_uuid from " \
              "font_service WHERE service_name='%s' and project_uuid='%s')" % (command,
                                                                               service_name, project_uuid)

        return super(ServiceDB, self).exec_update_sql(sql)

    def update_domain(self, dict_data):
        project_uuid, service_name = normal_call(dict_data)
        domain = dict_data.get('domain')

        sql_check = "select count(*) from containers where private_domain='%s'" % domain

        ret = super(ServiceDB, self).exec_select_sql(sql_check)
        if ret[0][0] != 0:
            return False
        else:
            sql_up = "update containers SET private_domain='%s', identify='%s' WHERE " \
                     "rc_uuid=(SELECT rc_uuid from font_service WHERE project_uuid='%s' and " \
                     "service_name='%s') and http_domain is not NULL and http_domain != 'None'" % (domain, '0',
                                                                                                   project_uuid,
                                                                                                   service_name)
            super(ServiceDB, self).exec_update_sql(sql_up)

        return True

    def identify_check(self, dict_data):

        project_uuid, service_name = normal_call(dict_data)

        sql = "select private_domain, identify from containers where rc_uuid=(SELECT rc_uuid from font_service " \
              "WHERE project_uuid='%s' and service_name='%s') and http_domain is not NULL and " \
              "http_domain != 'None'" % (project_uuid, service_name)
        log.info('++++++++++++++++%s' % sql)
        return super(ServiceDB, self).exec_select_sql(sql)
