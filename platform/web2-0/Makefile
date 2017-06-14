all: push

# 0.0 shouldn't clobber any released builds
TAG = 1.0.0
PREFIX = index.boxlinker.com/boxlinker
IMAGE_NAME = fe-console

container:
	npm run build -- --release
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true
