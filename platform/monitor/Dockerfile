FROM index.boxlinker.com/boxlinker/centos7-base:latest
MAINTAINER xiaofengwang
RUN easy_install flask
RUN easy_install flask_cors==3.0.0
RUN easy_install requests
RUN easy_install rfc3339
RUN easy_install pika
COPY ./monitor_code /data/
EXPOSE 9008
CMD python /data/api/restful_api.py
