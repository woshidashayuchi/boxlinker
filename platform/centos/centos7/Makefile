all: push

IMAGE=index.boxlinker.com/boxlinker/centos7-base:latest

build:
	docker build -t ${IMAGE} .

push: build
	docker push ${IMAGE}
