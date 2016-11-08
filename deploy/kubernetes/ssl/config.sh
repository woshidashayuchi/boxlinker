#!/bin/bash

# 根证书和私钥
openssl genrsa -out dd_ca.key 2048
openssl req -x509 -new -nodes -key dd_ca.key -subj "/CN=boxlinker.com" -days 5000 -out dd_ca.crt

# api server 证书和私钥
openssl genrsa -out dd_server.key 2048
HN=${MASTER_IP}
openssl req -new -key dd_server.key -subj "/CN=$HN" -out dd_server.csr
openssl x509 -req -in dd_server.csr -CA dd_ca.crt -CAkey dd_ca.key -CAcreateserial -out dd_server.crt -days 5000

# controller manager scheduler 证书和私钥
openssl genrsa -out dd_cs_client.key 2048
openssl req -new -key dd_cs_client.key -subj "/CN=$HN" -out dd_cs_client.csr
openssl x509 -req -in dd_cs_client.csr -CA dd_ca.crt -CAkey dd_ca.key -CAcreateserial -out dd_cs_client.crt -days 5000

# kubelet 证书和私钥
openssl genrsa -out dd_kubelet_client.key 2048
openssl req -new -key dd_kubelet_client.key -subj "/CN=${SLAVE_IP}" -out dd_kubelet_client.csr
openssl x509 -req -in dd_kubelet_client.csr -CA dd_ca.crt -CAkey dd_ca.key -CAcreateserial -out dd_kubelet_client.crt -days 5000