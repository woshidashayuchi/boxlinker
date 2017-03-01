# Author: YanHua <it-yanh@all-reach.com>

FROM index.boxlinker.com/boxlinker/centos7-base:latest

RUN pip install requests

COPY ./conf /appstatus/conf/
COPY ./common /appstatus/common/
COPY ./appstatus /appstatus/appstatus/

CMD python /appstatus/appstatus/service/appstatus_service.py
