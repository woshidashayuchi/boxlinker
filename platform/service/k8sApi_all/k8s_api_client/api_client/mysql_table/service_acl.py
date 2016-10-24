#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/8
# Author: wang-xf

from sqlalchemy.sql import func
from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class ServiceAcl(object):

    def __init__(self):
        pass

    __tablename__ = 'service_acl'
    uuid = Column(String(64), primary_key=True)
    service_name = Column(String(64))
    resource_type = Column(String(64))
    admin = Column(String(64))
    organization = Column(String(64))
    user = Column(String(64))
    create_time = Column(DateTime, server_default=func.now())
    update_time = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return '%s(%r, %r, %r, %r, %r, %r, %r, %r)' % \
               (self.__class__.__name__, self.uuid, self.service_name, self.resource_type, self.admin,
                self.organization, self.user, self.create_time, self.update_time)
