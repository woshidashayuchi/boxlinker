all: container



IMAGE_NAME = index.boxlinker.com/boxlinker/gitoauth
IMAGE_TAG = latest


build:
	rm gitoauth ||  true
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w' -o gitoauth

container: build
	docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
	docker push ${IMAGE_NAME}:${IMAGE_TAG}
	rm gitoauth ||  true


