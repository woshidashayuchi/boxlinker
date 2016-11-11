计费服务

1.创建计费服务镜像

# docker build -t index.boxlinker.com/boxlinker/centos-billing:1.0.1 ./

2.启动计费服务

修改billing_conf.yaml文件中环境变量值，启动计费服务

# kubectl create -f billing_conf.yaml
