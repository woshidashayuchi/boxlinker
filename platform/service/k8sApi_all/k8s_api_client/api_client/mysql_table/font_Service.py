from sqlalchemy.sql import func
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class FontService(object):
    def __init__(self):
        pass

    __tablename__ = 'font_service'
    uuid = Column(String(64), primary_key=True)
    user_id = Column(String(64))
    orga_id = Column(String(64))
    service_id = Column(String(64))
    rc_id = Column(String(64))
    fservice_name = Column(String(64))
    fservice_status = Column(String(20))
    all_name = Column(String(64))
    fservice_create_time = Column(DateTime, server_default=func.now())
    fservice_update_time = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return '%s(%r, %r, %r, %r, %r, %r, %r, %r, %r)' % \
               (self.__class__.__name__, self.uuid, self.user_id, self.orga_id, self.service_id, self.rc_id, self.fservice_name,
                self.fservice_status, self.fservice_create_time, self.fservice_update_time)
