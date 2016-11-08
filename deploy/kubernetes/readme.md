kubernetes安装说明（需采用集群方式安装kubernetes，暂不支持单节点安装。）

##1.配置kubernetes.conf, 填写kubernetes相关节点和集群信息。

##2.安装etcd服务

`./etcd_cluster_install.sh up`

##3.卸载etcd服务

`./etcd_cluster_install.sh down`

##4.安装证书服务

`cd ssl; make-ca-cert.sh`

##5.安装master节点服务

`./master_cluster_install.sh up`

##6.卸载master节点服务

`./master_cluster_install.sh down`

##7.安装node节点服务

`./node_cluster_install.sh up`

##8.卸载node节点服务

`./node_cluster_install.sh down`


---
### 系统搭建完成后,需要调用 `./start.sh` 来构建系统服务,详情见 `start.sh` 文件内注释
