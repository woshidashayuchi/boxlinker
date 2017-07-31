all: push

IMAGE=index.boxlinker.com/boxlinker/centos-ucenter:1.0.1

build:
	docker build -t ${IMAGE} .

push: build
	docker push ${IMAGE}
