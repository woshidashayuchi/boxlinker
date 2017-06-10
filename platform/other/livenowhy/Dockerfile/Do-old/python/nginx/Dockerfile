FROM python:2.7.10-ubuntu-flask

ENV PATH /usr/local/bin:$PATH

MAINTAINER "docker-maint@nginx.com"



RUN apt-get update
RUN apt-get install --no-install-recommends --no-install-suggests -y \
						ca-certificates \
						nginx \
						gettext-base

RUN pip install uwsgi
#RUN rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

COPY nginx.conf /etc/nginx/conf.d/

# Copy sample app
COPY ./app /app

EXPOSE 80 443
