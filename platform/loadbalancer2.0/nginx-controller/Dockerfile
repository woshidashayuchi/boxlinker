#FROM nginx:1.11.8
FROM nginx:latest
# forward nginx access and error logs to stdout and stderr of the ingress
# controller process
RUN ln -sf /proc/1/fd/1 /var/log/nginx/access.log \
	&& ln -sf /proc/1/fd/2 /var/log/nginx/error.log
RUN apt-get update

RUN apt-get install telnet

RUN apt-get install net-tools

RUN apt-get -y install vim

RUN apt-get -y install curl

COPY nginx-ingress nginx/ingress.tmpl nginx/nginx.conf.tmpl nginx/configmap.tmpl /

RUN rm /etc/nginx/conf.d/*

ENTRYPOINT ["/nginx-ingress"]
