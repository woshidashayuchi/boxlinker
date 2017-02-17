# -*- coding: utf-8 -*-
# Author: wang-xf <it-wangxf@all-reach.com>
# Date: 2017/02/17

# SELECT

'''
    curl -X GET -H 'token: f63d07a9-dd28-4021-a393-db3f364006be' http://localhost:9000/api/v1.0/application/service

    curl -X GET -H 'token: f63d07a9-dd28-4021-a393-db3f364006be' http://localhost:9000/api/v1.0/application/service?service_name='xxx'
'''

# DELETE

'''

'''

{u'status': {u'containerStatuses': [{u'restartCount': 0, u'name': u'kalaoko', u'image': u'index.boxlinker.com/boxlinker/web-index:latest', u'imageID': u'docker://sha256:573c0d1a78db0582037e1305d8ead4c6d5447d823ab2dab9bfe16fdea7e8ad50', u'state': {u'running': {u'startedAt': u'2017-02-16T10:05:16Z'}}, u'ready': True, u'lastState': {}, u'containerID': u'docker://5dd9086a86a8f479937ae05908ca5c2887d637148388052caf62f09b2882f23e'}], u'podIP': u'172.16.37.17', u'startTime': u'2017-02-16T10:05:16Z', u'hostIP': u'192.168.1.14', u'phase': u'Running', u'conditions': [{u'status': u'True', u'type': u'Initialized', u'lastProbeTime': None, u'lastTransitionTime': u'2017-02-16T10:05:16Z'}, {u'status': u'True', u'type': u'Ready', u'lastProbeTime': None, u'lastTransitionTime': u'2017-02-16T10:05:16Z'}, {u'status': u'True', u'type': u'PodScheduled', u'lastProbeTime': None, u'lastTransitionTime': u'2017-02-16T10:05:16Z'}]}, u'kind': u'Pod', u'spec': {u'dnsPolicy': u'ClusterFirst', u'securityContext': {}, u'serviceAccountName': u'default', u'serviceAccount': u'default', u'nodeSelector': {u'role': u'user'}, u'terminationGracePeriodSeconds': 30, u'restartPolicy': u'Always', u'volumes': [{u'secret': {u'secretName': u'default-token-5wqz2'}, u'name': u'default-token-5wqz2'}], u'imagePullSecrets': [{u'name': u'registry-key'}], u'containers': [{u'terminationMessagePath': u'/dev/termination-log', u'name': u'kalaoko', u'image': u'index.boxlinker.com/boxlinker/web-index:latest', u'volumeMounts': [{u'readOnly': True, u'mountPath': u'/var/run/secrets/kubernetes.io/serviceaccount', u'name': u'default-token-5wqz2'}], u'env': [{u'name': u'aaa', u'value': u'bbb'}, {u'name': u'ccc', u'value': u'ddd'}], u'imagePullPolicy': u'Always', u'ports': [{u'protocol': u'TCP', u'containerPort': 3000}, {u'protocol': u'TCP', u'containerPort': 2000}], u'resources': {}}], u'nodeName': u'192.168.1.14'}, u'apiVersion': u'v1', u'metadata': {u'name': u'kalaoko-vbpve', u'deletionTimestamp': u'2017-02-17T03:11:47Z', u'deletionGracePeriodSeconds': 30, u'labels': {u'component': u'kalaoko', u'logs': u'kalaoko', u'name': u'kalaoko'}, u'namespace': u'6c324678-6764-453a-b22e-a837ef18fb73', u'resourceVersion': u'10805381', u'generateName': u'kalaoko-', u'creationTimestamp': u'2017-02-16T10:05:16Z', u'annotations': {u'kubernetes.io/created-by': u'{"kind":"SerializedReference","apiVersion":"v1","reference":{"kind":"ReplicationController","namespace":"6c324678-6764-453a-b22e-a837ef18fb73","name":"kalaoko","uid":"6a13ba4a-f42f-11e6-96a7-00163e030342","apiVersion":"v1","resourceVersion":"10698872"}}\n'}, u'selfLink': u'/api/v1/namespaces/6c324678-6764-453a-b22e-a837ef18fb73/pods/kalaoko-vbpve', u'uid': u'6a155425-f42f-11e6-9473-00163e03018d'}}

