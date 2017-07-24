docker build -t python:2.7.10-ubuntu-flask_apache .

docker tag python:2.7.10-ubuntu-flask_apache index.boxlinker.com/liuzhangpei/python:2.7.10-ubuntu-flask_apache
docker push index.boxlinker.com/liuzhangpei/python:2.7.10-ubuntu-flask_apache

#docker build --no-cache -t python:2.7.10-flask .
