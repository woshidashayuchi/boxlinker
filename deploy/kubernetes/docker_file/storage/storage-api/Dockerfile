# Author: YanHua <it-yanh@all-reach.com>

FROM index.boxlinker.com/boxlinker/centos-storage:base-1.0.1

COPY ./common /storage/common/
COPY ./storage /storage/storage/

CMD python /storage/storage/server/api_server.py
