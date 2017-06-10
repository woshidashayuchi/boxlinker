FROM python:2.7.10





RUN set -ex && apt-get update && apt-get install -y --no-install-recommends vim supervisor && rm -rf /var/lib/apt/lists/*


COPY run.sh /run.sh
RUN set -ex && cd / && chmod a+x run.sh
COPY test.py /test.py


RUN echo '/PythonTools' >> /usr/local/lib/python2.7/site-packages/mypath.pth


############  安装 python 依赖包  ############
RUN pip install flask
RUN pip install flask_restful
RUN pip install sqlalchemy


RUN set -ex && apt-get update && apt-get install -y --no-install-recommends unzip
RUN wget https://pypi.python.org/packages/a5/e9/51b544da85a36a68debe7a7091f068d802fc515a3a202652828c73453cad/MySQL-python-1.2.5.zip
RUN unzip MySQL-python-1.2.5.zip

RUN apt-get install -y --no-install-recommends libmysqlclient-dev

RUN cd MySQL-python-1.2.5 && python setup.py install
RUN cd / && rm -rf MySQL-python-1.2.5*

RUN pip install jwt

RUN pip install RSA
RUN pip install cryptography
RUN pip install PyJWT
RUN pip install flask-cors
RUN pip install requests
############  安装 python 依赖包  ############

#RUN rm -rf /var/lib/apt/lists/*

EXPOSE 80  443

# 设置时区
RUN cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime

### 20160826
#COPY run.py /run.py
#RUN set -ex && cd / && chmod a+x run.py
#CMD ["python", "run.py"]
### 20160826

CMD ["/bin/bash", "run.sh"]
#COPY supervisord.conf /etc/supervisor/conf.d/run.conf






#RUN set -ex && supervisord -c /etc/supervisor/conf.d/run.conf 
#RUN supervisorctl reload 
#RUN supervisorctl update


#RUN set -ex && supervisord -c /etc/supervisord.conf && supervisorctl reload &&  supervisorctl update
