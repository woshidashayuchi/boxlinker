FROM alpine:2.7.10_alpine_docker_dind_pytools



RUN pip install pymysql
COPY run.sh /run.sh

RUN chmod 755 /*.sh

COPY dockerd-entrypoint.sh /usr/local/bin/

COPY config.json /root/.docker/config.json


RUN apk update && apk add tzdata

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone

RUN pip install enum
