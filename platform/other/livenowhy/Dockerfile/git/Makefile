all: push

TAG = latest
PREFIX = index.boxlinker.com
IMAGE_NAME = boxlinker/mygit

container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true

# index.boxlinker.com/boxlinker/mygit:latest
# docker run -d -v /data/git:/gitrepo -p 443:443 -p 80:80 index.boxlinker.com/boxlinker/mygit:latest
