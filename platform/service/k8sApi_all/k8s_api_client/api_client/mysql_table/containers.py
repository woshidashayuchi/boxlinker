#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/8
# Author:王晓峰

from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class Containers(object):

    def __init__(self):
        pass

    __tablename__ = 'replicationcontrollers'

    uuid = Column(String(64), primary_key=True)
    rc_id = Column(String(64))
    user_id = Column(String(64))
    service_name = Column(String(64))
    containerPort = Column(String(64))
    protocol = Column(String(32))
    access_mode = Column(String(32))
    access_scope = Column(String(32))
    tcp_port = Column(String(32))
    http_domain = Column(String(64))
    tcp_domain = Column(String(64))
    private_domain = Column(String(64))
    identify = Column(String(32))

    def __repr__(self):
        return '%s(%r, %r, %r, %d, %r, %r, %r, %r, %r, %r,%r, %d, %r, %r, %r, %r, %r, %r, %r)' % \
                (self.__class__.__name__, self.uuid, self.rc_id, self.user_id, self.service_name, self.containerPort,
                 self.protocol, self.access_mode, self.access_scope, self.tcp_port, self.http_domain, self.tcp_domain,
                 self.private_domain, self.identify)
