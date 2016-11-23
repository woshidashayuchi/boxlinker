# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import inspect
import requests

from common.logs import logging as log
from common.code import request_result
from common.db import auth_db


class AuthManager(object):

    def __init__(self):
        self.auth_db = auth_db.AuthDB()

    def resource_acl_check(self, user_uuid, orga_uuid,
                           role_uuid, resource_uuid):

        role_uuid = int(role_uuid)
        try:
            acl_check = self.auth_db.acl_check(resource_uuid, role_uuid)
        except Exception:
            return 1

        if (role_uuid/100 == 2) and \
           (acl_check == 'global' or acl_check == orga_uuid):
            return 0

        elif (acl_check == 'global' or acl_check == user_uuid):
            return 0

        else:
            return 1


def acl_check(func):

    def _aclauth(*args, **kwargs):

        func_args = inspect.getcallargs(func, *args, **kwargs)
        context = func_args.get('context')
        user_info = context['user_info']

        user_uuid = user_info['user_uuid']
        orga_uuid = user_info['orga_uuid']
        role_uuid = user_info['role_uuid']
        resource_uuid = context['resource_uuid']

        log.debug('Acl auth, user_uuid=%s, orga_uuid=%s, role_uuid=%s'
                  % (user_uuid, orga_uuid, role_uuid))

        auth_manager = AuthManager()

        acl_check = auth_manager.resource_acl_check(
                    user_uuid, orga_uuid,
                    role_uuid, resource_uuid)

        if acl_check == 0:
            result = func(*args, **kwargs)
        else:
            log.warning('Resource acl auth denied: user_uuid = %s, \
                         orga_uuid = %s, role_uuid = %s, \
                         resource_uuid = %s'
                        % (user_uuid, orga_uuid,
                           role_uuid, resource_uuid))

            return request_result(202)

        return result

    return _aclauth
