# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 17/4/5 下午4:29

from common.logs import logging as log
from conf import conf


class CreateApp(object):
    def __init__(self):
        self.url = conf.SERVICE_URL

    def restore_app(self, dict_data):
        pass
