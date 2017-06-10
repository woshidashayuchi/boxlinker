all: push

TAG = ShanghaiTimezone
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/registry

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true