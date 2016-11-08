#!/bin/bash

cat <<EOF >/opt/kubernetes/cfg/kubeconfig
apiVersion: v1
kind: Config
users:
- name: kubelet
  user:
    client-certificate: /opt/kubernetes/ssl/kubecfg.crt
    client-key: /opt/kubernetes/ssl/kubecfg.key
clusters:
- name: local
  cluster:
    certificate-authority: /opt/kubernetes/ssl/ca.crt
contexts:
- context:
    cluster: local
    user: kubelet
  name: default-context
current-context: default-context
EOF