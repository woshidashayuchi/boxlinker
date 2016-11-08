#!/bin/bash

# todo 卸载系统的时候应该确保所有的东西全部卸载掉了, 比如 docker 的一些缓存文件

./node_cluster_install.sh down
./master_cluster_install.sh down
./etcd_cluster_install.sh down



