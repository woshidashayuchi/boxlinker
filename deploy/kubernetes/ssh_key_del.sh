#!/bin/bash

host_ip=$1

ssh_key_del()
{
    local host_ip=$1

    control_host_name=$(hostname)
    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'v_hostname='"$control_host_name"'; sed -i "/$v_hostname/d" /root/.ssh/authorized_keys'
}

ssh_key_del $host_ip

