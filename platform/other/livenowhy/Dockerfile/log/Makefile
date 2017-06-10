all: push

TAG = latest
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/rsyslog_docker

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true

# index.boxlinker.com/boxlinker/rsyslog_docker:latest