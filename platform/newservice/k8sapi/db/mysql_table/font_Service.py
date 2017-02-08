from sqlalchemy.sql import func
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class FontService(object):
    def __init__(self):
        pass

    __tablename__ = 'font_service'
    uuid = Column(String(64), primary_key=True)
    user_uuid = Column(String(64))
    team_uuid = Column(String(64))
    project_uuid = Column(String(64))
    service_uuid = Column(String(64))
    rc_uuid = Column(String(64))
    service_name = Column(String(64))
    service_status = Column(String(20))
    all_name = Column(String(64))
    image_dir = Column(String(200))
    service_create_time = Column(DateTime, server_default=func.now())
    service_update_time = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return '%s(%r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r)' % \
               (self.__class__.__name__, self.uuid, self.user_uuid, self.team_uuid, self.project_uuid,
                self.service_uuid, self.rc_uuid, self.service_name, self.service_status, self.all_name,
                self.image_dir, self.service_create_time, self.service_update_time)
