docker build -t python:2.7.10-ubuntu-flask_sup .

docker tag python:2.7.10-ubuntu-flask_sup index.boxlinker.com/liuzhangpei/python:2.7.10-ubuntu-flask_sup
docker push index.boxlinker.com/liuzhangpei/python:2.7.10-ubuntu-flask_sup

#docker build --no-cache -t python:2.7.10-flask .
