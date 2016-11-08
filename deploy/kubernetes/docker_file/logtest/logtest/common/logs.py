# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


import logging

logging.basicConfig(
    level=logging.DEBUG,
    filename='/var/log/cloud.log',
    format='%(asctime)s [%(levelname)s] %(filename)s[line:%(lineno)d] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    filemode='a'
    )

console = logging.StreamHandler()
console.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    '{"time": \"%(asctime)s\", "level": \"%(levelname)s\", "file": \"%(filename)s[line:%(lineno)d]\", "log": %(message)s}')
console.setFormatter(formatter)
logging.getLogger('').addHandler(console)
