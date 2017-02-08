#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2016/8/9
# Author:王晓峰

import time
import datetime
# current_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))  # '2016-09-01 09:53:09'
datetime.datetime.now()  # datetime.datetime(2016, 9, 1, 9, 55, 10, 558469)
datetime.datetime.fromtimestamp(time.time())  # 可以将time.time()转换为六位方式,与datetime.datetime.now()等价
ddd = float('2016-09-01 09:53:09')
time_diffs = datetime.datetime.now() - datetime.datetime(time.strftime('%Y,%m,%d,%H,%M,%S', time.localtime(ddd)))

current_time = tuple(time.strftime('%Y,%m,%d,%H,%M,%S', time.localtime(time.time())))
year = current_time
print year


dates = time.strptime("2012-08-16 01:28:33", "%Y-%m-%d %H:%M:%S")
date1 = datetime.datetime(dates[0], dates[1], dates[2], dates[3], dates[4], dates[5])

# 实现年\月\日\时\分\秒差值计算
time_diff = datetime.datetime.now() - datetime.datetime(2016, 9, 1, 11, 8, 10)
# datetime.datetime() - datetime.dateytime() 是timedelta的,timedelta可以.days,.seconds
if time_diff.seconds+time_diff.days*86400 < 60:
    print(str(time_diff.seconds)+'sec')
elif time_diff.seconds+time_diff.days*86400 < 3600:
    print(str(time_diff.seconds/60)+'min')
elif time_diff.seconds+time_diff.days*86400 < 86400:
    print(str(time_diff.seconds/3600)+'hr')
else:
    print(str(time_diff.days)+'d')




