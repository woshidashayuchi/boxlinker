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


API_SERVERS=${1:-"8.8.8.18"}
NODE_ADDRESS=${2:-"8.8.8.20"}
CLUSTER_DNS=${3:-"10.254.10.10"}
PAUSE_IMAGE=${4:-"registry.36ap.com/default/pause:2.0"}

cat <<EOF >/opt/kubernetes/cfg/kubelet
# --logtostderr=true: log to standard error instead of files
KUBE_LOGTOSTDERR="--logtostderr=true"

#  --v=0: log level for V logs
KUBE_LOG_LEVEL="--v=0"

# --address=0.0.0.0: The IP address for the Kubelet to serve on (set to 0.0.0.0 for all interfaces)
NODE_ADDRESS="--address=${NODE_ADDRESS}"

# --port=10250: The port for the Kubelet to serve on. Note that "kubectl logs" will not work if you set this flag.
NODE_PORT="--port=10250"

# --hostname-override="": If non-empty, will use this string as identification instead of the actual hostname.
NODE_HOSTNAME="--hostname-override=${NODE_ADDRESS}"

# --api-servers=[]: List of Kubernetes API servers for publishing events, 
# and reading pods and services. (ip:port), comma separated.
KUBELET_API_SERVER="--api-servers=$API_SERVERS"

# --allow-privileged=false: If true, allow containers to request privileged mode. [default=false]
KUBE_ALLOW_PRIV="--allow-privileged=true"

KUBE_HOST_NETWORK_SOURCES="--host-network-sources=*"

KUBE_CLUSTER_DNS="--cluster-dns=${CLUSTER_DNS}"
KUBE_CLUSTER_DOMAIN="--cluster-domain=cluster.local"

KUBE_CONFIG="--kubeconfig=/opt/kubernetes/cfg/kubeconfig"

# Add your own!
KUBELET_ARGS="--pod-infra-container-image=${PAUSE_IMAGE}"
EOF

KUBE_PROXY_OPTS="   \${KUBE_LOGTOSTDERR}     \\
                    \${KUBE_LOG_LEVEL}       \\
                    \${NODE_ADDRESS}         \\
                    \${NODE_PORT}            \\
                    \${NODE_HOSTNAME}        \\
                    \${KUBELET_API_SERVER}   \\
                    \${KUBE_ALLOW_PRIV}      \\
                    \${KUBE_CLUSTER_DNS}     \\
                    \${KUBE_CLUSTER_DOMAIN}     \\
                    \${KUBE_HOST_NETWORK_SOURCES} \\
                    \${KUBE_CONFIG}            \\
                    \${KUBELET_ARGS}"

#\${KUBE_TLS_CERT_FILE}   \\
#\${KUBE_TLS_PRIVATE_KEY_FILE} \\

cat <<EOF >/usr/lib/systemd/system/kubelet.service
[Unit]
Description=Kubernetes Kubelet
After=docker.service
Requires=docker.service

[Service]
EnvironmentFile=-/opt/kubernetes/cfg/kubelet
ExecStart=/opt/kubernetes/bin/kubelet ${KUBE_PROXY_OPTS}
Restart=on-failure
KillMode=process

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable kubelet
systemctl start kubelet
