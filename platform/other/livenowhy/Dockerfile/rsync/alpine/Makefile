all: push

TAG = latest
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/rsync_alpine

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true

# index.boxlinker.com/boxlinker/rsync:latest