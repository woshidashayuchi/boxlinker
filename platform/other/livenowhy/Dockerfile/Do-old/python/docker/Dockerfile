FROM python:2.7.10-ubuntu-flask_apache

ENV PATH /usr/local/bin:$PATH

MAINTAINER "docker-maint@nginx.com"



RUN pip install gittle
RUN apt-get update
#RUN apt-get install -y docker.io

RUN wget -qO- https://get.docker.com/ | sh

#RUN rm -rf /var/lib/apt/lists/*



EXPOSE 5555


COPY ./ssh/id_rsa /root/.ssh/id_rsa
COPY ./ssh/id_rsa.pub /root/.ssh/id_rsa.pub
