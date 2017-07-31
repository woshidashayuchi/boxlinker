all: push

IMAGE=registry.cn-beijing.aliyuncs.com/cabernety/rabbitmq:latest

build:
	docker build -t ${IMAGE} .

push: build
	docker push ${IMAGE}
