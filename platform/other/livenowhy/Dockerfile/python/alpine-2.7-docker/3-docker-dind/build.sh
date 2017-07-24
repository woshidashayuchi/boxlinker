docker build -t alpine:2.7.10_alpine_docker_dind .

docker tag alpine:2.7.10_alpine_docker_dind index.boxlinker.com/liuzhangpei/alpine:2.7.10_alpine_docker_dind
docker push index.boxlinker.com/liuzhangpei/alpine:2.7.10_alpine_docker_dind


