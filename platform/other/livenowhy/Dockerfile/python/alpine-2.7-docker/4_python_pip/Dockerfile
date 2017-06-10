FROM alpine:2.7.10_alpine_docker_dind

############  安装 python 依赖包  ############
RUN echo '/PythonTools' >> /usr/local/lib/python2.7/site-packages/mypath.pth
RUN pip install flask flask_restful
RUN pip install flask-cors requests
RUN pip install pika

#RUN set -ex \
#	&& apk add --no-cache  gcc \
#        &&  python-dev 
RUN chmod 600 /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa.pub
COPY known_hosts /root/.ssh/known_hosts
#RUN apk add --no-cache gcc
#RUN apk add --no-cache g++
#RUN pip install pycrypto
#RUN pip install gittle

EXPOSE 80  443


