all: container


IMAGE_NAME = index.boxlinker.com/boxlinker/imgstorage
IMAGE_TAG = test

build:
	rm OssServer ||  true
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w' -o OssServer

container: build
	docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
	docker push ${IMAGE_NAME}:${IMAGE_TAG}

#docker build --no-cache -t index.boxlinker.com/boxlinker/oss_callback:latest .