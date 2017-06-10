# Author: liuzhangpei

FROM docker.io/centos:latest


RUN yum install -y wget
RUN cd /home && wget http://www.python.org/ftp/python/2.7.10/Python-2.7.10.tgz

RUN cd /home && tar -xvf Python-2.7.10.tgz
RUN yum install -y gcc openssl make MySQL-python
RUN mkdir /usr/local/python2.7 && cd /home/Python-2.7.10 && ./configure --prefix=/usr/local/python2.7 && make && make install

#RUN mv  /usr/bin/python  /usr/bin/python2.7.5

#RUN rm -rf /usr/bin/python2.7
##RUN ln -s /usr/local/python2.7  /usr/bin/python
#RUN ln -s /usr/local/python2.7/bin/python2.7  /usr/bin/python2.7

#RUN echo 'export PATH="/usr/local/python2.7/bin:$PATH"' >> /etc/profile
#RUN source /etc/profile

ENV PATH /usr/local/python2.7/bin:$PATH

RUN yum install -y zlib*

COPY ./get-pip.py /home/

RUN python /home/get-pip.py
RUN yes | cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN rm -rf /home/*
