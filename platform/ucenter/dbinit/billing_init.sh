#!/bin/bash

db_server='127.0.0.1'
db_port=3306
database='billing'

v_connect_mysql="/usr/bin/mysql -h $db_server -P $db_port -ucloud -pcloud -D $database -e"

while [ -z $root_pwd ]
do
  read -p '请输入mysql数据库root密码:[password]'
  root_pwd=$REPLY
  if [ -z $root_pwd ]; then
    continue
  fi
#判断输入的root密码是否可以正常登陆
  mysql -h $db_server -P $db_port -uroot -p"$root_pwd" -e "quit"
  if [ $? -ne 0 ]; then
    echo 'mysql数据库无法登陆，请检查数据库状态和密码输入是否正确。'
    unset -v root_pwd
  fi
done

m_user_check=$(mysql -h $db_server -P $db_port -uroot -p"$root_pwd" -e "select count(*) from mysql.user where user='cloud'" | tail -n+2)

if [ $m_user_check -eq 0 ]; then

  mysql -h $db_server -P $db_port -uroot -p"$root_pwd" -e "
  CREATE DATABASE IF NOT EXISTS $database;
  create user 'cloud'@'%' identified by 'cloud';
  grant all privileges ON $database.* to  'cloud'@'%'; "

else

  mysql -h $db_server -P $db_port -uroot -p"$root_pwd" -e "
  CREATE DATABASE IF NOT EXISTS $database;
  grant all privileges ON $database.* to  'cloud'@'%'; "

fi


$v_connect_mysql "CREATE TABLE IF NOT EXISTS resources_acl (
        resource_uuid       VARCHAR(64) NULL DEFAULT NULL,
        resource_type       VARCHAR(64) NULL DEFAULT NULL,
        admin_uuid          VARCHAR(64) NULL DEFAULT NULL,
        team_uuid           VARCHAR(64) NULL DEFAULT NULL,
        project_uuid        VARCHAR(64) NULL DEFAULT NULL,
        user_uuid           VARCHAR(64) NULL DEFAULT NULL,
        create_time         DATETIME NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (resource_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"
$v_connect_mysql "create index type_team_idx on resources_acl(resource_type, team_uuid)"


$v_connect_mysql "CREATE TABLE IF NOT EXISTS resources (
        resource_uuid       VARCHAR(64) NULL DEFAULT NULL,
        resource_name       VARCHAR(64) NULL DEFAULT NULL,
        resource_conf       VARCHAR(64) NULL DEFAULT NULL,
        resource_status     VARCHAR(64) NULL DEFAULT NULL,
        create_time         DATETIME NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (resource_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"


$v_connect_mysql "CREATE TABLE IF NOT EXISTS orders (
        orders_uuid         VARCHAR(64) NULL DEFAULT NULL,
        resource_uuid       VARCHAR(64) NULL DEFAULT NULL,
        cost                DOUBLE(10,2) NULL DEFAULT NULL,
        status              VARCHAR(32) NULL DEFAULT NULL,
        create_time         DATETIME NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (orders_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"


$v_connect_mysql "CREATE TABLE IF NOT EXISTS resources_paid (
        resource_uuid       VARCHAR(64) NULL DEFAULT NULL,
        paid_mode           VARCHAR(32) NULL DEFAULT NULL,
        paid_time           DATETIME NULL DEFAULT NULL,
        end_time            DATETIME NULL DEFAULT NULL,
        remain_time         INT(12) NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (resource_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"


$v_connect_mysql "CREATE TABLE IF NOT EXISTS balances (
        team_uuid           VARCHAR(64) NULL DEFAULT NULL,
        balance             DOUBLE(10,2) NULL DEFAULT NULL,
        create_time         DATETIME NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (team_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"


$v_connect_mysql "CREATE TABLE IF NOT EXISTS vouchers (
        vouchers_uuid       VARCHAR(64) NULL DEFAULT NULL,
        createuser_uuid     VARCHAR(64) NULL DEFAULT NULL,
        denomination        DOUBLE(5,2) NULL DEFAULT NULL,
        balance             DOUBLE(5,2) NULL DEFAULT NULL,
        active_time         DATETIME NULL DEFAULT NULL,
        invalid_time        DATETIME NULL DEFAULT NULL,
        create_time         DATETIME NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (vouchers_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"


$v_connect_mysql "CREATE TABLE IF NOT EXISTS bills (
        id                  INT(11) NOT NULL AUTO_INCREMENT,
        resource_uuid       VARCHAR(64) NULL DEFAULT NULL,
        resource_cost       DOUBLE(10,6) NULL DEFAULT NULL,
        voucher_cost        DOUBLE(10,6) NULL DEFAULT NULL,
        team_uuid           VARCHAR(64) NULL DEFAULT NULL,
        project_uuid        VARCHAR(64) NULL DEFAULT NULL,
        user_uuid           VARCHAR(64) NULL DEFAULT NULL,
        insert_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (id)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"
$v_connect_mysql "create index resource_uuid_idx on bills(resource_uuid)"
$v_connect_mysql "create index team_idx on bills(team_uuid)"
$v_connect_mysql "create index insert_time_idx on bills(insert_time)"


acl_check=$($v_connect_mysql "select count(*) from resources_acl" | tail -n+2)
if [ $acl_check -eq 0 ]; then

    admin_api_list="bil_voc_voc_crt"
    for admin_api in $admin_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, team_uuid, project_uuid, user_uuid, create_time, update_time)
                          values('"$admin_api"', 'api', 'global', '0', '0', '0', now(), now())"
    done

    team_api_list=""
    for team_api in $team_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, team_uuid, project_uuid, user_uuid, create_time, update_time)
                          values('"$team_api"', 'api', 'global', 'global', '0', '0', now(), now())"
    done

    project_api_list=""
    for project_api in $project_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, team_uuid, project_uuid, user_uuid, create_time, update_time)
                          values('"$project_api"', 'api', 'global', 'global', 'global', '0', now(), now())"
    done

    user_api_list="bil_rss_rss_crt bil_blc_blc_add bil_blc_blc_inf bil_blc_blc_put
                   bil_odr_odr_crt bil_voc_voc_act bil_rss_rss_lst bil_voc_voc_lst
                   bil_bls_bls_lst bil_odr_odr_lst"
    for user_api in $user_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, team_uuid, project_uuid, user_uuid, create_time, update_time)
                          values('"$user_api"', 'api', 'global', 'global', 'global', 'global', now(), now())"
    done

fi

echo "$database数据库初始化完成"
