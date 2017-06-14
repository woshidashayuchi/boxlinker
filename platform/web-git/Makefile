LDFLAGS += -X "github.com/cabernety/boxlinker-git/modules/setting.BuildTime=$(shell date -u '+%Y-%m-%d %I:%M:%S %Z')"
LDFLAGS += -X "github.com/cabernety/boxlinker-git/modules/setting.BuildGitHash=$(shell git rev-parse HEAD)"

DATA_FILES := $(shell find conf | sed 's/ /\\ /g')
LESS_FILES := $(wildcard public/less/gogs.less public/less/_*.less)
GENERATED  := modules/bindata/bindata.go public/css/gogs.css

OS := $(shell uname)

TAGS = ""
BUILD_FLAGS = "-v"

RELEASE_ROOT = "release"
RELEASE_GOGS = "release/gogs"
NOW = $(shell date -u '+%Y%m%d%I%M%S')
GOVET = go tool vet -composites=false -methods=false -structtags=false
IMAGE_PREFIX = index.boxlinker.com/boxlinker
IMAGE_NAME = boxlinker-git
IMAGE_TAG = v2

# 本地运行绑定，端口
LOCAL_PORT = 3010

.PHONY: build pack release bindata clean

.IGNORE: public/css/gogs.css

all: push

check: test

dist: release

govet:
	$(GOVET) gogs.go
	$(GOVET) models modules routers

push: container
	docker push $(IMAGE_PREFIX)/$(IMAGE_NAME):$(IMAGE_TAG)

container: build
	docker build -t $(IMAGE_PREFIX)/$(IMAGE_NAME):$(IMAGE_TAG) .

container_base:
	docker build -t $(IMAGE_PREFIX)/$(IMAGE_NAME):$(IMAGE_TAG) -f Dockerfile.base .

mysql:
	docker rm -f boxlinker-git-db || true
	docker run -d -p 3306:3306 -v `pwd`/db_data:/var/lib/mysql --name boxlinker-git-db -e MYSQL_DATABASE=boxlinker-git -e USER=zhangsai -e MYSQL_ROOT_PASSWORD=boxlinkergitdb index.boxlinker.com/library/mysql

test:
	docker run -it -p $(LOCAL_PORT):3000 -e PASSWD=boxlinkergitdb -e INSTALL_LOCK=true -e MYSQLNAME=boxlinker-git -e MYSQLUSER=root -e MYSQLHOST=192.168.31.124:3306 -v `pwd`/blg-repositories:/data/git/blg-repositories $(IMAGE_PREFIX)/$(IMAGE_NAME):$(IMAGE_TAG)

build: $(GENERATED)
	go install $(BUILD_FLAGS) -ldflags '$(LDFLAGS)' -tags '$(TAGS)'
	#cp /tmp/go/bin/boxlinker-git .
	cp '$(GOPATH)/bin/boxlinker-git' .

build-dev: $(GENERATED) govet
	go install $(BUILD_FLAGS) -tags '$(TAGS)'
	cp '$(GOPATH)/bin/gogs' .

build-dev-race: $(GENERATED) govet
	go install $(BUILD_FLAGS) -race -tags '$(TAGS)'
	cp '$(GOPATH)/bin/gogs' .

pack:
	rm -rf $(RELEASE_GOGS)
	mkdir -p $(RELEASE_GOGS)
	cp -r gogs LICENSE README.md README_ZH.md templates public scripts $(RELEASE_GOGS)
	rm -rf $(RELEASE_GOGS)/public/config.codekit $(RELEASE_GOGS)/public/less
	cd $(RELEASE_ROOT) && zip -r gogs.$(NOW).zip "gogs"

release: build pack

bindata: modules/bindata/bindata.go

modules/bindata/bindata.go: $(DATA_FILES)
	go-bindata -o=$@ -ignore="\\.DS_Store|README.md|TRANSLATORS" -pkg=bindata conf/...

less: public/css/gogs.css

public/css/gogs.css: $(LESS_FILES)
	lessc $< $@

clean:
	go clean -i ./...

clean-mac: clean
	find . -name ".DS_Store" -print0 | xargs -0 rm

#test:
#	go test -cover -race ./...

fixme:
	grep -rnw "FIXME" cmd routers models modules

todo:
	grep -rnw "TODO" cmd routers models modules

# Legacy code should be remove by the time of release
legacy:
	grep -rnw "LEGACY" cmd routers models modules
