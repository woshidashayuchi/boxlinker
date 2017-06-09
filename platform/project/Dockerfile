FROM index.boxlinker.com/boxlinker/centos7-base:latest
MAINTAINER xiaofengwang
RUN easy_install requests
RUN easy_install pika
RUN easy_install pymysql
RUN yum install MySQL-python -y
RUN pip install flask-restful
RUN pip install flask-cors
RUN pip install pymongo
ENV TOKEN_PATH /run/secrets/kubernetes.io/serviceaccount/token

EXPOSE 8001


RUN echo '/data' >> /usr/lib/python2.7/site-packages/mypath.pth
COPY ./common /data/common
COPY ./newsapi/conf /data/conf
COPY ./newsapi /data/newsapi
#CMD python /data/podsmanager.py

CMD python /data/newsapi/restserver/restapi_server.py & python /data/newsapi/rpcserver/rpcapi_callserver.py



# 5672:5672

#
# # docker run --name rabbitmq -itd -p 5672:5672 index.boxlinker.com/library/rabbitmq:latest
# docker run --name newsapi -itd -p 9898:8001 index.boxlinker.com/boxlinker/newsapi:latest

# git@git.oschina.net:livenowhy/newsapi.git