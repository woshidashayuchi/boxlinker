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

        sql = "select a.resource_uuid, a.resource_type, \
               a.team_uuid, a.project_uuid, a.user_uuid, \
               a.create_time, a.update_time, \
               b.resource_name, b.resource_conf, b.resource_status \
               from resources_acl a join resources b \
               where a.resource_uuid=b.resource_uuid and a.team_uuid='%s'" \
               % (team_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def resources_list(self):

        sql = "select a.resource_uuid, a.resource_type, \
               a.team_uuid, a.project_uuid, a.user_uuid, \
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

    def voucher_active(self, voucher_uuid, user_uuid,
                       team_uuid, project_uuid):

        sql_01 = "insert into resources_acl(resource_uuid, resource_type, \
                  admin_uuid, team_uuid, project_uuid, user_uuid, \
                  create_time, update_time) \
                  values('%s', 'voucher', '0', '%s', '%s', '%s', now(), now())" \
                  % (voucher_uuid, team_uuid, project_uuid, user_uuid)

        sql_02 = "update vouchers set active_time=now(), update_time=now() \
                  where vouchers_uuid='%s'" \
                  % (voucher_uuid)

        return super(BillingDB, self).exec_update_sql(sql_01, sql_02)

    def voucher_check(self, team_uuid, amount):

        amount = float(amount)
        sql = "select a.vouchers_uuid from vouchers a join resources_acl b \
               where a.vouchers_uuid=b.resource_uuid  \
               and a.invalid_time >= now() and a.balance >= %f \
               and b.team_uuid='%s' \
               order by a.invalid_time asc limit 1" \
               % (amount, team_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def voucher_update(self, voucher_uuid, amount):

        amount = float(amount)
        sql = "update vouchers set balance=balance - %f, update_time=now() \
               where vouchers_uuid='%s'" \
               % (amount, voucher_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def voucher_list_admin(self, user_uuid, start_time, end_time):

        sql = "select vouchers_uuid, denomination, \
               invalid_time, create_time, update_time \
               from vouchers where createuser_uuid='%s' \
               and active_time=0 and create_time between '%s' and '%s'" \
               % (user_uuid, start_time, end_time)

        return super(BillingDB, self).exec_select_sql(sql)

    def voucher_list(self, team_uuid, start_time, end_time):

        sql = "select a.resource_uuid, a.user_uuid, \
               b.denomination, b.balance, b.active_time, b.invalid_time \
               from resources_acl a join vouchers b \
               where a.resource_uuid=b.vouchers_uuid and a.team_uuid='%s' \
               and b.create_time between '%s' and '%s'" \
               % (team_uuid, start_time, end_time)

        return super(BillingDB, self).exec_select_sql(sql)

    def level_init(self, team_uuid):

        sql = "insert into levels(team_uuid, level, \
               experience, up_required, create_time, update_time) \
               values('%s', 1, 0, 100, now(), now())" \
               % (team_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def level_info(self, team_uuid):

        sql = "select level, experience, up_required, \
               create_time, update_time \
               from levels where team_uuid='%s'" \
               % (team_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def level_update(self, team_uuid, level,
                     experience, up_required):

        sql = "update levels set level=%d, experience=%d, \
               up_required=%d, update_time=now() \
               where team_uuid='%s'" \
               % (level, experience, up_required, team_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def balance_init(self, team_uuid, balance):

        sql = "insert into balances(team_uuid, total, balance, \
               create_time, update_time) \
               values('%s', 0, %d, now(), now())" \
               % (team_uuid, int(balance))

        return super(BillingDB, self).exec_update_sql(sql)

    def balance_update(self, team_uuid, amount):

        sql_01 = "update balances set total=total + %d, \
                  balance=balance + %f, update_time=now() \
                  where team_uuid='%s'" \
                  % (int(amount), float(amount), team_uuid)

        sql_02 = "update balances set balance=balance + %f, update_time=now() \
                  where team_uuid='%s'" \
                  % (float(amount), team_uuid)

        if float(amount) >= 0:
            return super(BillingDB, self).exec_update_sql(sql_01)
        else:
            return super(BillingDB, self).exec_update_sql(sql_02)

    def balance_info(self, team_uuid):

        sql = "select balance, update_time \
               from balances where team_uuid='%s'" \
               % (team_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def recharge_create(self, recharge_uuid, recharge_amount,
                        recharge_type, team_uuid, recharge_user):

        sql = "insert into recharge_records(recharge_uuid, recharge_amount, \
               recharge_type, team_uuid, user_name, create_time) \
               values('%s', %d, '%s', '%s', '%s', now())" \
               % (recharge_uuid, int(recharge_amount), recharge_type,
                  team_uuid, recharge_user)

        return super(BillingDB, self).exec_update_sql(sql)

    def recharge_list(self, team_uuid, start_time, end_time):

        sql = "select recharge_uuid, recharge_amount, \
               recharge_type, user_name, create_time \
               from recharge_records where team_uuid='%s' \
               and create_time between '%s' and '%s'" \
               % (team_uuid, start_time, end_time)

        return super(BillingDB, self).exec_select_sql(sql)

    def limit_info(self, team_uuid, resource_type):

        sql = "select a.%s from limits a join levels b \
               where a.team_level=b.level and b.team_uuid='%s'" \
               % (resource_type, team_uuid)

        return super(BillingDB, self).exec_select_sql(sql)

    def limit_list(self):

        sql = "select team_level, teams, teamusers, \
               projects, projectusers, roles, images, \
               services, volumes, create_time, update_time \
               from limits"

        return super(BillingDB, self).exec_select_sql(sql)

    def limit_update(self, team_level, resource_type, limit):

        sql = "update limits set %s=%d, update_time=now() \
               where team_level='%s'" \
               % (resource_type, int(limit), team_level)

        return super(BillingDB, self).exec_update_sql(sql)

    def bill_insert(self, user_uuid, team_uuid, project_uuid,
                    resource_uuid, resource_cost, voucher_cost):

        sql = "insert into bills(resource_uuid, resource_cost, voucher_cost, \
               team_uuid, project_uuid, user_uuid, insert_time) \
               values('%s', '%f', '%f', '%s', '%s', '%s', now())" \
               % (resource_uuid, float(resource_cost), float(voucher_cost),
                  team_uuid, project_uuid, user_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def bill_list(self, team_uuid, start_time, end_time):

        sql = "select a.resource_uuid, a.resource_name, \
               b.resource_type, b.team_uuid, b.project_uuid, b.user_uuid, \
               round(sum(c.resource_cost), 2), round(sum(c.voucher_cost), 2) \
               from resources a join resources_acl b join bills c \
               where a.resource_uuid=b.resource_uuid \
               and b.resource_uuid = c.resource_uuid \
               and c.team_uuid='%s' \
               and c.insert_time between '%s' and '%s' \
               group by a.resource_uuid" \
               % (team_uuid, start_time, end_time)

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

    def order_update_cost(self, order_uuid, cost):

        sql = "update orders set cost='%s', update_time=now() \
               where orders_uuid='%s'" \
               % (cost, order_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def order_update_status(self, order_uuid, status):

        sql = "update orders set status='%s', update_time=now() \
               where orders_uuid='%s'" \
               % (status, order_uuid)

        return super(BillingDB, self).exec_update_sql(sql)

    def order_list(self, team_uuid, start_time, end_time):

        sql = "select a.team_uuid, a.project_uuid, a.user_uuid, \
               b.orders_uuid, b.resource_uuid, b.cost, b.status, \
               b.create_time, b.update_time \
               from resources_acl a join orders b \
               where a.resource_uuid=b.orders_uuid \
               and a.team_uuid='%s' and b.create_time between '%s' and '%s'" \
               % (team_uuid, start_time, end_time)

        return super(BillingDB, self).exec_select_sql(sql)
