# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/27

from service_db import ServiceDB
from common.logs import logging as log


class DataInit(object):
    service_db = ServiceDB()
    try:
        ret = service_db.init_insert()
        # if ret is not None:
        #     raise Exception('resources acl init error')
    except Exception, e:
        log.error('init api(insert into database) error, reason=%s' % e)
        # raise
