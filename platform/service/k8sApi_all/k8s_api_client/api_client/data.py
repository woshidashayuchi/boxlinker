#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:王晓峰

from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import create_engine
from sqlalchemy.orm import mapper
from sqlalchemy.orm import create_session
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import func, or_, not_, and_
from sqlalchemy import String, Column, Integer
from sqlalchemy import DateTime
from mysql_table.replication_controller import ReplicationControllers
from mysql_table.font_Service import FontService
from mysql_table.service import Service
from mysql_table.env import Env
from mysql_table.volume import Volume
from mysql_table.containers import Containers
from mysql_table.service_acl import ServiceAcl
import time
import datetime
import os
import uuid
from common.logs import logging as log


class DataOrm(object):

    def __init__(self):
        pass

    db_config = {
        'host': os.environ.get('MYSQL_HOST'),
        'user': 'cloud',
        'passwd': 'cloud',
        'db': 'clouddata',
        'charset': 'UTF8',
        'port': os.environ.get('MYSQL_PORT')
    }

    engine = create_engine('mysql://%s:%s@%s:%s/%s?charset=%s' % (db_config['user'],
                                                               db_config['passwd'],
                                                               db_config['host'],
                                                               db_config['port'],
                                                               db_config['db'],
                                                               db_config['charset'],
                                                               ), echo=True)

    metadata = MetaData(engine)
    # Base = declarative_base()
    '''
        font_service = Table('font_service', metadata,
            Column('uuid', String(64), primary_key=True),
            Column('user_id', String(64)),
            Column('service_id', String(64)),
            Column('rc_id', String(64)),
            Column('fservice_name', String(64)),
            Column('fservice_status', String(20)),
            Column('fservice_create_time', DateTime, server_default=func.now()),
            Column('fservice_update_time', DateTime, server_default=func.now())
        )
        font_service.create()

        rc_table = Table('replicationcontrollers', metadata,
            Column('uuid', String(64), primary_key=True),
            Column('rc_name', String(64)),
            Column('labels_name', String(64)),
            Column('spec_replicas', Integer),
            Column('spec_selector_name', String(64)),
            Column('template_name', String(64)),
            Column('template_container_name', String(64)),
            Column('image_name', String(64)),
            Column('image_version', String(64)),
            Column('limits_cpu', String(64)),
            Column('containerPort', String(64)),
            Column('protocol', String(32)),
            Column('env_name', String(32)),
            Column('env_value', String(32)),
            Column('rc_create_time', DateTime, server_default=func.now()),
            Column('rc_update_time', DateTime, server_default=func.now())
        )
        rc_table.create()

        service_table = Table('service', metadata,
            Column('uuid', String(64), primary_key=True),
            Column('service_name', String(64)),
            Column('labels', String(64)),
            Column('selector_name', String(64)),
            Column('ports_name', String(64)),
            Column('ports_port', Integer),
            Column('ports_targetport', Integer),
            Column('service_domain_name', String(64)),
            Column('service_create_time', DateTime, server_default=func.now()),
            Column('service_update_time', DateTime, server_default=func.now())
        )
        service_table.create()

        container = Table('containers',metadata,
            Column('uuid',String(64),primary_key=True),
            Column('rc_id',String(64)),
            Column('user_id',String(64)),
            Column('service_name',String(64)),
            Column('containerPort',String(64)),
            Column('protocol',String(32)),
            Column('access_mode',String(32)),
            Column('access_scope',String(32))
        )
        container.create()

        env = Table('env',metadata,
            Column('uuid',String(64),primary_key=True),
            Column('rc_id',String(64)),
            Column('user_id',String(64)),
            Column('service_name',String(64)),
            Column('env_name',String(32)),
            Column('env_value',String(32))
        )
        env.create()


        acl = Table('service_acl',metadata,
                Column('uuid',String(64),primary_key=True),
                Column('service_name',String(64)),
                Column('resource_type',String(64)),
                Column('admin',String(64)),
                Column('organization',String(64)),
                Column('user',String(64)),
                Column('create_time', DateTime, server_default=func.now()),
                Column('update_time', DateTime, server_default=func.now())

            )
        acl.create()
    '''


    rc_table = Table('replicationcontrollers', metadata, autoload=True)
    service_table = Table('service', metadata, autoload=True)
    font_table = Table('font_service', metadata, autoload=True)
    con_table = Table('containers', metadata, autoload=True)
    env_table = Table('env', metadata, autoload=True)
    volume_table = Table('volume', metadata, autoload=True)
    acl_table = Table('service_acl', metadata, autoload=True)

    mapper(ReplicationControllers, rc_table)
    mapper(Service, service_table)
    mapper(FontService, font_table)
    mapper(Containers, con_table)
    mapper(Env, env_table)
    mapper(Volume, volume_table)
    mapper(ServiceAcl, acl_table)
    # metadata.create_all(bind=engine)

    @classmethod
    def query_method(cls, json_list):
        session = create_session()
        if json_list.get("rtype") == "rc":
            query_rc = session.query(ReplicationControllers)
            return query_rc
        elif json_list.get("rtype") == "service":
            query_service = session.query(Service)
            return query_service
        elif json_list.get("rtype") == "fservice":
            query_f = session.query(FontService)
            return query_f

    @classmethod
    def add_method(cls, json_list):
        Session = sessionmaker(bind=cls.engine)
        session = Session()
        service_name = json_list.get("service_name")
        if json_list.get("rtype") == "rc":
            u = ReplicationControllers()
            u.uuid = json_list.get("uid_rc")
            u.rc_name = service_name
            u.labels_name = service_name
            u.spec_replicas = int(json_list.get("pods_num"))
            u.spec_selector_name = service_name
            u.template_name = service_name
            u.template_container_name = service_name
            u.image_id = json_list.get("image_id")
            u.image_name = json_list.get("image_name")
            u.image_version = json_list.get("image_version")
            u.limits_cpu = json_list.get("container_cpu")
            u.limits_memory = json_list.get("container_memory")
            u.policy = json_list.get("policy")
            u.auto_startup = json_list.get("auto_startup")
            # u.containerPort = int(json_list.get("container")[0].get("container_port"))
            # u.protocol = json_list.get("container1")
            # u.env_name = json_list.get("env1")
            # u.env_value = json_list.get("env2")
            try:
                session.add(u)
            except Exception, e:
                log.error("error-----,reason=%s" % e)
            session.flush()
            session.commit()
            session.close()
        if json_list.get("rtype") == "service":
            u = Service()
            service_name = json_list.get("service_name")
            u.uuid = json_list.get("uid_service")
            u.service_name = service_name
            u.labels = service_name
            u.ports_name = service_name
            u.selector_name = service_name
            # u.ports_port = int(json_list.get("container_port"))
            u.ports_targetport = json_list.get("container_port")
            u.service_domain_name = json_list.get("user_name")+"-"+service_name+".lb1"+".boxlinker.com"
            session.add(u)
            session.flush()
            session.commit()
            session.close()
        if json_list.get("rtype") == "fservice":
            u = FontService()

            u.uuid = json_list.get("uid_font")
            u.user_id = json_list.get("user_id")
            u.service_id = json_list.get("uid_service")
            u.rc_id = json_list.get("uid_rc")
            u.all_name = json_list.get("all_name")
            u.fservice_name = json_list.get("service_name")
            u.fservice_status = json_list.get("status")

            session.add(u)
            session.flush()
            session.commit()
            session.close()
        if json_list.get("rtype") == "containers":

            for i in json_list["container"]:
                u = Containers()
                uid_con = str(uuid.uuid4())
                u.uuid = uid_con
                u.rc_id = json_list.get("uid_rc")
                u.user_id = json_list.get("user_id")
                u.service_name = json_list.get("service_name")
                u.containerPort = int(i.get("container_port"))
                u.protocol = i.get("protocol")
                u.access_mode = i.get("access_mode")
                u.access_scope = i.get("access_scope")
                u.tcp_port = i.get("tcp_port")
                u.http_domain = i.get("http_domain")
                u.tcp_domain = i.get("tcp_domain")

                session.add(u)
                session.flush()
                session.commit()
                session.close()
        if json_list.get("rtype") == "env":
            if json_list.get("env") is None:
                pass
            else:
                for i in json_list.get("env"):
                    u = Env()
                    uid_env = str(uuid.uuid4())
                    u.uuid = uid_env
                    u.rc_id = json_list.get("uid_rc")
                    u.user_id = json_list.get("user_id")
                    u.service_name = json_list.get("service_name")

                    u.env_name = i.get("env_key")
                    u.env_value = i.get("env_value")

                    session.add(u)
                    session.flush()
                    session.commit()
                    session.close()
        if json_list.get("rtype") == "volume":
            if json_list.get("volume") is None:
                pass
            else:
                for i in json_list.get("volume"):
                    u = Volume()
                    uid_volume = str(uuid.uuid4())
                    u.uuid = uid_volume
                    u.rc_id = json_list.get("uid_rc")
                    u.user_id = json_list.get("user_id")
                    u.service_name = json_list.get("service_name")

                    u.volume_name = i.get("disk_name")
                    u.volume_path = i.get("disk_path")
                    u.read_only = i.get("readonly")

                    session.add(u)
                    session.flush()
                    session.commit()
                    session.close()
        if json_list.get("rtype") == "acl":
            u = ServiceAcl()
            u.uuid = str(uuid.uuid4())
            u.service_name = json_list.get("service_name")
            u.resource_type = json_list.get("resource_type")
            u.admin = json_list.get("admin")
            u.organization = json_list.get("organization")
            u.user = json_list.get("user")
            session.add(u)
            session.flush()
            session.commit()
            session.close()

    @classmethod
    def del_method(cls, json_list):
        session = create_session()
        if json_list.get("rtype") == "rc":
            result = session.query(ReplicationControllers).filter(uuid='%s').delete() % json_list.get('rc_id')
            session.flush()
            session.commit()
            return result
        elif json_list.get("rtype") == "service":
            reuslt = session.query(Service).filter(uuid='%s').delete() % json_list.get('service_id')
            session.flush()
            session.commit()
            return reuslt
        elif json_list.get("rtype") == "fservice":
            result = session.query(FontService).filter(uuid='%s').delete() % json_list.get('font_id')
            session.flush()
            session.commit()
            return result

    @classmethod
    def update_method(cls, json_list):
        session = create_session()
        if json_list.get("rtype") == "rc":
            result = session.query(ReplicationControllers).filter(uuid='%s').delete() % json_list.get('rc_id')
            session.flush()
            session.commit()
            return result
        elif json_list.get("rtype") == "service":
            reuslt = session.query(Service).filter(uuid='%s').delete() % json_list.get('service_id')
            session.flush()
            session.commit()
            return reuslt
        elif json_list.get("rtype") == "fservice":
            result = session.query(FontService).filter(uuid='%s').delete() % json_list.get('font_id')
            session.flush()
            session.commit()
            return result

    @classmethod
    def query_sql(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        select_rc = "select distinct(b.rc_name), c.service_domain_name, a.fservice_name, a.fservice_status," \
                    "a.fservice_update_time ltime from font_service a," \
                    "replicationcontrollers b,service c,containers d where (a.rc_id = b.uuid and " \
                    "a.service_id = c.uuid and a.user_id=\'%s\')" % user_id
        if service_name is not None:
           select_one = "select b.rc_name, c.service_domain_name, a.fservice_name, a.fservice_status," \
                        "a.fservice_update_time ltime from font_service a," \
                        "replicationcontrollers b, service c,containers d where (a.rc_id = b.uuid and " \
                        "a.service_id = c.uuid and a.user_id= \'%s\' and a.fservice_name = \'%s\')" % (user_id, service_name)
           return select_one
        return select_rc

    @classmethod
    def detail_list(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        select_all = "select a.service_id, a.rc_id, a.fservice_name, a.fservice_status, " \
                     "b.uuid, b.rc_name, b.labels_name, b.spec_replicas, " \
                     "b.spec_selector_name, b.template_name, b.template_container_name, " \
                     "b.image_name, b.image_version, b.limits_cpu,b.limits_memory," \
                     "b.policy, b.auto_startup, b.containerPort, b.image_id," \
                     "b.protocol, b.env_name, b.env_value, b.rc_update_time ltime," \
                     "c.uuid, c.service_name, c.labels, c.selector_name, " \
                     "c.ports_name, c.ports_port, c.ports_targetport, c.service_domain_name  " \
                     "from " \
                     "(font_service a inner join replicationcontrollers b on a.rc_id=b.uuid) " \
                     "inner join service c on a.service_id=c.uuid  and " \
                     "a.fservice_name=\'%s\' and a.user_id=\'%s\'" % (service_name, user_id)
        return select_all

    @classmethod
    def detail_container(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        select_containers = "select * from containers a where a.user_id=\'%s\' and a.service_name=\'%s\'" % (user_id, service_name)
        return select_containers

    @classmethod
    def list_container(cls, json_list):
        user_id = json_list.get("user_id")
        select_containers = "select a.user_id,a.service_name,a.http_domain,a.tcp_domain from containers a where a.user_id=\'%s\'" % user_id
        return select_containers

    @classmethod
    def con_one(cls,json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        select_one = "select * from containers a where a.user_id=\'%s\' and a.service_name=\'%s\'" % (user_id,service_name)
        return select_one

    @classmethod
    def max_tcp_port(cls):
        select_tcp_port = "select max(CAST(tcp_port AS SIGNED)) tcp_port from containers"
        return select_tcp_port

    @classmethod
    def detail_env(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        select_env = "select * from env a where a.user_id=\'%s\' and a.service_name=\'%s\'" % (user_id, service_name)
        return select_env

    @classmethod
    def detail_volume(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        select_volume = "select * from volume a where a.user_id=\'%s\' and a.service_name=\'%s\'" % (user_id, service_name)
        return select_volume

    @classmethod
    def query_only(cls, json_list):
        user_id = json_list.get("user_id")
        select_only = "select a.fservice_name from font_service a where (a.user_id = \'%s\')" % (user_id)
        return select_only

    @classmethod
    def delete_sql(cls, json_list):
        user_id = json_list.get("user_id")
        user_name = json_list.get("user_name")
        service_name = json_list.get("service_name")
        rc_name1 = "rc-"+user_name+service_name
        rc_name = rc_name1.replace("_", "-")
        serv_service_name1 = "serv-"+user_name+service_name
        serv_service_name = serv_service_name1.replace("_", "-")
        namespace = json_list.get("namespace")
        del_rc = "delete from replicationcontrollers where uuid in (select rc_id from font_service where fservice_name=\'%s\' and user_id = \'%s\')" % (service_name, user_id)
        del_service = "delete from service where uuid in (select service_id from font_service where user_id = \'%s\' and fservice_name=\'%s\')" % (user_id, service_name)
        del_fservice = "delete from font_service where user_id = \'%s\' and fservice_name = \'%s\'" % (user_id, service_name)
        del_container = "delete from containers where user_id = \'%s\' and service_name = \'%s\'" % (user_id, service_name)
        del_env = "delete from env where user_id = \'%s\' and service_name = \'%s\'" % (user_id, service_name)
        del_volume = "delete from volume where user_id = \'%s\' and service_name = \'%s\'" % (user_id, service_name)
        return del_rc, del_service, del_fservice, del_container, del_env, del_volume

    @classmethod
    def update_sql(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        # container_port = int(json_list.get("container_port"))
        # protocol = json_list.get("protocol")
        # env_key = json_list.get("env_key")
        # env_value = json_list.get("env_value")
        auto_startup = json_list.get("auto_startup")

        image_name = json_list.get("image_name")

        ISOTIMEFORMAT = "%Y-%m-%d %X"
        update_time = time.strftime(ISOTIMEFORMAT, time.localtime())
        if image_name is None:
            update_sql = "update replicationcontrollers set auto_startup=\'%s\', rc_update_time=\'%s\'" \
            "where uuid=(select rc_id from font_service where user_id = \'%s\' and fservice_name = \'%s\')" % (auto_startup, update_time, user_id, service_name)
            return update_sql
        else:
            policy = json_list.get("policy")
            image_name = json_list.get("image_name")
            image_version = json_list.get("image_version")
            update_sql = "update replicationcontrollers set policy=\'%s\', image_name=\'%s\'," \
            "image_version=\'%s\', rc_update_time=\'%s\'" \
            "where uuid=(select rc_id from font_service where user_id = \'%s\' and fservice_name = \'%s\')" % (policy, image_name, image_version, update_time, user_id, service_name)
            return update_sql

    @classmethod
    def add_container_sql(cls, json_list):
        uuids = str(uuid.uuid4())
        rc_id = json_list.get("rc_id")
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        container_port = int(json_list.get("container_port"))
        protocol = json_list.get("protocol")
        access_mode = json_list.get("access_mode")
        access_scope = json_list.get("access_scope")
        add_sql = "insert into containers(uuid,rc_id,user_id,service_name,containerPort,protocol,access_mode,access_scope) values (\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\')" % (uuids, rc_id,user_id,service_name,container_port,protocol,access_mode,access_scope)
        return add_sql


    @classmethod
    def delete_container_sql(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        delete_sql = "delete from containers where rc_id=(select uuid from replicationcontrollers where uuid=(select rc_id from font_service where user_id=\'%s\' and  fservice_name=\'%s\'))" % (user_id, service_name)
        return delete_sql

    @classmethod
    def delete_volume_sql(cls,json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        delete_sql = "delete from volume where rc_id=(select uuid from replicationcontrollers where uuid=(select rc_id from font_service where user_id=\'%s\' and  fservice_name=\'%s\'))" % (user_id, service_name)
        return delete_sql

    @classmethod
    def get_using_volume(cls,json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        get_sql = "select volume_name from volume where rc_id=(select rc_id from font_service where user_id=\'%s\' and  fservice_name=\'%s\')" % (user_id, service_name)
        return get_sql

    @classmethod
    def get_rc_id(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        get_id_sql = "select rc_id from font_service where user_id=\'%s\' and fservice_name=\'%s\'" % (user_id, service_name)
        return get_id_sql

    @classmethod
    def delete_env_sql(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        delete_sql = "delete from env where rc_id=(select uuid from replicationcontrollers where uuid=(select rc_id from font_service where user_id=\'%s\' and  fservice_name=\'%s\'))" % (user_id, service_name)
        return delete_sql

    @classmethod
    def get_update_rc(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        log.info(json_list)
        log.info(user_id)
        # select_rc = "select a.* from replicationcontrollers a, font_service b where b.user_id=%d" \
        # "and b.fservice_name=\'%s\' and a.uuid = b.rc_id" % (user_id, service_name)
        select_rc = "select a.* from replicationcontrollers a, font_service b where b.user_id=\'%s\' and b.fservice_name=\'%s\' and a.uuid = b.rc_id" % (user_id, service_name)
        return select_rc

    @classmethod
    def update_pods(cls, json_list):
        user_id = json_list.get("user_id")
        user_name = json_list.get("user_name")
        service_name = json_list.get("service_name")
        fservice_name = service_name.replace(user_name, "")
        status = json_list.get("status")
        update_podstatus = "update font_service set fservice_status=\'%s\' where user_id =\'%s\' and fservice_name=\'%s\'"%(status, user_id, fservice_name)
        return update_podstatus

    @classmethod
    def anytime_update_pod(cls, json_list):
        status = json_list.get("status")
        user_id = json_list.get("user_id")
        fservice_name = json_list.get("service_name")
        anytime_update_status = "update font_service set fservice_status=\'%s\' where user_id =\'%s\' and fservice_name=\'%s\'"%(status, user_id, fservice_name)
        return anytime_update_status

    @classmethod
    def anytime_update_pod1(cls, json_list):

        status = json_list.get("rc_status")
        anytime_update_status = "update font_service set fservice_status=\'%s\' where all_name =\'%s\'" % (status, json_list.get("rc_name"))
        return anytime_update_status

    @classmethod
    def put_cpu_memory(cls, json_list):
        update_cm = "update replicationcontrollers a set a.limits_cpu = \'%s\',a.limits_memory=\'%s\' where a.uuid=\'%s\'" % (json_list.get("container_cpu"), json_list.get("container_memory"), json_list.get("rc_id"))
        return update_cm

    @classmethod
    def put_auto_startup(cls, json_list):
        update_auto = "update replicationcontrollers a set a.auto_startup = \'%s\' where a.uuid=\'%s\'" % (json_list.get("auto_startup"), json_list.get("rc_id"))
        return update_auto

    @classmethod
    def check_name(cls, json_list):
        select_name = "select fservice_name from font_service where user_id=\'%s\'" % (json_list.get("user_id"))
        return select_name


    @classmethod
    def update_pnum(cls, json_list):
        user_id = json_list.get("user_id")
        service_name = json_list.get("service_name")
        pods_num = int(json_list.get("pods_num"))
        up_sql = "update replicationcontrollers set spec_replicas = \'%s\' where uuid = (select rc_id from font_service where user_id = \'%s\' and fservice_name=\'%s\')" %(pods_num, user_id, service_name)
        return up_sql


    @classmethod
    def time_diff(cls, update_date):
        dates = time.strptime(str(update_date), "%Y-%m-%d %H:%M:%S")
        date1 = datetime.datetime(dates[0], dates[1], dates[2], dates[3], dates[4], dates[5])

        # 实现年\月\日\时\分\秒差值计算
        time_differ = datetime.datetime.now() - date1
        # datetime.datetime() - datetime.dateytime() 是timedelta的,timedelta可以.days,.seconds
        if time_differ.seconds+time_differ.days*86400 < 60:
            return str(time_differ.seconds)+'秒前'
        elif time_differ.seconds+time_differ.days*86400 < 3600:
            return str(time_differ.seconds/60)+'分钟前'
        elif time_differ.seconds+time_differ.days*86400 < 86400:
            return str(time_differ.seconds/3600)+'小时前'
        elif time_differ.days >= 1 and time_differ.days < 30:
            return str(time_differ.days)+'天前'
        elif time_differ.days >= 30 and time_differ.days < 365:
            return str(time_differ.days/30)+'月前'
        else:
            return str(time_differ.days/365)+'年前'
