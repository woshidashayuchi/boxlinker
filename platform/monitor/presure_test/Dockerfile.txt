FROM index.boxlinker.com/boxlinker/centos7-base:latest
MAINTAINER xiaofengwang
RUN easy_install flask
RUN easy_install flask_cors==3.0.0
RUN easy_install requests
RUN easy_install rfc3339
RUN yum install make -y
ENV AUTHOR_HOST registry-api:8080
ENV GRAFANA grafana-api:9998
ENV HEAPSTER heapster:8082
COPY ./monitor_code /data/
COPY ./presure_test /data/
EXPOSE 9008
CMD python /data/api/restful_api.py & python /data/ware/test.py & python /data/ware/test1.py & python /data/ware/test2.py & python /data/ware/test4.py & python /data/ware/test3.py & python /data/ware/test5.py & python /data/ware/test6.py