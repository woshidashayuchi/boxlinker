# Author: YanHua <it-yanh@all-reach.com>

FROM index.boxlinker.com/boxlinker/centos-base:latest

COPY ./get-pip.py /home/

RUN python /home/get-pip.py
RUN pip install flask-restful
RUN pip install requests
RUN pip install flask-cors
RUN rm -rf /home/*
