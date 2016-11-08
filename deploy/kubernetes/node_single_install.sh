#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

readonly ROOT=$(dirname "${BASH_SOURCE}")

#kubernetes config
MASTER_IP=${MASTER_IP:-"10.46.182.28"}

if [ -z $3 ]; then
	echo "Parameter missing"
	exit 1
fi

COMMAND=$1
shift

NODE=$1
NODE_IP=${NODE#*@}

ETCD_SERVERS=${ETCD_SERVERS:-"http://$MASTER_IP:2379"}
SERVICE_CLUSTER_IP_RANGE=${SERVICE_CLUSTER_IP_RANGE:-"192.168.1.0/24"}
FLANNEL_NET=${FLANNEL_NET:-"172.16.0.0/16"}
ADMISSION_CONTROL=NamespaceLifecycle,NamespaceExists,LimitRanger,ResourceQuota,SecurityContextDeny
DOCKER_OPTS=${DOCKER_OPTS:-"--insecure-registry=registry.36ap.com"}

host_ip=$NODE_IP
root_passwd=$2

SSH_OPTS="-oStrictHostKeyChecking=no -oUserKnownHostsFile=/dev/null -oLogLevel=ERROR"
KUBE_TEMP="~/kube_temp"


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
function detect-node() {
  KUBE_NODE=$NODE
  KUBE_NODE_IP=${NODE#*@}
  echo "KUBE_NODE_IP: ${KUBE_NODE_IP}" 1>&2
  echo "KUBE_NODE: ${NODE}" 1>&2
}

function provision-node() {
	echo "[INFO] Provision node on $1"
	local master_ip=$MASTER_IP
	local node=$1
	local node_ip=${node#*@}
	ensure-setup-dir ${node}

	kube-scp ${node} "${ROOT}/binaries/etcd ${ROOT}/binaries/node ${ROOT}/node" "${KUBE_TEMP}"

	kube-ssh "${node}" "\
		cp -r ${KUBE_TEMP}/node/bin /opt/kubernetes;  \
		cp ${KUBE_TEMP}/etcd/bin/etcdctl /opt/kubernetes/bin; \
		chmod -R +x /opt/kubernetes/bin; \
		bash ${KUBE_TEMP}/node/scripts/flannel.sh ${ETCD_SERVERS} ${FLANNEL_NET}; \
	    bash ${KUBE_TEMP}/node/scripts/docker.sh \"${DOCKER_OPTS}\"; \
	    bash ${KUBE_TEMP}/node/scripts/kubelet.sh ${master_ip} ${node_ip}; \
	    bash ${KUBE_TEMP}/node/scripts/proxy.sh ${master_ip} ${node_ip}"

        # kube-ssh "${node}" "yum install -y glusterfs-client"

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
	ssh ${SSH_OPTS} -T "${host}" "$@" #>/dev/null 2>&1
}


function kube-up() {
        ssh_conf
        sys_init

        provision-node $NODE
        detect-node

        ssh_del
}


# Clean up on node
function tear-down-node() {
        ssh_conf

        echo "[INFO] tear-down-node on $1"
        for service_name in kube-proxy kubelet docker flannel ; do
          service_file="/usr/lib/systemd/system/${service_name}.service"
          kube-ssh "$1" " \
            if [[ -f $service_file ]]; then \
              systemctl stop $service_name; \
              systemctl disable $service_name; \
              rm -f $service_file; \
            fi"
        done
        kube-ssh "$1" "rm -rf /run/flannel"
        kube-ssh "$1" "rm -rf /opt/kubernetes"
        kube-ssh "$1" "rm -rf ${KUBE_TEMP}"

        ssh_del
}


case "$COMMAND" in
	"up" ) kube-up ;;
	"down" ) tear-down-node $NODE ;;
esac

