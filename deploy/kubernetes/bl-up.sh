#!/bin/bash

./etcd_cluster_install.sh up
./master_cluster_install.sh up
./node_cluster_install.sh up


# todo 此脚本负责在 k8s 和 ceph 搭建好之后构建系统级别的 service 和 rc
# 按顺序如下:
# -- 所有的 slave 应该都有一个 role label, 除特殊角色外都为 role=node
# -- dns
# -- registry (跑在 slave 的 label 为 role=registry 上, host 模式, 暴露端口 80 1936)
# -- servicelb (跑在 slave 的 label 为 role=loadbalancer 上, host 模式, 暴露端口 80 443 以及 其他 tcp 服务随机端口)
# todo 所有服务都放在 platform_services 文件夹下


