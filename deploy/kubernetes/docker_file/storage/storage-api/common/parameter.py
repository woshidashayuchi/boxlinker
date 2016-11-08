# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import re


def parameters_check(parameters, pexcept=[]):

    para_format = '[A-Za-z0-9]{1,30}[-_]{0,20}'
    for k, v in parameters.items():
        m = re.match(para_format, v)
        if (m is None) and (k not in pexcept):
            del parameters[k]

    return parameters
