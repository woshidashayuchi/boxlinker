分布式存储管理API Dockerfile

分布式存储管理API镜像文件build步骤如下；

1.创建基础镜像，该镜像包含存储管理API相关包和环境

# docker build -t index.boxlinker.com/boxlinker/centos-storage:base-1.0.1 ./storage-base

2.创建分布式存储管理API镜像

# docker build -t index.boxlinker.com/boxlinker/centos-storage:api-1.0.1 ./storage-api

