#!/bin/bash

cat <<EOF >/opt/kubernetes/cfg/rabbitmq-docker-compose.yml
rabbitmq:
  name: rabbitmq
  image: index.36ap.com/centos-rabbitmq:cluster-firstnode-1.0.0
  volumes:
  - "/etc/hosts:/etc/hosts"
  ports:
  - "${1}:4369:4369"
  - "${1}:25672:25672"
EOF

docker-compose -f /opt/kubernetes/cfg/rabbitmq-docker-compose.yml up -d