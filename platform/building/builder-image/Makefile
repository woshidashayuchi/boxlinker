.PHONY: test build data

IMAGE=remind101/conveyor-builder
DATA_IMAGE=conveyor-builder-data
EMAIL=your_email@example.com

test: bootstrap
	docker run --privileged=true \
		--volumes-from=data \
		-e CACHE=off \
		-e REPOSITORY=remind101/conveyor-builder-test \
		-e BRANCH=master \
		-e SHA=01ac59b40c069a0114d9aab8bde096527cbab2f8 \
		-e DRY=true \
		${IMAGE}

bootstrap: build data

build: Dockerfile bin/*
	docker build -t ${IMAGE} .

data: data/.docker/config.json data/.ssh/id_rsa
	docker rm data || true
	docker create --name data \
		-v ${PWD}/data/.ssh:/var/run/conveyor/.ssh \
		-v ${PWD}/data/.docker/config.json:/var/run/conveyor/.docker/config.json \
		alpine:3.1 sh

data/.docker/config.json:
	cp ${HOME}/.docker/config.json data/.docker/config.json

data/.ssh/id_rsa:
	ssh-keygen -t rsa -b 4096 -C ${EMAIL} -f data/.ssh/id_rsa -P ""
