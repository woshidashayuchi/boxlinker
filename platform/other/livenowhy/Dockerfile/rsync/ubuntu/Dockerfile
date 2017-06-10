FROM ubuntu:14.04

MAINTAINER <liuzhangpei liuzhangpei@126.com>

RUN apt-get upgrade -y
RUN apt-get update -y
RUN apt-get install -y rsync



ENTRYPOINT ["/usr/bin/rsync"]


# rsync 客户端