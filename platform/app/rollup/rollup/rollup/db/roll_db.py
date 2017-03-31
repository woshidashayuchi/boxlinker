# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/07

from common.mysql_base import MysqlInit
from common.logs import logging as log


class ServiceDB(MysqlInit):

    def __init__(self):
        super(ServiceDB, self).__init__()

    def compare_image_id(self, image_id):
        sql = "select a.service_name, a.project_uuid from font_service a, replicationcontrollers b " \
              "WHERE a.rc_uuid=b.uuid AND b.image_id='%s' AND b.policy=%d" % (str(image_id), 1)

        log.info('select the database sql is: %s' % sql)

        return super(ServiceDB, self).exec_select_sql(sql)
