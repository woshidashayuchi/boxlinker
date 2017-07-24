all: push

TAG = latest
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/nginx-auth-proxy

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true


#docker run -d --name registry -p 5000:5000 registry:2.5.0
#docker run -d --hostname index1.boxlinker.com --name nginx --link registry:registry -p 443:443 index.boxlinker.com/boxlinker/nginx-auth-proxy:latest


# openssl req -x509 -new -nodes -key ca.key -subj "/CN=index.boxlinker.com" -days 10000 -out ca.crt