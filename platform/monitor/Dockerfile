FROM index.boxlinker.com/boxlinker/centos7-base:latest
MAINTAINER xiaofengwang
RUN easy_install flask
RUN easy_install flask_cors==3.0.0
RUN easy_install requests
RUN easy_install rfc3339
RUN easy_install pika
ENV AUTHOR_HOST auth.boxlinker.com/api/v1.0/usercenter/tokens
ENV GRAFANA grafana-api:3000
ENV HEAPSTER heapster:8082
ENV RABBITMQ_HOST rabbitmq
ENV RABBITMQ_PORTS 5672
COPY ./monitor_code /data/
EXPOSE 9008
CMD python /data/api/restful_api.py
