#!/bin/bash

#参数说明
#$1为选项参数，控制安装和卸载

#如下参数请通过kubernetes_list.conf文件进行配置
#必须先配置kubernetes_list.conf文件，然后才能执行本脚本。

#master01管理IP地址
#master01 root密码
#master02管理IP地址
#master02 root密码
#master03管理IP地址
#master03 root密码

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

#master_server01=$2
#master_passwd01=$3

#master_server02=$4
#master_passwd02=$5

#master_server03=$6
#master_passwd03=$7

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

function ca_cert_create() {
    local master_server01=$1
    local master_server02=$2
    local master_server03=$3

    cd ssl/
    ./make-ca-cert.sh $master_server01 $master_server02 $master_server03
    cd ../
}

function ca_cert_sync() {
    local host_ip=$1

    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'mkdir -p /opt/kubernetes/ssl'
    scp -r /opt/kubernetes/ssl/* root@"$host_ip":/opt/kubernetes/ssl/
}

function docker_install() {
    local host_ip=$1

    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'yum install -y docker'
    scp config/docker.service root@"$host_ip":/usr/lib/systemd/system/
}

function provision-master() {
        local master_ip=$1

	echo "[INFO] Provision master on ${master_ip}"

	ensure-setup-dir ${master_ip}

	kube-scp ${master_ip} "${ROOT}/binaries/master ${ROOT}/master" "${KUBE_TEMP}"

	kube-ssh "${master_ip}" "\
		cp -r ${KUBE_TEMP}/master/bin /opt/kubernetes; \
		chmod -R +x /opt/kubernetes/bin; \
		bash ${KUBE_TEMP}/master/scripts/configure.sh ${REGISTRY_IP} ${REGISTRY_HOST} ${REGISTRY_TOKEN}; \
		bash ${KUBE_TEMP}/master/scripts/apiserver.sh ${master_ip} ${ETCD_SERVERS} ${SERVICE_CLUSTER_IP_RANGE} ${ADMISSION_CONTROL}; \
		bash ${KUBE_TEMP}/master/scripts/controller-manager.sh ${master_ip}; \
		bash ${KUBE_TEMP}/master/scripts/scheduler.sh ${master_ip}"
#		bash ${KUBE_TEMP}/master/scripts/docker.sh ${DOCKER_OPTS}; \
#		bash ${KUBE_TEMP}/master/scripts/run-rabbitmq.sh ${master_ip}"

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

        #ssh_conf "$host_ip" "$root_pwd"
        sys_init "$host_ip"

        ca_cert_sync "$host_ip"
        provision-master "$host_ip"

        #docker_install "$host_ip"
        #ssh_del "$host_ip"
}


# Clean up on master
function tear-down-master() {
  local host_ip=$1
  local root_pwd=$2

  #ssh_conf "$host_ip" "$root_pwd"

  echo "[INFO] tear-down-master on ${host_ip}"
  for service_name in kube-apiserver kube-controller-manager kube-scheduler ; do
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

  #ssh_del "$host_ip"
}


function  k8s_cluster_install()
{
    local master01=$1
    local rootpwd01=$2

    local master02=$3
    local rootpwd02=$4

    local master03=$5
    local rootpwd03=$6

    #ca_cert_create $master01 $master02 $master03

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
	"up" ) k8s_cluster_install $master_server01 $master_passwd01 $master_server02 $master_passwd02 $master_server03 $master_passwd03 ;;
	"down" ) k8s_cluster_uninstall $master_server01 $master_passwd01 $master_server02 $master_passwd02 $master_server03 $master_passwd03 ;;
esac

