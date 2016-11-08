#!/bin/bash

REGISTRY_IP=${1:-"192.168.1.15"}
REGISTRY_HOST=${2:-"index.boxlinker.com"}
REGISTRY_TOKEN=${3:-"Ym94bGlua2VyOlFBWndzeDMyMQ=="}

sed -i '/${REGISTRY_HOST}/d' /etc/hosts
echo $REGISTRY_IP $REGISTRY_HOST >> /etc/hosts

mkdir -p ~/.docker
cat <<EOF >~/.docker/config.json
{
    "auths":{
        "${REGISTRY_IP}":{
            "auth":"${REGISTRY_TOKEN}"
        }
    }
}
EOF