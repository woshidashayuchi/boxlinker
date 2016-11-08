#!/bin/bash

# Copyright 2014 The Kubernetes Authors All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

## Create etcd.conf, etcd.service, and start etcd service.

etcd_name=$1
local_etcd=$2
etcd_cluster=$3

etcd_data_dir=/var/lib/etcd/
mkdir -p ${etcd_data_dir}

cat <<EOF >/opt/kubernetes/cfg/etcd.conf
# [member]

ETCD_NAME=$etcd_name
ETCD_DATA_DIR="/var/lib/etcd/data"
ETCD_LISTEN_PEER_URLS="http://$local_etcd:2380,http://$local_etcd:7001"
ETCD_LISTEN_CLIENT_URLS="http://0.0.0.0:2379"

#[cluster]

ETCD_INITIAL_ADVERTISE_PEER_URLS="http://$local_etcd:2380,http://$local_etcd:7001"
ETCD_INITIAL_CLUSTER="$etcd_cluster"
ETCD_INITIAL_CLUSTER_STATE="new"
ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster"
ETCD_ADVERTISE_CLIENT_URLS="http://$local_etcd:2379"

EOF

cat <<EOF >//usr/lib/systemd/system/etcd.service
[Unit]
Description=Etcd Server
After=network.target

[Service]
Type=simple
WorkingDirectory=${etcd_data_dir}
EnvironmentFile=-/opt/kubernetes/cfg/etcd.conf
# set GOMAXPROCS to number of processors
ExecStart=/bin/bash -c "GOMAXPROCS=\$(nproc) /opt/kubernetes/bin/etcd"

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable etcd
systemctl start etcd
