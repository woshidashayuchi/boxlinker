{"kind": "ReplicationController", "spec": {"selector": {"name": "balabala100"}, "template": {"spec": {"containers": [{"name": "balabala100", "image": "index.boxlinker.com/boxlinker/web-index:latest", "env": [{"name": "aaa", "value": "bbb"}, {"name": "ccc", "value": "ddd"}], "imagePullPolicy": "Always", "ports": [{"protocol": "TCP", "containerPort": 3000}, {"protocol": "TCP", "containerPort": 2000}]}], "nodeSelector": {"role": "user"}}, "metadata": {"labels": {"component": "balabala100", "name": "balabala100", "logs": "balabala100"}}}, "replicas": 1}, "apiVersion": "v1", "metadata": {"labels": {"component": "balabala100", "rc-krud": "boxlinker_web-index", "name": "balabala100"}, "namespace": "1a637b8b-24dd-47a8-8931-4b86034140e7", "name": "balabala100"}}



{"kind": "Service",
 "namespace":
     "1a637b8b-24dd-47a8-8931-4b86034140e7",
 "spec": {"ports": [{"targetPort": 3000, "name": "http1", "port": 3000},
                    {"targetPort": 2000, "name": "tcp1", "port": 2000}],
          "selector": {"component": "balabala100", "name": "balabala100"}},
 "apiVersion": "v1", "metadata": {"labels": {"name": "balabala100"},
                                  "annotations": {"serviceloadbalancer/lb.tcp": "30001:2000",
                                                  "serviceloadbalancer/lb.http": "wangxiaofeng-balabala100.lb1.boxlinker.com:3000",
                                                  "serviceloadbalancer/lb.node": "lb1"},
                                  "name": "balabala100"}}

