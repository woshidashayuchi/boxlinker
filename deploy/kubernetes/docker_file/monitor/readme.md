状态更新服务 Dockerfile

状态更新服务镜像文件build步骤如下；

1.创建基础镜像，该镜像包含状态更新服务相关包和环境

# docker build -t index.boxlinker.com/boxlinker/centos-monitor:base-1.0.1 ./monitor-base

2.创建状态更新服务镜像

# docker build -t index.boxlinker.com/boxlinker/centos-monitor:service-1.0.1 ./monitor-service

