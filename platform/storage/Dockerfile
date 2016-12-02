# Author: YanHua <it-yanh@all-reach.com>

FROM index.boxlinker.com/boxlinker/centos7-base:latest

RUN pip install flask-restful
RUN pip install requests
RUN pip install flask-cors
RUN pip install pika
RUN yum install -y MySQL-python

COPY ./common /storage/common/
COPY ./storage /storage/storage/

CMD python /storage/storage/restapi/restapi_service.py & python /storage/storage/rpcapi/rpcapi_service.py
