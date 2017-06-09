TAG = latest
PREFIX = index.boxlinker.com/boxlinker/newsapi

build:
	docker build -t $(PREFIX):$(TAG) .

push: build
	docker push $(PREFIX):$(TAG)




restart:
	docker stop newsapi || true
	docker rm -f newsapi || true
	docker run --name newsapi -itd -p 9898:8001 index.boxlinker.com/boxlinker/newsapi:latest

