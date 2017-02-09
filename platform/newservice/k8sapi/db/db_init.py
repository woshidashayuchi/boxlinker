#! /usr/bin python
# -*- coding:utf8 -*-
# Date: 2016/8/9
# Author: wang-xf

from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import create_engine
from sqlalchemy import func
from sqlalchemy import String, Column, Integer
from sqlalchemy import DateTime
import os


class DBInit(object):

    def __init__(self):
        pass

    db_config = {
        'host': os.environ.get('MYSQL_HOST'),
        'user': 'cloudsvc',
        'passwd': 'cloudsvc',
        'db': 'servicedata',
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
    font_service = Table('font_service', metadata,
        Column('uuid', String(64), primary_key=True),
        Column('user_uuid', String(64)),
        Column('team_uuid', String(64)),
        Column('project_uuid', String(64)),
        Column('service_uuid', String(64)),
        Column('rc_uuid', String(64)),
        Column('service_name', String(64)),
        Column('service_status', String(20)),
        Column('all_name', String(64)),
        Column('image_dir', String(200)),
        Column('service_create_time', DateTime, server_default=func.now()),
        Column('service_update_time', DateTime, server_default=func.now())
    )

    rc_table = Table('replicationcontrollers', metadata,
        Column('uuid', String(64), primary_key=True),
        # Column('rc_name', String(64)),
        Column('labels_name', String(64)),
        Column('pods_num', Integer),
        # Column('spec_selector_name', String(64)),
        # Column('template_name', String(64)),
        # Column('template_container_name', String(64)),
        Column('image_id', String(64)),
        # Column('image_name', String(64)),
        # Column('image_version', String(64)),
        Column('container_cpu', String(64)),
        Column('container_memory', String(64)),
        Column('policy', Integer),
        Column('auto_startup', Integer),
        Column('command', String(64)),
        Column('isUpdate', Integer),
        # Column('containerPort', String(64)),
        # Column('protocol', String(32)),
        # Column('env_name', String(32)),
        # Column('env_value', String(32)),
        Column('rc_create_time', DateTime, server_default=func.now()),
        Column('rc_update_time', DateTime, server_default=func.now())
    )

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

    container = Table('containers', metadata,
        Column('uuid', String(64), primary_key=True),
        Column('rc_uuid', String(64)),
        # Column('user_id', String(64)),
        # Column('service_name', String(64)),
        Column('container_port', Integer),
        Column('protocol', String(32)),
        Column('access_mode', String(32)),
        Column('access_scope', String(32)),
        Column('tcp_port', String(32)),
        Column('http_domain', String(64)),
        Column('tcp_domain', String(64)),
        Column('private_domain', String(64)),
        Column('identify', Integer, default=0)

    )

    env = Table('env', metadata,
        Column('uuid', String(64), primary_key=True),
        Column('rc_uuid', String(64)),
        # Column('user_id', String(64)),
        # Column('service_name', String(64)),
        Column('env_key', String(32)),
        Column('env_value', String(32))
    )

    acl = Table('service_acl', metadata,
        Column('uuid', String(64), primary_key=True),
        Column('service_name', String(64)),
        Column('resource_type', String(64)),
        Column('admin', String(64)),
        Column('organization', String(64)),
        Column('user', String(64)),
        Column('role', Integer),
        Column('create_time', DateTime, server_default=func.now()),
        Column('update_time', DateTime, server_default=func.now())

        )

    volume = Table('volume', metadata,
        Column('uuid', String(64), primary_key=True),
        Column('rc_uuid', String(64)),
        Column('user_uuid', String(64)),
        # Column('service_name', String(64)),
        Column('volume_uuid', String(64)),
        Column('volume_path', String(64)),
        Column('read_only', String(32), server_default='True')
        )

    metadata.create_all(engine)

    Table('replicationcontrollers', metadata, autoload=True)
    Table('service', metadata, autoload=True)
    Table('font_service', metadata, autoload=True)
    Table('containers', metadata, autoload=True)
    Table('env', metadata, autoload=True)
    Table('volume', metadata, autoload=True)
    Table('service_acl', metadata, autoload=True)

