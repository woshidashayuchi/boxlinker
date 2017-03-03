{"status":
     {"containerStatuses":
          [{"restartCount": 0, "name": "haa-ledss",
            "image": "index.boxlinker.com/zhangsan/peepes:latest",
            "imageID": "",
            "state": {"waiting":
                          {"reason": "ImagePullBackOff",
                           "message": "Back-off pulling image \"index.boxlinker.com/zhangsan/peepes:latest\""}},
            "ready": false, "lastState": {}}],
      "podIP": "172.16.77.12", "startTime": "2017-03-03T07:11:11Z",
      "hostIP": "172.20.1.28", "phase": "Pending",
      "conditions":
          [{"status": "True", "lastProbeTime": null, "type": "Initialized",
            "lastTransitionTime": "2017-03-03T07:11:11Z"},
           {"status": "False", "lastTransitionTime": "2017-03-03T07:11:11Z",
            "reason": "ContainersNotReady", "lastProbeTime": null,
            "message": "containers with unready status: [haa-ledss]", "type": "Ready"},
           {"status": "True", "lastProbeTime": null, "type": "PodScheduled",
            "lastTransitionTime": "2017-03-03T07:10:54Z"}]},
 "spec": {"dnsPolicy": "ClusterFirst", "securityContext": {},
          "serviceAccountName": "default", "serviceAccount": "default",
          "nodeSelector": {"role": "user"}, "terminationGracePeriodSeconds": 30,
          "restartPolicy": "Always",
          "volumes": [{"secret": {"secretName": "default-token-qtazt"},
                                                  "name": "default-token-qtazt"}],
          "imagePullSecrets": [{"name": "registry-key"}],
          "containers": [{"terminationMessagePath": "/dev/termination-log",
                          "name": "haa-ledss", "image": "index.boxlinker.com/zhangsan/peepes:latest",
                          "volumeMounts": [{"readOnly": true,
                                            "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                                            "name": "default-token-qtazt"}],
                          "env": [{"name": "aaa", "value": "bbb"}, {"name": "ccc", "value": "ddd"}],
                          "imagePullPolicy": "Always", "ports": [{"protocol": "TCP", "containerPort": 3000},
                                                                 {"protocol": "TCP", "containerPort": 2000}],
                          "resources": {}}], "nodeName": "172.20.1.28"},
 "metadata": {"name": "haa-ledss-iopkc",
              "labels": {"component": "HAa_lEDSS", "logs": "haa-ledss", "name": "haa-ledss"},
              "namespace": "6c324678-6764-453a-b22e-a837ef18fb73",
              "resourceVersion": "23336614", "generateName": "haa-ledss-",
              "creationTimestamp": "2017-03-03T07:10:37Z",
              "annotations": {"kubernetes.io/created-by":
                                  "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\","
                                  "\"reference\":{"
                                  "\"kind\":\"ReplicationController\","
                                  "\"namespace\":\"6c324678-6764-453a-b22e-a837ef18fb73\","
                                  "\"name\":\"haa-ledss\",\"uid\":\"e0a301cf-ffdf-11e6-86b4-525400000023\","
                                  "\"apiVersion\":\"v1\",\"resourceVersion\":\"23334731\"}}\n"},
              "selfLink": "/api/v1/namespaces/6c324678-6764-453a-b22e-a837ef18fb73/pods/haa-ledss-iopkc", "uid": "80b1d103-ffe0-11e6-8f93-525400000041"}}























{u'status':
     {u'containerStatuses':
          [{u'restartCount': 0,
            u'name': u'appstatus-service',
            u'image': u'index.boxlinker.com/boxlinker/appstatus:1.0.2',
            u'imageID': u'docker://sha256:db9302fa328a21ab5fce022b8cce8bcc441fed9dff6cdd639b45f3dd341fbff4',
            u'state': {u'running': {u'startedAt': u'2017-03-02T02:44:39Z'}},
            u'ready': True, u'lastState': {},
            u'containerID': u'docker://15b34b51ebfbd3365f63fb37feec921977535291b0c1971f8ae502c2e1ef706a'}],
      u'podIP': u'172.16.77.14', u'startTime': u'2017-03-02T02:44:29Z',
      u'hostIP': u'172.20.1.28', u'phase': u'Running',
      u'conditions': [{u'status': u'True', u'lastProbeTime': None,
                       u'type': u'Initialized', u'lastTransitionTime': u'2017-03-02T02:44:29Z'},
                      {u'status': u'True', u'lastProbeTime': None, u'type': u'Ready',
                       u'lastTransitionTime': u'2017-03-02T02:44:40Z'},
                      {u'status': u'True', u'lastProbeTime': None, u'type': u'PodScheduled',
                       u'lastTransitionTime': u'2017-03-02T02:44:11Z'}]},
 u'spec': {u'dnsPolicy': u'ClusterFirst', u'securityContext': {},
           u'serviceAccountName': u'default', u'serviceAccount': u'default',
           u'nodeSelector': {u'role': u'user'}, u'terminationGracePeriodSeconds': 30,
           u'restartPolicy': u'Always',
           u'volumes': [{u'secret': {u'secretName': u'default-token-aobd3'},
                         u'name': u'default-token-aobd3'}],
           u'imagePullSecrets': [{u'name': u'registry-key'}],
           u'containers': [{u'terminationMessagePath': u'/dev/termination-log',
                            u'name': u'appstatus-service',
                            u'image': u'index.boxlinker.com/boxlinker/appstatus:1.0.2',
                            u'volumeMounts': [{u'readOnly': True,
                                               u'mountPath': u'/var/run/secrets/kubernetes.io/serviceaccount', u'name': u'default-token-aobd3'}],
                            u'env': [{u'name': u'K8S_POD_API', u'value': u'https://kubernetes.default.svc:443/api/v1/pods'},
                                     {u'name': u'K8S_UPDATE_API',
                                      u'value': u'http://k8s-api:9000/api/v1/application/service/status'},
                                     {u'name': u'TOKEN_PATH', u'value': u'/run/secrets/kubernetes.io/serviceaccount/token'}],
                            u'imagePullPolicy': u'Always', u'resources': {}}], u'nodeName': u'172.20.1.28'},
 u'metadata': {u'name': u'appstatus-service-k1u6a',
               u'labels': {u'logs': u'yanhua-appstatus-service', u'name': u'appstatus-service'},
               u'namespace': u'yanhua', u'resourceVersion': u'22921240',
               u'generateName': u'appstatus-service-',
               u'creationTimestamp': u'2017-03-02T02:44:11Z',
               u'annotations': {u'kubernetes.io/created-by':
                                    u'{"kind":"SerializedReference","apiVersion":"v1",'
                                    u'"reference":{"kind":"ReplicationController",'
                                    u'"namespace":"yanhua","name":"appstatus-service",'
                                    u'"uid":"1dc1603d-fef2-11e6-ab69-525400000021",'
                                    u'"apiVersion":"v1","resourceVersion":"22921150"}}\n'},
               u'selfLink': u'/api/v1/namespaces/yanhua/pods/appstatus-service-k1u6a',
               u'uid': u'1dc6ed02-fef2-11e6-ab69-525400000021'}}