
FROM index.boxlinker.com/boxlinker/boxlinker-git-base:latest

ENV BLG_CUSTOM /data/boxlinker-git
ENV USER  zhangsai
COPY . /app/boxlinker-git
WORKDIR /app/boxlinker-git
RUN ./docker/build.sh

# Configure LibC Name Service
COPY docker/nsswitch.conf /etc/nsswitch.conf

VOLUME ["/data"]
EXPOSE 22 3000
ENTRYPOINT ["docker/start.sh"]
