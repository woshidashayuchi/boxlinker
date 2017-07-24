docker build -t alpine:2.7.10_alpine_docker_dind_pytools .


docker tag alpine:2.7.10_alpine_docker_dind_pytools index.boxlinker.com/liuzhangpei/alpine:2.7.10_alpine_docker_dind_pytools
docker push index.boxlinker.com/liuzhangpei/alpine:2.7.10_alpine_docker_dind_pytools


#docker build --no-cache -t python:2.7.10-flask .
