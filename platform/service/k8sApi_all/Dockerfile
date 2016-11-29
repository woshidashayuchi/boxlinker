FROM index.boxlinker.com/boxlinker/centos7-base:latest
MAINTAINER xiaofengwang
RUN easy_install requests
RUN easy_install pika
ENV TOKEN_PATH /run/secrets/kubernetes.io/serviceaccount/token
COPY ./k8s_api_service /data/
CMD python /data/server/kubernetes_cast_server.py & python /data/server/kubernetes_server.py & python /data/server/podstatus_server.py
