#!/bin/bash

function kube_scp() {
	local host="$1"
	local src=($2)
	local dist="$3"
	scp -r ${SSH_OPTS} ${src[*]} "${host}:${dist}"
}

function kube_ssh() {
	local host="$1"
	shift
	ssh ${SSH_OPTS} -T "${host}" "$@" >/dev/null 2>&1
}
function ssh_conf() {
    local host_ip=$1
    local root_passwd=$2

    cwd=$0
    cwd_path=${cwd%/*}

    "$cwd_path"/ssh_key_conf.sh "$host_ip" "$root_passwd"
}
