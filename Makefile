
VERSION = latest
DOC_IMAGE_PREFIX = index.boxlinker.com/boxlinker
DOC_IMAGE_NAME = docs

doc:
	apidoc -i platform/ -o docs/ -e node_modules -e vendor
	docker build -t ${DOC_IMAGE_PREFIX}/${DOC_IMAGE_NAME}:${VERSION} -f Dockerfile.docs .
	docker push ${DOC_IMAGE_PREFIX}/${DOC_IMAGE_NAME}:${VERSION}
