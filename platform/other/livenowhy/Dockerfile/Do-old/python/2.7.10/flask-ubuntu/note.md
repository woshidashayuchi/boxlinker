Docker并没有提供一次性删除所有容器的命令，但是可以用下面的命令来实现这个目的：

    docker rm `docker ps -a -q`


    你可以用pip导出你的dependency:
$ pip freeze > requirements.txt
然后在通过以下命令安装dependency:
$ pip install -r requirements.txt

docker login -u boxlinker -p QAZwsx321  192.168.211.153:8081

    {
        u'events': [
        {
            u'target': 
            {
                u'repository': u'libary/liuu/d/nginx', 
                u'url': u'http://192.168.211.153:8081/v2/libary/liuu/d/nginx/manifests/sha256:013f7f8793c0590dba19de5a5e54c62ffb1ab455945c7769831aa23d2cc82a07', 
                u'mediaType': u'application/vnd.docker.distribution.manifest.v2+json', 
                u'length': 2188, 
                u'tag': u'1.9', 
                u'digest': u'sha256:013f7f8793c0590dba19de5a5e54c62ffb1ab455945c7769831aa23d2cc82a07', 
                u'size': 2188
            }, 
            u'timestamp': u'2016-08-26T06:42:55.167737586Z', 
            u'request': 
            {
                u'method': u'PUT', 
                u'host': u'192.168.211.153:8081', 
                u'useragent': u'docker/1.12.0 go/go1.6.3 git-commit/8eab29e kernel/4.4.15-moby os/linux arch/amd64 UpstreamClient(Docker-Client/1.12.0 \\(darwin\\))', 
                u'id': u'0b93eae8-83c5-4a6b-8479-29c038ad0c68', 
                u'addr': u'172.20.0.1'
            }, 
            u'actor': 
            {
                u'name': u'boxlinker'
            }, 
            u'source': {
                u'instanceID': u'f31d73f0-8b47-4305-b528-6edd5b2ee78c', 
                u'addr': u'227cf40e9d0f:5000'
            }, 
            u'action': u'push', 
            u'id': u'904f0723-5875-4f13-b66c-0ba02bf40f33'}
        ]
    }