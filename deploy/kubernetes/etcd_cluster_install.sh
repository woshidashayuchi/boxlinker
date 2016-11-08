#!/bin/bash

#参数说明
#$1为选项参数，控制安装和卸载

#如下参数请通过kubernetes_list.conf文件进行配置
#必须先配置kubernetes_list.conf文件，然后才能执行本脚本。

#etcd01管理IP地址
#etcd01 root密码
#etcd02管理IP地址
#etcd02 root密码
#etcd03管理IP地址
#etcd03 root密码

#set -o nounset

set -o errexit
set -o pipefail

readonly ROOT=$(dirname "${BASH_SOURCE}")

#kubernetes config
if [ -z $1 ]; then
    echo "Parameter missing"
    exit 1
fi

COMMAND=$1

#etcd_server01=$2
#etcd_passwd01=$3

#etcd_server02=$4
#etcd_passwd02=$5

#etcd_server03=$6
#etcd_passwd03=$7

. ./kubernetes.conf

function ssh_conf() {
    local host_ip=$1
    local root_passwd=$2

    cwd=$0
    cwd_path=${cwd%/*}

    "$cwd_path"/ssh_key_conf.sh "$host_ip" "$root_passwd"
}

function ssh_del() {
    local host_ip=$1

    cwd=$0
    cwd_path=${cwd%/*}

    "$cwd_path"/ssh_key_del.sh "$host_ip"
}

function sys_init() {
    local host_ip=$1

    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'systemctl stop firewalld; systemctl disable firewalld; exit 0'

}

# Must ensure that the following ENV vars are set
#function detect-master() {
#  KUBE_MASTER=$MASTER
#  KUBE_MASTER_IP=${MASTER#*@}
#  echo "KUBE_MASTER_IP: ${KUBE_MASTER_IP}" 1>&2
#  echo "KUBE_MASTER: ${MASTER}" 1>&2
#}


function provision-master() {
        local master_ip=$1

        if [ "$master_ip" == "$etcd_server01" ]; then
            etcd_name='etcd01'
        elif [ "$master_ip" == "$etcd_server02" ]; then
            etcd_name='etcd02'
        elif [ "$master_ip" == "$etcd_server03" ]; then
            etcd_name='etcd03'
        fi

	echo "[INFO] Provision etcd on ${master_ip}"

	ensure-setup-dir ${master_ip}

	kube-scp ${master_ip} "${ROOT}/binaries/etcd ${ROOT}/master" "${KUBE_TEMP}"

	kube-ssh "${master_ip}" "\
		cp -r ${KUBE_TEMP}/etcd/bin /opt/kubernetes; \
		chmod -R +x /opt/kubernetes/bin; \
		bash ${KUBE_TEMP}/master/scripts/etcd.sh "$etcd_name" "$master_ip" "$ETCD_INITIAL_CLUSTER" "

}

function ensure-setup-dir() {
	kube-ssh "${1}" "mkdir -p ${KUBE_TEMP}; \
					 mkdir -p /opt/kubernetes/bin; \
					 mkdir -p /opt/kubernetes/cfg"
}

function kube-scp() {
	local host="$1"
	local src=($2)
	local dist="$3"
	scp -r ${SSH_OPTS} ${src[*]} "${host}:${dist}"
}

function kube-ssh() {
	local host="$1"
	shift
	ssh ${SSH_OPTS} -T "${host}" "$@" >/dev/null 2>&1
}


function kube-up() {
        local host_ip=$1
        local root_pwd=$2

        ssh_conf "$host_ip" "$root_pwd"
        sys_init "$host_ip"

        provision-master "$host_ip"
#        detect-master

        ssh_del "$host_ip"
}


# Clean up on master
function tear-down-master() {
  local host_ip=$1
  local root_pwd=$2

  ssh_conf "$host_ip" "$root_pwd"

  echo "[INFO] tear-down-etcd on ${host_ip}"
  for service_name in etcd; do
      service_file="/usr/lib/systemd/system/${service_name}.service"
      kube-ssh "$host_ip" " \
        if [[ -f $service_file ]]; then \
          systemctl stop $service_name; \
          systemctl disable $service_name; \
          rm -f $service_file; \
        fi"
  done
  kube-ssh "${host_ip}" "rm -rf /opt/kubernetes"
  kube-ssh "${host_ip}" "rm -rf ${KUBE_TEMP}"
  kube-ssh "${host_ip}" "rm -rf /etc/etcd /var/lib/etcd"

  ssh_del "$host_ip"
}


function  k8s_cluster_install()
{
    local master01=$1
    local rootpwd01=$2

    local master02=$3
    local rootpwd02=$4

    local master03=$5
    local rootpwd03=$6

    kube-up $master01 $rootpwd01
    sleep 1s
    kube-up $master02 $rootpwd02
    sleep 1s
    kube-up $master03 $rootpwd03
}


function k8s_cluster_uninstall()
{
    local master01=$1
    local rootpwd01=$2

    local master02=$3
    local rootpwd02=$4

    local master03=$5
    local rootpwd03=$6

    tear-down-master $master01 $rootpwd01
    sleep 1s
    tear-down-master $master02 $rootpwd02
    sleep 1s
    tear-down-master $master03 $rootpwd03
}


case "$COMMAND" in
	"up" ) k8s_cluster_install $etcd_server01 $etcd_passwd01 $etcd_server02 $etcd_passwd02 $etcd_server03 $etcd_passwd03 ;;
	"down" ) k8s_cluster_uninstall $etcd_server01 $etcd_passwd01 $etcd_server02 $etcd_passwd02 $etcd_server03 $etcd_passwd03 ;;
esac

