#!/usr/bin/env bash
#
#make
#
#rm -rf oss_callback.tar
#
#docker save -o oss_callback.tar index.boxlinker.com/boxlinker/oss_callback:latest
#
#
#scp oss_callback.tar root@192.168.1.5:/root/
#rm -rf oss_callback.tar
#rm -rf OssServer
#docker pull index.boxlinker.com/boxlinker/oss_callback:test
docker-compose stop
docker-compose rm -f
docker-compose up -d
docker logs -f alioss_auth_1