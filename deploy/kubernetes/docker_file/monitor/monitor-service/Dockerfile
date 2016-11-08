# Author: YanHua <it-yanh@all-reach.com>

FROM index.boxlinker.com/boxlinker/centos-monitor:base-1.0.1

COPY ./common /monitor/common/
COPY ./monitor /monitor/monitor/

CMD python /monitor/monitor/server/monitor_service.py
