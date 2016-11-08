# Author: YanHua <it-yanh@all-reach.com>

FROM docker.io/million12/centos-supervisor:latest

COPY ./supervisord.conf /etc/

RUN yes | cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo '#!/bin/bash' >> /run/console/run.sh
RUN chmod 755 /run/console/run.sh
