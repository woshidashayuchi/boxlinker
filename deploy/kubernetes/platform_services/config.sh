#!/bin/bash

# 平台相关的一些基础配置信息

. ../kubernetes.conf

# $1 -- node_ip
# $2 -- label
# $3 -- value
function label_node()
{
    echo "label node $1 $2=$3 $4"
    kubectl label node $1 $2=$3 $4
}

# 为每个 node 设置 role=node
for node in $node_list
do
    node_ip=$(echo "$node" | awk -F, '{print $1}')
    label_node $node_ip 'role' 'node'
done
# 设置负载均衡 label
label_node $LOADBALANCER_IP 'role' 'loadbalancer' '--overwrite'

echo 'create namespace -- boxlinker'
kubectl create namespace boxlinker

echo 'create serviceaccount -- boxlinker'
kubectl create serviceaccount boxlinker
sleep 1s

echo 'create registry-key -- boxlinker'
kubectl create -f ./imagesecrets/boxlinker.yml
sleep 1s

echo 'create rc  -- servicelb'
kubectl create -f ./servicelb/config.yml
sleep 1s

echo 'create svc -- dns'
kubectl create -f ./dns/config.yml
sleep 1s

echo 'create svc -- rabbitmq'
kubectl create -f ./rabbitmq/config.yml
sleep 1s

echo 'create svc -- krud'
kubectl create -f ./krud/config.yml
sleep 1s

echo 'create svc -- fe'
kubectl create -f ./fe/config.yml
sleep 1s