#!/usr/bin/env bash

make

rm -rf oss_callback.tar

docker save -o oss_callback.tar index.boxlinker.com/boxlinker/oss_callback:latest


#scp oss_callback.tar root@101.201.31.58:/root/
#rm -rf oss_callback.tar
#rm -rf OssServer