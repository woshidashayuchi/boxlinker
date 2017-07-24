FROM centos:7

RUN yum update -y
RUN yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel perl-devel -y
RUN yum install git -y
ENV USERNAME root
RUN groupadd git && adduser git -g git
RUN cd / && mkdir /gitrepo && chown git:git /gitrepo/

EXPOSE 443 80


RUN cd /home/git/ && mkdir .ssh && chmod 700 .ssh && touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
COPY id_rsa.pub /home/git/.ssh/id.pub
RUN cd /home/git/.ssh && cat id.pub >> authorized_keys


COPY run.sh /run.sh
RUN chmod 755 /run.sh
CMD ["/run.sh"]