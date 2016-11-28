消息队列服务

1.创建消息队列服务镜像

# docker build -t index.boxlinker.com/boxlinker/centos-rabbitmq-base:1.0.1 ./docker_file/rabbitmq-base
# docker build -t index.boxlinker.com/boxlinker/centos-rabbitmq-first:1.0.1 ./docker_file/rabbitmq-first
# docker build -t index.boxlinker.com/boxlinker/centos-rabbitmq-node:1.0.1 ./docker_file/rabbitmq-node

2.启动消息队列服务

# kubectl create -f rabbitmq_svc.yaml
# kubectl create -f rabbitmq01_svc.yaml
# kubectl create -f rabbitmq02_svc.yaml
# kubectl create -f rabbitmq03_svc.yaml
# kubectl create -f rabbitmq01_rc.json
# kubectl create -f rabbitmq02_rc.json
# kubectl create -f rabbitmq03_rc.json
