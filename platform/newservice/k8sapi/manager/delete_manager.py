# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/14

from common.logs import logging as log
from db.service_db import ServiceDB


class DeleteManager(object):

    def __init__(self):
        self.service_db = ServiceDB()

    def service_delete(self, context):
        log.info('the data(in) when delete service....is: %s' % context)
        pass
