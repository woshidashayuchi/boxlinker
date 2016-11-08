
每个 master 节点需要运行 make-ca-cert.sh 文件来生成证书

运行命令： ./make-ca-cert.sh ${MASTER_IP} IP:${MASTER_IP} ,IP:10.254.0.1,DNS:kubernetes,DNS:kubernetes.default,DNS:kubernetes.default.svc,DNS:kubernetes.default.svc.cluster.local

生成的证书总共有5个文件
ca.crt  server.cert  server.key  kubecfg.crt  kubecfg.key  

输出目录是： /opt/kubernetes/ssl/

修改 api-server 配置文件：
--client-ca-file=/opt/kubernetes/ssl/ca.crt
--tls-cert-file=/opt/kubernetes/ssl/server.cert
--tls-private-key-file=/opt/kubernetes/ssl/server.key

修改 controller-manager 配置文件：
--root-ca-file=/opt/kubernetes/ssl/ca.crt
--service-account-private-key-file=/opt/kubernetes/ssl/server.key

在每一台 node 节点上需要生成一个 kubeconfig 文件，输出目录为 /opt/kubernetes/kubeconfig

kubeconfig 文件示例（我写了一个 sh 脚本，在 node/scripts/kubectl.sh 中）

apiVersion: v1
kind: Config
users:
- name: kubelet
  user:
    client-certificate: /opt/kubernetes/ssl/kubecfg.crt
    client-key: /opt/kubernetes/ssl/kubecfg.key
clusters:
- name: local
  cluster:
    certificate-authority: /opt/kubernetes/ssl/ca.crt
contexts:
- context:
    cluster: local
    user: kubelet
  name: default-context
current-context: default-context、

然后修改 kubelet 和 kube-proxy 配置文件, 添加 --kubeconfig=/var/lib/kubelet/kubeconfig 

将 kubelet 和 kube-proxy 对应的 master ip 改成 https://192.168.1.21:443
