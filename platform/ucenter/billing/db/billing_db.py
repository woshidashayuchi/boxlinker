# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>


from common.mysql_base import MysqlInit
from common.logs import logging as log


class BillingDB(MysqlInit):

    def __init__(self):

        super(BillingDB, self).__init__()

    def resource_insert(self, resource_uuid, resource_name,
                        resource_type, resource_conf, resource_status,
                        user_uuid, team_uuid, project_uuid):

        sql_01 = "insert into resources_acl(resource_uuid, resource_type, \
                  admin_uuid, team_uuid, project_uuid, user_uuid, \
                  create_time, update_time) \
                  values('%s', '%s', '0', '%s', '%s', '%s', now(), now())" \
                  % (resource_uuid, resource_type,
                     team_uuid, project_uuid, user_uuid)

        sql_02 = "insert into resources(resource_uuid, resource_name, \
                  resource_conf, resource_status, create_time, update_time) \
                  values('%s', '%s', '%s', '%s', now(), now())" \
                  % (resource_uuid, resource_name,
                     resource_conf, resource_status)

        return super(BillingDB, self).exec_update_sql(sql_01, sql_02)

    def resource_delete(self, resource_uuid):

        sql_01 = "delete from resources where resource_uuid='%s'" \
                 % (resource_uuid)

        sql_02 = "delete from resources_acl where resource_uuid='%s'" \
                 % (resource_uuid)

        return super(BillingDB, self).exec_update_sql(sql_01, sql_02)

    def resource_update(self, resource_uuid, resource_conf=None,
                        resource_status=None, user_uuid=None,
                        team_uuid=None, project_uuid=None):

        sql_01 = "update resources set resource_conf='%s', update_time=now() \
                  where resource_uuid='%s'" \
                  % (resource_conf, resource_uuid)

        sql_02 = "update resources set resource_status='%s', update_time=now() \
                  where resource_uuid='%s'" \
                  % (resource_status, resource_uuid)

        sql_03 = "update resources_acl set team_uuid='%s', update_time=now() \
                  where resource_uuid='%s'" \
                  % (team_uuid, resource_uuid)

        sql_04 = "update resources_acl set project_uuid='%s', update_time=now() \
                  where resource_uuid='%s'" \
                  % (project_uuid, resource_uuid)

        sql_05 = "update resources_acl set user_uuid='%s', update_time=now() \
                  where resource_uuid='%s'" \
                  % (user_uuid, resource_uuid)

        if resource_conf is not None:
            super(BillingDB, self).exec_update_sql(sql_01)

        if resource_status is not None:
            super(BillingDB, self).exec_update_sql(sql_02)

        if team_uuid is not None:
            super(BillingDB, self).exec_update_sql(sql_03)

        if project_uuid is not None:
            super(BillingDB, self).exec_update_sql(sql_04)

        if user_uuid is not None:
            super(BillingDB, self).exec_update_sql(sql_05)

        return

    def resource_list(self, team_uuid):

        sql = "select a.resource_uuid, a.resource_type, a.admin_uuid, \
               a.orga_uuid, a.user_uuid, a.create_time, a.update_time, \
               b.resource_name, b.resource_conf, b.resource_status \
               from resources_acl a join resources b \
               where a.resource_uuid=b.resource_uuid and a.team_uuid='%s'" \
               % (team_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def resources_list(self):

        sql = "select a.resource_uuid, a.resource_type, a.orga_uuid, a.user_uuid, \
               b.resource_conf, b.resource_status \
               from resources_acl a join resources b \
               where a.resource_uuid=b.resource_uuid"

        return super(BillingDB, self).exec_select_sql(sql)

    def voucher_insert(self, user_uuid, denomination, invalid_time):

        denomination = int(denomination)
        sql = "insert into vouchers(vouchers_uuid, createuser_uuid, \
               denomination, balance, active_time, invalid_time, \
               create_time, update_time) \
               values(uuid(), '%s', '%d', '%d', 0, '%s', now(), now())" \
               % (user_uuid, denomination, denomination, invalid_time)

        return super(BillingDB, self).exec_update_sql(sql)

    def voucher_active(self, voucher_uuid, orga_uuid, user_uuid):

        sql_01 = "insert into resources_acl(resource_uuid, resource_type, \
                  admin_uuid, orga_uuid, user_uuid, create_time, update_time) \
                  values('%s', 'voucher', '0', '%s', '%s', now(), now())" \
                  % (voucher_uuid, orga_uuid, user_uuid)

        sql_02 = "update vouchers set active_time=now(), update_time=now() \
                  where vouchers_uuid='%s'" \
                  % (voucher_uuid)

        return super(BillingDB, self).exec_update_sql(sql_01, sql_02)

    def voucher_check(self, user_uuid, orga_uuid, amount):

        amount = float(amount)
        sql = "select a.vouchers_uuid from vouchers a join resources_acl b \
               where a.vouchers_uuid=b.resource_uuid  \
               and a.invalid_time >= now() and a.balance >= %f \
               and b.user_uuid='%s' and b.orga_uuid='%s' \
               order by a.invalid_time asc limit 1" \
               % (amount, user_uuid, orga_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def voucher_update(self, voucher_uuid, amount):

        amount = float(amount)
        sql = "update vouchers set balance=balance - %f, update_time=now() \
               where vouchers_uuid='%s'" \
               % (amount, voucher_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def voucher_list(self, user_uuid, orga_uuid,
                     role_uuid, start_time, end_time):

        role_uuid = int(role_uuid)
        if (role_uuid/100 == 1):
            sql = "select vouchers_uuid, createuser_uuid, denomination, \
                   invalid_time, create_time, update_time \
                   from vouchers where active_time=0 and create_time between '%s' and '%s'" \
                   % (start_time, end_time)

        elif (role_uuid/100 == 2):
            sql = "select a.resource_uuid, a.user_uuid, \
                   b.denomination, b.balance, b.active_time, b.invalid_time \
                   from resources_acl a join vouchers b \
                   where a.resource_uuid=b.vouchers_uuid and a.orga_uuid='%s' \
                   and b.create_time between '%s' and '%s'" \
                   % (orga_uuid, start_time, end_time)

        else:
            sql = "select a.resource_uuid, b.denomination, b.balance, \
                   b.active_time, b.invalid_time \
                   from resources_acl a join vouchers b \
                   where a.resource_uuid=b.vouchers_uuid and a.orga_uuid='%s' \
                   and a.user_uuid='%s' and b.create_time between '%s' and '%s'" \
                   % (orga_uuid, user_uuid, start_time, end_time)

        return super(BillingDB, self).exec_select_sql(sql)

    def balance_insert(self, user_uuid):

        sql = "insert into balances(user_uuid, balance, create_time, update_time) \
               values('%s', 0, now(), now())" \
               % (user_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def balance_update(self, user_uuid, amount):

        amount = float(amount)
        sql = "update balances set balance=balance + %f, update_time=now() \
               where user_uuid='%s'" \
               % (amount, user_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def balance_info(self, user_uuid):

        sql = "select balance, update_time \
               from balances where user_uuid='%s'" \
               % (user_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def bill_insert(self, user_uuid, team_uuid, project_uuid,
                    resource_uuid, resource_cost, voucher_cost):

        sql = "insert into bills(resource_uuid, resource_cost, voucher_cost, \
               owner_uuid, team_uuid, project_uuid, insert_time) \
               values('%s', '%f', '%f', '%s', '%s', '%s', now())" \
               % (resource_uuid, float(resource_cost), float(voucher_cost),
                  user_uuid, team_uuid, project_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def bill_list(self, user_uuid, start_time, end_time):

        sql = "select a.resource_uuid, a.resource_name, \
               b.resource_type, \
               round(sum(c.resource_cost), 2), round(sum(c.voucher_cost), 2) \
               from resources a join resources_acl b join bills c \
               where a.resource_uuid=b.resource_uuid \
               and b.resource_uuid = c.resource_uuid \
               and c.owner_uuid='%s' \
               and c.insert_time between '%s' and '%s' \
               group by b.resource_type" \
               % (user_uuid, start_time, end_time)

        return super(BillingDB, self).exec_select_sql(sql)

    def order_insert(self, user_uuid, team_uuid, project_uuid,
                     order_uuid, resource_uuid, cost, status):

        sql_01 = "insert into resources_acl(resource_uuid, resource_type, \
                  admin_uuid, team_uuid, project_uuid, user_uuid, \
                  create_time, update_time) \
                  values('%s', 'order', '0', '%s', '%s', '%s', now(), now())" \
                  % (order_uuid, team_uuid, project_uuid, user_uuid)

        sql_02 = "insert into orders(orders_uuid, resource_uuid, \
                  cost, status, create_time, update_time) \
                  values('%s', '%s', '%s', '%s', now(), now())" \
                  % (order_uuid, resource_uuid, cost, status)

        return super(BillingDB, self).exec_update_sql(sql_01, sql_02)

    def order_update(self, order_uuid, cost, status):

        sql = "update orders set cost='%s', status='%s', update_time=now() \
               where orders_uuid='%s'" \
               % (cost, status, order_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def order_list(self, user_uuid, start_time, end_time):

        sql = "select a.resource_uuid, b.resource_uuid, b.cost, \
               b.status, b.create_time, b.update_time \
               from resources_acl a join orders b \
               where a.resource_uuid=b.orders_uuid \
               and a.user_uuid='%s' and b.create_time between '%s' and '%s'" \
               % (user_uuid, start_time, end_time)

        return super(BillingDB, self).exec_select_sql(sql)
