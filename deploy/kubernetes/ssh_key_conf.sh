#!/bin/bash

#参数说明
#$1为被控节点IP地址
#$2为被控节点root密码

#参数赋值

host_ip=$1
root_passwd=$2

ssh_key_conf()
{
    local host_ip=$1
    local password=$2

    if [ ! -f /root/.ssh/id_dsa.pub ]; then
        ssh-keygen -t dsa -P '' -f /root/.ssh/id_dsa &> /dev/null
    fi

    #将公钥证书内容写入到被管理节点上认证文件内

    cwd=$0
    cwd_path=${cwd%/*}

    "$cwd_path"/ssh_copy_id "$host_ip" "$password" > /dev/null
}

hosts_conf()
{
    local host_name=$1
    local host_ip=$2

    host_check=$(cat /etc/hosts | grep "$host_name" | wc -l)
    if [ $host_check -eq 0 ]; then
        echo "$host_ip        $host_name" >> /etc/hosts
    else
        old_hostip=$(cat /etc/hosts | grep "$host_name" | awk '{print $1}')
        sed -i "s/$old_hostip        $host_name/$host_ip        $host_name/g" /etc/hosts
    fi
}


#hosts文件配置

#hosts_conf $host_name $host_ip

#sleep 1s

rpm_check=$(rpm -qa | grep 'expect' | wc -l)
if [ $rpm_check -eq 0 ]; then
    yum install -y expect
fi

#ssh无密钥配置

ssh_key_conf $host_ip $root_passwd &> /dev/null

if [ $? -eq 2 ]; then
  exit 1
else
  exit 0
fi

