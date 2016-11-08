日志查询API Dockerfile

日志查询API镜像文件build步骤如下；

1.创建基础镜像，该镜像包含日志查询API相关包和环境

# docker build -t index.boxlinker.com/boxlinker/centos-logs:base-1.0.1 ./logs-base

2.创建日志查询API镜像

# docker build -t index.boxlinker.com/boxlinker/centos-logs:api-1.0.1 ./logs-api

