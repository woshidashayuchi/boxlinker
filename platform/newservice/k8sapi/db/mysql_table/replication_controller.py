#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:王晓峰
from sqlalchemy.sql import func
from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()



class ReplicationControllers(object):
    def __init__(self):
        pass

    __tablename__ = 'replicationcontrollers'
    uuid = Column(String(64), primary_key=True)
    rc_name = Column(String(64))
    labels_name = Column(String(64))
    spec_replicas = Column(Integer)
    spec_selector_name = Column(String(64))
    template_name = Column(String(64))
    template_container_name = Column(String(64))
    image_id = Column(String(64))
    image_name = Column(String(64))
    image_version = Column(String(64))
    limits_cpu = Column(String(64))
    limits_memory = Column(String(64))
    policy = Column(String(32))
    auto_startup = Column(String(32))
    containerPort = Column(String(64))
    protocol = Column(String(32))
    env_name = Column(String(32))
    env_value = Column(String(32))
    command = Column(String(64))
    rc_create_time = Column(DateTime, server_default=func.now())
    rc_update_time = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return '%s(%r, %r, %r, %d, %r, %r,%r,%r, %r, %r, %r, %r, %r,%r, %d, %r, %r, %r, %r, %r, %r)' % \
                (self.__class__.__name__, self.uuid, self.rc_name, self.labels_name, self.spec_replicas,
                 self.spec_selector_name, self.template_name, self.template_container_name, self.image_id,
                 self.image_name, self.image_version, self.limits_cpu, self.limits_memory, self.policy,
                 self.auto_startup, self.containerPort, self.protocol, self.env_name, self.env_value,
                 self.command, self.rc_create_time, self.rc_update_time)
