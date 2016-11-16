#!/bin/bash

db_server='database'
db_port=3306
database='storage'

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
  create database $database;
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
        orga_uuid           VARCHAR(64) NULL DEFAULT NULL,
        user_uuid           VARCHAR(64) NULL DEFAULT NULL,
        create_time         DATETIME NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (resource_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"
$v_connect_mysql "create index admin_uuid_idx on resources_acl(admin_uuid)"
$v_connect_mysql "create index type_orga_user_idx on resources_acl(resource_type, orga_uuid, user_uuid)"


$v_connect_mysql "CREATE TABLE IF NOT EXISTS volumes (
        volume_uuid         VARCHAR(64) NULL DEFAULT NULL,
        volume_name         VARCHAR(64) NULL DEFAULT NULL,
        volume_size         INT(8) NULL DEFAULT NULL,
        volume_status       VARCHAR(32) NULL DEFAULT NULL,
        disk_name           VARCHAR(128) NULL DEFAULT NULL,
        fs_type             VARCHAR(32) NULL DEFAULT NULL,
        mount_point         VARCHAR(32) NULL DEFAULT NULL,
        pool_name           VARCHAR(32) NULL DEFAULT NULL,
        create_time         DATETIME NULL DEFAULT NULL,
        update_time         DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (volume_uuid)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB"


acl_check=$($v_connect_mysql "select count(*) from resources_acl" | tail -n+2)
if [ $acl_check -eq 0 ]; then

    admin_api_list=""
    for admin_api in $admin_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, orga_uuid, user_uuid, create_time, update_time)
                          values('"$admin_api"', 'api', 'global', '0', '0', now(), now())"
    done

    organ_api_list=""
    for organ_api in $organ_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, orga_uuid, user_uuid, create_time, update_time)
                          values('"$organ_api"', 'api', '0', 'global', '0', now(), now())"
    done

    user_api_list="stg_ceh_dsk_add"
    for user_api in $user_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, orga_uuid, user_uuid, create_time, update_time)
                          values('"$user_api"', 'api', '0', 'global', 'global', now(), now())"
    done

    global_api_list="stg_ceh_dsk_get"
    for global_api in $global_api_list
    do
        $v_connect_mysql "insert into resources_acl(resource_uuid, resource_type, admin_uuid, orga_uuid, user_uuid, create_time, update_time)
                          values('"$global_api"', 'api', 'global', 'global', 'global', now(), now())"
    done

fi

echo "$database数据库初始化完成"
