# Author: YanHua <it-yanh@all-reach.com>

FROM index.boxlinker.com/boxlinker/centos-rabbitmq:cluster-base-1.0.1

RUN echo 'rabbitmq-server -detached' >> /run/console/run.sh
RUN echo 'sleep 1s' >> /run/console/run.sh
RUN echo 'rabbitmqctl stop_app' >> /run/console/run.sh
RUN echo 'sleep 1s' >> /run/console/run.sh
RUN echo 'rabbitmqctl reset' >> /run/console/run.sh
RUN echo 'sleep 1s' >> /run/console/run.sh
RUN echo 'rabbitmqctl join_cluster --ram rabbit@rabbitmq01' >> /run/console/run.sh
RUN echo 'sleep 1s' >> /run/console/run.sh
RUN echo 'rabbitmqctl start_app' >> /run/console/run.sh
RUN echo 'sleep 1s' >> /run/console/run.sh
RUN echo 'rabbitmqctl set_policy ha-all "^" '{"ha-mode":"all"}'' >> /run/console/run.sh
