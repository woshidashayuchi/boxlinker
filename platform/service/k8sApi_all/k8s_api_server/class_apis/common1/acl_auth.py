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

    def resource_acl_check(self, user_name, user_role,
                           user_orag, resource_name, resource_type):
        user_role = int(user_role)
        try:
            res_ac = self.auth_db.resource_ac(
                     resource_name, resource_type, user_role, user_orag)
        except Exception:
            return 1
        if (user_role == 0) and (res_ac == 'global'):
            return 0
        elif (user_role == 1) and (res_ac == 'global' or res_ac == user_orag):
            return 0
        elif (user_role == 2) and (res_ac == 'global' or res_ac == user_name):
            return 0
        else:
            return 1


def acl_check(func):

    def _aclauth(*args, **kwargs):

        func_args = inspect.getcallargs(func, *args, **kwargs)
        user_name = func_args.get('user_name')
        user_role = func_args.get('user_role')
        user_orag = func_args.get('user_orag')
        resource_name = func_args.get('resource_name')
        resource_type = func_args.get('resource_type')

        log.debug('acl auth, user_name=%s, user_role=%s, user_orag=%s'
                  % (user_name, user_role, user_orag))

        auth_manager = AuthManager()

        acl_check = auth_manager.resource_acl_check(
                    user_name, user_role, user_orag,
                    resource_name, resource_type)
        if acl_check == 0:
            result = func(*args, **kwargs)
        else:
            log.warning('Resource acl auth denied: user_name = %s, \
                         user_role = %s, user_orag = %s, \
                         resource_name = %s, resource_type = %s'
                        % (user_name, user_role, user_orag,
                           resource_name, resource_type))

            return request_result(202)

        return result

    return _aclauth
