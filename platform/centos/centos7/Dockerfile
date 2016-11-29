# Author: YanHua <it-yanh@all-reach.com>

FROM docker.io/centos:latest

COPY ./get-pip.py /home/

RUN python /home/get-pip.py
RUN yes | cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN rm -rf /home/*
