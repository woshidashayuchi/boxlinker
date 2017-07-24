FROM alpine:3.4

# ensure local python is preferred over distribution python
ENV PATH /usr/local/bin:$PATH

# http://bugs.python.org/issue19846
# > At the moment, setting "LANG=C" on a Linux system *fundamentally breaks Python 3*, and that's not OK.
ENV LANG C.UTF-8

# install ca-certificates so that HTTPS works consistently
# the other runtime dependencies for Python are installed later
RUN apk add --no-cache ca-certificates

ADD OssServer /oss_callback/

WORKDIR /oss_callback
# 测试代码
#ADD ./test/test /oss_callback/


ENTRYPOINT ["/oss_callback/OssServer"]
CMD ["--v=2","--alsologtostderr","/oss_callback/conf/key.yml"]
EXPOSE 8765
ENV EXPIRETIME  60

# ENV <key> <value>

## 阿里云 key
#ENV ACCESSKEYID       ucuoqGoHqHbu4Kx1
#ENV ACCESSKEYSECRET   Ql1QIPtZtNzMOxY768nQJkRuPEI6h0
#
## 外网访问地址
#ENV HOSTOUTER         http://hvish-images.oss-cn-beijing.aliyuncs.com
#
## oss 回调
#ENV CALLBACKURL       http://101.201.31.58:8765/callback
##ENV CHECKTOKEN  http://auth.boxlinker.com/sss
#
### oss 配置, 上传位置
#ENV UPLOADDIR user-dir/
