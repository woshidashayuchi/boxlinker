docker stop nginx
docker rm nginx || true

docker run -d --name nginx -p 80:80 -p 443:443 index.boxlinker.com/boxlinker/nginx-true:latest
