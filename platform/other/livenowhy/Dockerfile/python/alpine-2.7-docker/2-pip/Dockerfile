FROM alpine:python_2.7.10


############  安装 python 依赖包  ############

RUN pip install flask flask_restful flask-cors && RUN pip install sqlalchemy

RUN apk --update add gnupg openssl tar xz

RUN apk --update add bzip2-dev
RUN apk --update add gcc
RUN apk --update add gdbm-dev
RUN apk --update add libc-dev
RUN apk --update add linux-headers
RUN apk --update add make
RUN apk --update add ncurses-dev
RUN apk --update add openssl-dev
RUN apk --update add pax-utils
RUN apk --update add readline-dev
RUN apk --update add sqlite-dev
RUN apk --update add tcl-dev
RUN apk --update add tk
RUN apk --update add tk-dev
RUN apk --update add zlib-dev
RUN apk --update add unzip

RUN pip install jwt  RSA PyJWT requests pika

RUN apk --update add libffi-dev

RUN pip install cryptography
RUN wget https://pypi.python.org/packages/a5/e9/51b544da85a36a68debe7a7091f068d802fc515a3a202652828c73453cad/MySQL-python-1.2.5.zip
RUN unzip MySQL-python-1.2.5.zip

#RUN apk --update add libmysqlclient-dev

RUN apk --update add mysql

RUN apk --update add mysql-client

# MySQL-python


RUN apk --update add py-mysqldb

RUN apk --update add python-dev

RUN apk --update add mysql-bench


RUN apk --update add libjpeg-dev

############  安装 python 依赖包  ############

RUN echo '/PythonTools' >> /usr/local/lib/python2.7/site-packages/mypath.pth

EXPOSE 80  443

# 设置时区
RUN cp /usr/lib/tcl8.6/tzdata/Asia/Shanghai  /etc/localtime


