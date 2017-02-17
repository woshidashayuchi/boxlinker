# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/10
from common.logs import logging as log
from conf import conf
import requests
import json


class TokenDriver(object):

    def __init__(self):
        self.url = conf.TEAM_MSG

    def gain_team_name(self, dict_data):
        # project_uuid = '/' + dict_data.get('project_uuid')
        headers = {'token': dict_data.get('token')}

        try:
            ret = requests.get(self.url, headers=headers, timeout=5)
            ret = json.loads(ret.text)

        except Exception, e:
            log.error('gain the project message error, reason: %s' % e)
            return False

        if ret.get('status') == 0:
            for i in ret.get('result').get('team_list'):
                if i.get('team_uuid') == dict_data.get('team_uuid'):
                    return i.get('team_name')

            return False
        else:
            return False
