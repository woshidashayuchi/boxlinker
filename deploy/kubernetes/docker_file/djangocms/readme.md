内容管理系统 Dockerfile

内容管理系统镜像文件build步骤如下；

1.创建内容管理系统镜像，该镜像包含内容管理系统相关包和环境

# docker build -t index.boxlinker.com/boxlinker/centos-djangocms:base-1.0.1 ./djangocms-base

2.运行容器

# docker run -d -p 80:8080 -v /home/software/djangocms:/djangocms --privileged=true index.boxlinker.com/boxlinker/centos-djangocms:base-1.0.1
