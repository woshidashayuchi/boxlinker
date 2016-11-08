#!/bin/bash

#参数说明
#$1为选项参数，控制安装和卸载

#如下参数请通过kubernetes_list.conf文件进行配置
#必须先配置kubernetes_list.conf文件，然后才能执行本脚本。

#node ip地址
#node 密码

#set -o nounset

set -o errexit
set -o pipefail

readonly ROOT=$(dirname "${BASH_SOURCE}")


if [ -z $1 ]; then
    echo "Parameter missing"
    exit 1
fi

COMMAND=$1

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

function ca_cert_sync() {
    local host_ip=$1

    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'mkdir -p /opt/kubernetes/ssl'
    scp -r /opt/kubernetes/ssl/* root@"$host_ip":/opt/kubernetes/ssl/
}

function agent_install() {
    local host_ip=$1

    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'r_master01='"$master_server01"'; \
                                                     r_master02='"$master_server02"'; \
                                                     echo "$r_master01      mq_server01" >> /etc/hosts; \
                                                     echo "$r_master02      mq_server02" >> /etc/hosts'
    scp ../packages/pika-0.9.14-1.noarch.rpm root@"$host_ip":/tmp/
    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'rpm -ivh /tmp/pika-0.9.14-1.noarch.rpm; exit 0'

    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'mkdir -p /agent'
    scp -r ../storage/agent/* root@"$host_ip":/agent/
    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'python /agent/server/mq_call_server.py &> /dev/null &'
    ssh -o StrictHostKeyChecking=no root@"$host_ip" 'python /agent/server/mq_bcast_server.py &> /dev/null &'
}

function provision-node() {
	echo "[INFO] Provision node on $1"
	#local master_ip=$MASTER_IP
	#local node=$1

	local node_ip=$1

	ensure-setup-dir ${node_ip}

	kube-scp ${node_ip} "${ROOT}/binaries/etcd ${ROOT}/binaries/node ${ROOT}/node" "${KUBE_TEMP}"

	kube-ssh "${node_ip}" "\
		cp -r ${KUBE_TEMP}/node/bin /opt/kubernetes;  \
		cp ${KUBE_TEMP}/etcd/bin/etcdctl /opt/kubernetes/bin; \
		chmod -R +x /opt/kubernetes/bin; \
        bash ${KUBE_TEMP}/node/scripts/configure.sh ${REGISTRY_IP} ${REGISTRY_HOST} ${REGISTRY_TOKEN}; \
        bash ${KUBE_TEMP}/node/scripts/flannel.sh ${ETCD_SERVERS} ${FLANNEL_NET}; \
        bash ${KUBE_TEMP}/node/scripts/docker.sh \"${DOCKER_OPTS}\"; \
        bash ${KUBE_TEMP}/node/scripts/kubelet.sh ${API_SERVERS} ${node_ip} ${CLUSTER_DNS} ${PAUSE_IMAGE}; \
        bash ${KUBE_TEMP}/node/scripts/proxy.sh ${MASTER_CLUSTER} ${node_ip}; \
        bash ${KUBE_TEMP}/node/scripts/kubectl.sh"

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
        local host_ip=$1
        local root_pwd=$2

        #ssh_conf "$host_ip" "$root_pwd"
        sys_init "$host_ip"

        provision-node "$host_ip"
        ca_cert_sync "$host_ip"
        agent_install "$host_ip"

        #ssh_del "$host_ip"
}


# Clean up on node
function tear-down-node() {
        local host_ip=$1
        local root_pwd=$2


        #ssh_conf "$host_ip" "$root_pwd"

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
        kube-ssh "$1" "kill $(ps -ef | grep python | grep '_server.py' | awk '{print $2}') & > /dev/null; exit 0"
        kube-ssh "$1" "sed -i '/mq_server01/d' /etc/hosts; sed -i '/mq_server02/d' /etc/hosts"
        kube-ssh "$1" "rm -rf /run/flannel"
        kube-ssh "$1" "rm -rf /opt/kubernetes"
        kube-ssh "$1" "rm -rf ${KUBE_TEMP}"
        kube-ssh "$1" "rm -rf /agent"

        #ssh_del "$host_ip"
}


function k8s_node_install()
{
    for node in $node_list
    do
        node_ip=$(echo "$node" | awk -F, '{print $1}')
        node_pwd=$(echo "$node" | awk -F, '{print $2}')

        echo "Install kubernetes node on $node_ip"
        kube-up $node_ip $node_pwd
        sleep 1s
    done
}


function k8s_node_uninstall()
{
    for node in $node_list
    do
        node_ip=$(echo "$node" | awk -F, '{print $1}')
        node_pwd=$(echo "$node" | awk -F, '{print $2}')

        echo "uninstall kubernetes node on $node_ip"
        tear-down-node $node_ip $node_pwd
        sleep 1s
    done
}


case "$COMMAND" in
	"up" ) k8s_node_install;;
	"down" ) k8s_node_uninstall;;
esac

