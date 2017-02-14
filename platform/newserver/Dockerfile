FROM index.boxlinker.com/boxlinker/centos7-base:latest
MAINTAINER xiaofengwang
RUN easy_install requests
RUN easy_install pika
ENV TOKEN_PATH /run/secrets/kubernetes.io/serviceaccount/token
COPY ./server /data/
CMD python /data/k8sserver/kuber_callserver.py