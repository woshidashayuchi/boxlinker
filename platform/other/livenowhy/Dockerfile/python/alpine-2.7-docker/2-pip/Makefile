all: push

TAG = python_2.7.10_pip
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/alpine

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true

#docker build --no-cache -t python:2.7.10-flask .
