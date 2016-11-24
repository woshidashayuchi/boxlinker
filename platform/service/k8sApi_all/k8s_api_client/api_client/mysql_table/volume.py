#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/9/8
# Author:王晓峰

from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class Volume(object):

    def __init__(self):
        pass

    __tablename__ = 'volume'

    uuid = Column(String(64), primary_key=True)
    rc_id = Column(String(64))
    user_id = Column(String(64))
    service_name = Column(String(64))
    volume_id = Column(String(64))
    volume_path = Column(String(64))
    read_only = Column(String(32), server_default='True')

    def __repr__(self):
        return '%s(%r, %r, %r, %r, %r, %r, %r)' % \
                (self.__class__.__name__, self.uuid, self.rc_id, self.user_id, self.service_name, self.volume_name,
                 self.volume_path, self.read_only)
