FROM alpine

MAINTAINER <liuzhangpei liuzhangpei@126.com>

RUN apk --update add rsync tzdata && rm -f /etc/rsyncd.conf

EXPOSE 873

COPY ./run /usr/local/bin/run

ENTRYPOINT ["/usr/local/bin/run"]