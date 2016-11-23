FROM index.boxlinker.com/boxlinker/centos7-base:latest
MAINTAINER xiaofengwang
RUN easy_install flask
RUN easy_install flask_cors==3.0.0
RUN easy_install requests
RUN easy_install pika
ENV GRAFANA grafana-api:3000
ENV AUTHOR_HOST auth:8080/api/v1.0/usercenter/tokens
COPY ./console_board /data/
EXPOSE 9999
CMD python /data/api/restful_api.py