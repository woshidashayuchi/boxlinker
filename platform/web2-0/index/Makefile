all: push

TAG = latest
PREFIX = index.boxlinker.com/boxlinker
IMAGE_NAME = web-index

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true
