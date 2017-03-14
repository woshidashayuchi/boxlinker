# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os


mq_server01 = '127.0.0.1'
mq_server02 = '127.0.0.1'
mq_port = 5672

# mq_server01 = os.environ.get('MQ_SERVER01')
# mq_server02 = os.environ.get('MQ_SERVER02')
# mq_port = os.environ.get('MQ_PORT')


db_server01 = '127.0.0.1'
db_server02 = '127.0.0.1'
db_port = 3306
db_user = 'cloud'
db_passwd = 'cloud'
database = 'billing'

# db_server01 = os.environ.get('DB_SERVER01')
# db_server02 = os.environ.get('DB_SERVER02')
# db_port = os.environ.get('DB_PORT')
# db_user = os.environ.get('DB_USER')
# db_passwd = os.environ.get('DB_PASSWD')
# database = os.environ.get('DATABASE')

api_host = '0.0.0.0'
api_port = 8002
api_debug = True

rest_host = '0.0.0.0'
rest_debug = True
billing_port = 8002

log_level = 'INFO'
log_file = '/var/log/cloud.log'

balance_check = True
limit_check = True

ucenter_call_queue = 'ucenter_call_api'
billing_call_queue = 'billing_call_api'
billing_cast_queue = 'billing_cast_api'

level_up_exp = {
                   1: 100,
                   2: 1000,
                   3: 10000,
                   4: 100000,
                   5: 1000000
               }

app_datum_cost = 0.2
hdd_datum_cost = 0.1
ssd_datum_cost = 0.4
bwh_datum_cost = 0.5
fip_datum_cost = 0.1
def_datum_cost = 0.1

ali_pay_api = 'https://openapi.alipaydev.com/gateway.do'
# ali_pay_api = 'https://openapi.alipay.com/gateway.do'
ali_pay_app_id = '2016080300159362'
ali_pay_sign = ''

weixin_pay_api = 'xxx'

private_key = '''-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA0da1K7zm+Ot0V/1zIbne6QDa7/SCLpzxIGhbM1o/BqlN5ed0
y3mT1kDEzANBLmrnOzlnIKO9R2br5t/tp+HRXGW2nSmNwDvkazgQSZ1uR3CRUerz
YsEXAhmaei989IRmZxNIyWpp2C1kptLNsIt5COmzMr+DFu3mMgK/QjzP6ow8yggq
qgYk14GfZdjGciXmsDjApLNAlRTsLNTLgD5ifQnxf3C3vdkQ+cNWV2nwP/cQyH5l
3rbJZTlNVKlVMhGP35KzM3xdsqbWdMbnu6cnFiMDMNKaXQx7SGW7ZAraPfUN3cW3
AWhv0zReVoVvMpRP5F+3+R8OjcEccdQGQRs7fQIDAQABAoIBAB4aiV8++HvZe5Vr
/Opnufz/bGlkUJDTXxxhHERfvA7+lvhWnkDarkTcgd8q0F0SZR3v/EWIeA0YTNuQ
YI3nLZvt06b0YSuk6/4dyuhkt390PMTdyhDu1pgsiCbjTS/fFrnO4HBU3d5vlLMC
JxQezjxjGpw7MVlGw/GEx19/Tey98yYE33sHXVGts8ycP90s1ds5Ok3EkCzm3ys9
imjqHiEx+fdqVYlYBlP9dODr+BpJRJISas7otDwr+0SCSs+kYIptOO6FPtG+skvt
oxGou54T8v0fpArDm+oUsIGSnxQHDiXVDy4pmqSHL///ppxwg9ZzTz7tr2JmrFym
tdhXzZkCgYEA8LNHoUnzBObKC0gpsAu0ZH7BHGxgsWbeJ3nd63Zu5aYyijRcth06
a1SFDke6MzPblZM9JOEWaOeScF4/PCN5ZhmeqkeZc43Uo3qNnK9pSXpDsHfy3iVC
ApegCf1aisaCPmr9hsjo2AGu3KY2xBiza9mzd6ihS3bkKHn/nWXuta8CgYEA3y09
9qwSrf0o6rF6QHTNBZhcUTOBuF08YB1oUUuiUJW1ZBjOfnNS6DDgKDGk7Z2T6m0Z
scnaA+QUHj4XV68LmyE6ks/yBF1qIbKdhTn9kn3FC8pkThiK2QhSZIBcieF4vcfB
dm+yKUSlrQ7oYei6Yes4YEYeglaTXIr/FwinmJMCgYEAoAz2Il+DwsybqKjRX4hI
6VIHopjGKvBV5DX6xKk50GaU0KVEyKvivp+y4e37+DQRXQJM9Arf1d212BYzQg/s
l2GNyXhWpym2LQY+x+MzxXIRNHRuAB0SKZsdBcd7vy+ER3DpKAjMG2XzGjFD1Vz/
YUWfOn/c0Ms7p1aIC+dNtW0CgYEArEKGdlRg4qzqHSS6APBmo2/zqbWA5eYJSQLJ
1x3y/hJf/Q/sqsum7ZN0IXIYJFQhrKtjTshHoAM2yBUS/VoeMjIWvOUGn/nehn4Q
eZnGMIElS7F/dIwa9+QlfG9bfg1rnciGej1Cnfnfi1Fbat8wpY3iaOUWfXIHskGT
HZtPiUMCgYEAgA6QitWZUuexGiTltBi/ayJJgDKxI7J6234Xn9yEf9IFtc9DzBPv
2Dy6CoqBfyEaxZRcLD2OEtzfnEDap6fxhZm0qFazOv48hX5tTMoYsNNMi3cl74e2
EexF95KMqcI5MEkJZteBveigAr5vAaTKUmHU9xeJzqvVfOmmEAiRZt4=
-----END RSA PRIVATE KEY-----'''

public_key = '''-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0da1K7zm+Ot0V/1zIbne
6QDa7/SCLpzxIGhbM1o/BqlN5ed0y3mT1kDEzANBLmrnOzlnIKO9R2br5t/tp+HR
XGW2nSmNwDvkazgQSZ1uR3CRUerzYsEXAhmaei989IRmZxNIyWpp2C1kptLNsIt5
COmzMr+DFu3mMgK/QjzP6ow8yggqqgYk14GfZdjGciXmsDjApLNAlRTsLNTLgD5i
fQnxf3C3vdkQ+cNWV2nwP/cQyH5l3rbJZTlNVKlVMhGP35KzM3xdsqbWdMbnu6cn
FiMDMNKaXQx7SGW7ZAraPfUN3cW3AWhv0zReVoVvMpRP5F+3+R8OjcEccdQGQRs7
fQIDAQAB
-----END PUBLIC KEY-----'''


