FROM index.boxlinker.com/liuzhangpei/python:2.7.10-ubuntu-flask


RUN pip install pika



RUN pip install supervisor

RUN pip install oss2
RUN pip install Pillow

COPY run.sh /start.sh
RUN set -ex && cd / && chmod a+x start.sh

COPY run.sh /run.sh
RUN chmod 755 /*.sh

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
