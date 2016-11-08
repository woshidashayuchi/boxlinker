# Author: YanHua <it-yanh@all-reach.com>

FROM index.boxlinker.com/boxlinker/centos-logs:base-1.0.1

COPY ./common /logs/common/
COPY ./logs /logs/logs/

RUN echo 'python /logs/logs/server/api_server.py' >> /run/console/run.sh
