rabbitmq Dockerfile

rabbitmq 集群镜像文件build 步骤如下；

1.创建rabbitmq基础镜像，该镜像包含rabbitmq相关包

# docker build -t index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-base-1.0.1 ./rabbitmq-base

2.创建rabbitmq集群第一个节点镜像，该镜像将作为rabbitmq集群第一个节点启动

# docker build -t index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-first-1.0.1 ./cluster-firstnode

3.创建rabbitmq集群节点镜像，该镜像将作为节点加入rabbitmq集群

(1)修改cluster-node/Dockerfile文件如下内容，配置需要加入到的节点名
rabbitmqctl join_cluster --ram rabbit@rabbitmq01

# docker build -t index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-node-1.0.1 ./cluster-node

