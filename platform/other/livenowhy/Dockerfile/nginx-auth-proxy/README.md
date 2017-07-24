# Nginx authentication proxy, works with private docker registry #

(forked from https://github.com/opendns/nginx-auth-proxy for nginx env, but totally changed for this)

Try to run nginx docker container in front of registry container

Mostly it follows the blog [Building private Docker registry with basic authentication](
https://medium.com/@deeeet/building-private-docker-registry-with-basic-authentication-with-self-signed-certificate-using-it-e6329085e612)

`nginx`'s configuration comes from https://github.com/docker/docker-registry/tree/master/contrib/nginx

!!! All the certifications inside are generated for demo purpose inside. !!!

It works successfully under boot2docker windows environment.

You need to append `index1.boxlinker.com` (testing domain name) in  `/etc/hosts`'s `localhost`

    127.0.0.1 boot2docker localhost localhost.local index1.boxlinker.com
	
Download and add [ca.pem](https://github.com/larrycai/nginx-auth-proxy/blob/master/) into your ca trust list.

    $ sudo cat ca.pem >> /etc/ssl/certs/ca-certificates.crt
    $ sudo /etc/init.d/docker restart

Then you can start two docker containers to try
	
```
docker run -d --name registry -p 5000:5000 registry
docker run -d --hostname index1.boxlinker.com --name nginx --link registry:registry -p 443:443 larrycai/nginx-auth-proxy
```	
	
# verify #

open browser to access https://192.168.59.103 , it shall show the nginx https works fine.

Now verify the https basic auth is ok

	curl -i -k https://larrycai:passwd@index1.boxlinker.com
	
Then we see `docker push` is ok

    docker login -u larrycai -p passwd -e "test@gmail.com" index1.boxlinker.com
	docker tag ubuntu dock.co/ubuntu
	docker push dock.co/ubuntu


