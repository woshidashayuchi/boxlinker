#!/bin/sh
service apache2 start

# 没有这一行 Apache 启动会失败
tail -f /var/log/apache2/error.log