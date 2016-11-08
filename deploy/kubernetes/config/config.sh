#!/bin/bash

# 集群的一些配置

. ../kubernetes.conf

# add loadbalancer label
kubectl label node $LOADBALANCER_IP role=loadbalancer