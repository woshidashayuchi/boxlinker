from sqlalchemy.sql import func
from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class Service(object):
    def __init__(self):
        pass

    __tablename__ = 'service'
    uuid = Column(String(64), primary_key=True)
    service_name = Column(String(64))
    labels = Column(String(64))
    selector_name = Column(String(64))
    ports_name = Column(String(64))
    ports_port = Column(Integer)
    ports_targetport = Column(Integer)
    service_domain_name = Column(String(64))
    service_create_time = Column(DateTime, server_default=func.now())
    service_update_time = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return '%s(%r, %r, %r, %r, %r, %d, %d, %r, %r, %r)' % \
               (self.__class__.__name__, self.uuid, self.service_name, self.labels, self.selector_name,
                self.ports_name, self.ports_port, self.ports_targetport, self.service_domain_name,
                self.service_create_time, self.service_update_time)
