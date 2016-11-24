# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import sys
import re
from common.logs import logging as log


def parameter_check(parameter, ptype='pstr', exist='yes'):

    if (exist == 'no') and (parameter is None):
        return parameter

    para_format = {
        "pstr": "[A-Za-z0-9-_]{1,60}$",
        "pnam": "[A-Za-z]{1}[A-Za-z0-9-_]{0,59}$",
        "pint": "-{0,1}[0-9]{1,16}$",
        "pflt": "-{0,1}[0-9]{1,15}[.]{0,1}[0-9]{1,6}$",
        "ppwd": ".{5,60}"
    }

    m = re.match(para_format[ptype], str(parameter))
    if m is None:
        log.warning('parameter format error, parameter=%s, ptype=%s, exist=%s'
                    % (str(parameter), ptype, exist))
        raise(Exception('parameter format error'))

    return parameter

if __name__ == "__main__":

    parameter = sys.argv[1]
    ptype = sys.argv[2]
    exist = sys.argv[3]

    try:
        parameter = parameter_check(parameter, ptype, exist)
        print('parameter check success, parameter=%s' % (parameter))
    except Exception, e:
        print('parameter error, reason=%s' % (e))
