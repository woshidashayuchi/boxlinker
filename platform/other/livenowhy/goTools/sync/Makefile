all: push

build:
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w' -o sync

push: build
	scp sync root@123.56.9.18:/root/sync


