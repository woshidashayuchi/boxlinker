master节点rabbitmq集群搭建步骤

1.修改hosts文件,添加如下内容
# vi /etc/hosts

10.46.182.28          rabbitmq01
10.46.183.201         rabbitmq02
10.24.200.207         rabbitmq03

2.获取rabbitmq集群镜像
(1)master01节点
# docker pull index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-first-1.0.1

(2)其余master节点
# docker pull index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-node-1.0.0

3.启动容器

(1)master01节点
# docker run -itd -h rabbitmq01 -v /etc/hosts:/etc/hosts -p 10.46.182.28:5672:5672 -p 10.46.182.28:4369:4369 -p 10.46.182.28:25672:25672 index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-first-1.0.1

(2)master02节点
# docker run -itd -h rabbitmq02 -v /etc/hosts:/etc/hosts -p 10.46.183.201:5672:5672 -p 10.46.183.201:4369:4369 -p 10.46.183.201:25672:25672 index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-node-1.0.0

(3)master03节点
# docker run -itd -h rabbitmq03 -v /etc/hosts:/etc/hosts -p 10.24.200.207:5672:5672 -p 10.24.200.207:4369:4369 -p 10.24.200.207:25672:25672 index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-node-1.0.0

4.创建rabbitmq相关service和endpoint
