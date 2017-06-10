FROM python:2.7.10-ubuntu-flask


RUN set -ex && apt-get install -y --no-install-recommends apache2
RUN apt-get install -y apache2-utils apache2-mpm-prefork apache2-prefork-dev
RUN pip install mod_wsgi

RUN rm -rf /etc/apache2/apache2.conf /etc/apache2/sites-available/000-default.conf

RUN mkdir /var/www/.python-eggs && chmod a+w /var/www/.python-eggs && chmod a+r /var/www/.python-eggs

COPY  apache2.conf     /etc/apache2/apache2.conf
COPY  000-default.conf  /etc/apache2/sites-available/000-default.conf


COPY run.sh /start.sh
RUN set -ex && cd / && chmod a+x start.sh


RUN pip install pika

CMD ["/start.sh"]
