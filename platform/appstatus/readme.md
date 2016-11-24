k8s应用服务状态更新服务

1.创建状态更新服务镜像

# docker build -t index.boxlinker.com/boxlinker/centos-appstatus:1.0.1 ./

2.启动状态更新服务

修改appstatus.yaml文件中环境变量值，启动状态更新服务

# kubectl create -f appstatus.yaml
