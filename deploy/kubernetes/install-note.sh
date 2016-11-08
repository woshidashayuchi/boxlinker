#!/usr/bin/env bash
yum update -y

touch /etc/yum.repos.d/kubernetes.repo
echo "[virt7-docker-common-release]
name=virt7-docker-common-release
baseurl=http://cbs.centos.org/repos/virt7-docker-common-release/x86_64/os/
gpgcheck=0" >> /etc/yum.repos.d/kubernetes.repo
yum -y install --enablerepo=virt7-docker-common-release kubernetes

for SERVICES in kube-proxy kubelet docker flannel; do
    systemctl restart $SERVICES
    systemctl enable $SERVICES
    systemctl status $SERVICES 
done

./gen.sh 123.57.137.180 IP:123.57.137.180,IP:10.0.0.1,DNS:kubernetes,DNS:kubernetes.default,DNS:kubernetes.default.svc,DNS:kubernetes.default.svc.cluster.local

for SERVICES in etcd kube-apiserver kube-controller-manager kube-scheduler; do 
systemctl restart $SERVICES
systemctl enable $SERVICES
systemctl status $SERVICES
done

curl https://123.57.137.180:443/api/v1/nodes --cert /srv/kubernetes/kubecfg.crt --key /srv/kubernetes/kubecfg.key --cacert /srv/kubernetes/ca.crt

# 启用 Deployments 等 , allow-privileged 是 nfs 需要
KUBE_API_ARGS="--allow-privileged=true --runtime-config=extensions/v1beta1=true,extensions/v1beta1/deployments=true,extensions/v1beta1/jobs=true"


#flanneld
vi /etc/sysconfig/flanneld
etcdctl set /36ap.com/network/config '{ "Network": "172.16.0.0/16" }'


# install glusterfs on centos7
curl http://download.gluster.org/pub/gluster/glusterfs/LATEST/EPEL.repo/glusterfs-epel.repo -o /etc/yum.repos.d/glusterfs-epel.repo
# enable EPEL, too
yum --enablerepo=epel -y install glusterfs-server
systemctl start glusterd
systemctl enable glusterd
#在一个node上添加另一个node
gluster peer probe gluster2host
#新建volume
gluster volume create testvol replica 2 transport tcp glusterfs1:/mnt/testvol glusterfs2:/mnt/testvol force
#start volume
gluster volume start testvol
#查看net
netstat -tap | grep glusterfsd


# install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.7.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

export PATH=$PATH:/opt/kubernetes/bin/ && docker rmi -f $(docker images -q)



