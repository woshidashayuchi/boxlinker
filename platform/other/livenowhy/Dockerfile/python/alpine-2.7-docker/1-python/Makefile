all: push

TAG = py2.7.10-baseg
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/alpine

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true

