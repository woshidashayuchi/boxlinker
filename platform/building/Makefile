all: container

container:
	cd cmd && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w' -o server
