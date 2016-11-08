# Author: YanHua <it-yanh@all-reach.com>

FROM docker.io/centos

COPY ./get-pip.py /home/

RUN python /home/get-pip.py
RUN yes | cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN rm -rf /home/*

RUN pip install djangocms-installer
RUN mkdir /djangocms
RUN djangocms -f -p /djangocms web_app

COPY ./settings.py /djangocms/web_app/

CMD python /djangocms/manage.py runserver 0.0.0.0:8080
