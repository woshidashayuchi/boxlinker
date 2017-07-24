docker build -t python:2.7.10-ubuntu-flask .

docker tag python:2.7.10-ubuntu-flask index.boxlinker.com/liuzhangpei/python:2.7.10-ubuntu-flask
docker push index.boxlinker.com/liuzhangpei/python:2.7.10-ubuntu-flask

#docker build --no-cache -t python:2.7.10-flask .
