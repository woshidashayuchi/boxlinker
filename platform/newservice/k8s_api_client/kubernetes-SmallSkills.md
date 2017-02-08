* kubernetes namespace limits 文件略格式
    apiVersion: v1
    kind: LimitRange
    metadata:
     name: limits
     namespace: lxf
    spec:
     limits:
      - default:
         cpu: 100m
         memory: 512Mi
        max:
         memory: 1024Mi
        type: pod
