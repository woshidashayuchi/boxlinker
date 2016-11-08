#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

readonly ROOT=$(dirname "${BASH_SOURCE}")

#kubernetes config
if [ -z $3 ]; then
	echo "Parameter missing"
	exit 1
fi

COMMAND=$1
shift
MASTER=$1
MASTER_IP=${MASTER#*@}
ETCD_SERVERS=${ETCD_SERVERS:-"http://$MASTER_IP:2379"}
SERVICE_CLUSTER_IP_RANGE=${SERVICE_CLUSTER_IP_RANGE:-"192.168.1.0/24"}
FLANNEL_NET=${FLANNEL_NET:-"172.16.0.0/16"}
ADMISSION_CONTROL=NamespaceLifecycle,NamespaceExists,LimitRanger,ServiceAccount,ResourceQuota,SecurityContextDeny
DOCKER_OPTS=${DOCKER_OPTS:-""}

host_ip=$MASTER_IP
root_passwd=$2


SSH_OPTS="-oStrictHostKeyChecking=no -oUserKnownHostsFile=/dev/null -oLogLevel=ERROR"
KUBE_TEMP="~/kube_temp"

#. ./ssh_key_conf.sh
#. ./ssh_key_del.sh


function ssh_conf() {
    cwd=$0
    cwd_path=${cwd%/*}

    "$cwd_path"/ssh_key_conf.sh "$host_ip" "$root_passwd"
}

function ssh_del() {
    cwd=$0
    cwd_path=${cwd%/*}

    "$cwd_path"/ssh_key_del.sh "$host_ip"
}

function sys_init() {

    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'systemctl stop firewalld; systemctl disable firewalld; exit 0'

}

# Must ensure that the following ENV vars are set
function detect-master() {
  KUBE_MASTER=$MASTER
  KUBE_MASTER_IP=${MASTER#*@}
  echo "KUBE_MASTER_IP: ${KUBE_MASTER_IP}" 1>&2
  echo "KUBE_MASTER: ${MASTER}" 1>&2
}


function provision-master() {
	echo "[INFO] Provision master on ${MASTER}"
	local master_ip=${MASTER#*@}
	ensure-setup-dir ${MASTER}

	kube-scp ${MASTER} "${ROOT}/binaries/etcd ${ROOT}/binaries/master ${ROOT}/master" "${KUBE_TEMP}"

	kube-ssh "${MASTER}" "\
		cp -r ${KUBE_TEMP}/etcd/bin ${KUBE_TEMP}/master/bin /opt/kubernetes; \
		chmod -R +x /opt/kubernetes/bin; \
		bash ${KUBE_TEMP}/master/scripts/etcd.sh; \
		bash ${KUBE_TEMP}/master/scripts/apiserver.sh ${master_ip} ${ETCD_SERVERS} ${SERVICE_CLUSTER_IP_RANGE} ${ADMISSION_CONTROL}; \
		bash ${KUBE_TEMP}/master/scripts/controller-manager.sh ${master_ip}; \
		bash ${KUBE_TEMP}/master/scripts/scheduler.sh ${master_ip}"

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
        ssh_conf
        sys_init

        provision-master
        detect-master

        ssh_del
}


# Clean up on master
function tear-down-master() {

  ssh_conf

  echo "[INFO] tear-down-master on ${MASTER}"
  for service_name in kube-apiserver kube-controller-manager kube-scheduler ; do
      service_file="/usr/lib/systemd/system/${service_name}.service"
      kube-ssh "$MASTER" " \
        if [[ -f $service_file ]]; then \
          systemctl stop $service_name; \
          systemctl disable $service_name; \
          rm -f $service_file; \
        fi"
  done
  kube-ssh "${MASTER}" "rm -rf /opt/kubernetes"
  kube-ssh "${MASTER}" "rm -rf ${KUBE_TEMP}"
  kube-ssh "${MASTER}" "rm -rf /etc/etcd /var/lib/etcd"

  ssh_del
}


case "$COMMAND" in
	"up" ) kube-up ;;
	"down" ) tear-down-master ;;
esac

