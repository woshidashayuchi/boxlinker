all: push

TAG = py2.7.10
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/centos

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true

# index.boxlinker.com/boxlinker/centos:py2.7.10