FROM centos:latest

MAINTAINER <liuzhangpei liuzhangpei@126.com>


RUN yum install -y rsync xinetd httpd


ADD ./rsyncd.conf /etc/rsyncd.conf
ADD ./rsyncd.pwd  /etc/rsyncd.pwd

# (权限要设置为600，否则无法备份成功)
RUN chmod 600 /etc/rsyncd.pwd

#RUN mkdir /etc/rsyncd
#RUN touch /etc/rsyncd/rsyncd.conf && touch /etc/rsyncd/rsyncd.secrets && touch /etc/rsyncd/rsyncd.motd
#RUN chmod 600 /etc/rsyncd/rsyncd.secrets

#RUN yum install -y inotify