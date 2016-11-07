#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/11/4
# Author:wang-xf

from __future__ import print_function
from collections import OrderedDict


def CPUinfo():

    CPUinfo=OrderedDict()
    procinfo=OrderedDict()

    nprocs = 0
    with open('/proc/cpuinfo') as f:
        for line in f:
            if not line.strip():

                CPUinfo['proc%s' % nprocs]=procinfo
                nprocs = nprocs+1

                procinfo=OrderedDict()
            else:
                if len(line.split(':')) == 2:
                    procinfo[line.split(':')[0].strip()] = line.split(':')[1].strip()
                else:
                    procinfo[line.split(':')[0].strip()] = ''
    return CPUinfo

def meminfo():

    meminfo = OrderedDict()

    with open('/proc/meminfo') as f:
        for line in f:
            meminfo[line.split(':')[0]] = line.split(':')[1].strip()
    return meminfo


if __name__=='__main__':
    CPUinfo = CPUinfo()
    meminfo = meminfo()
    for processor in CPUinfo.keys():
        print('CPUinfo[{0}]={1}'.format(processor, CPUinfo[processor]['model name']))
        print('Total memory:{0}'.format(meminfo['MemTotal']))
        print('Free memory:{0}'.format(meminfo['MemFree']))
