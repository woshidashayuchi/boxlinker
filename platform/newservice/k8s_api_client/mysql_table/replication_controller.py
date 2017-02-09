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
    # rc_name = Column(String(64))
    labels_name = Column(String(64))
    pods_num = Column(Integer)
    # spec_selector_name = Column(String(64))
    # template_name = Column(String(64))
    # template_container_name = Column(String(64))
    image_id = Column(String(64))
    # image_name = Column(String(64))
    # image_version = Column(String(64))
    container_cpu = Column(String(64))
    container_memory = Column(String(64))
    policy = Column(Integer)
    auto_startup = Column(Integer)
    isUpdate = Column(Integer)
    # containerPort = Column(String(64))
    # protocol = Column(String(32))
    # env_name = Column(String(32))
    # env_value = Column(String(32))
    command = Column(String(64))
    rc_create_time = Column(DateTime, server_default=func.now())
    rc_update_time = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return '%s(%r, %r, %d, %r, %r, %r, %d,%d, %r, %d, %r, %r)' % \
                (self.__class__.__name__, self.uuid, self.labels_name, self.pods_num, self.image_id,
                 self.container_cpu, self.container_memory, self.policy,
                 self.auto_startup, self.isUpdate, self.command, self.rc_create_time, self.rc_update_time)
