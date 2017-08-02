
db:
	docker rm -f boxlinker-db-test || true
	docker run -d --name boxlinker-db-test -v `pwd`/db_data:/var/lib/mysql -p 3306:3306 -e MYSQL_DATABASE=boxlinker -e MYSQL_ROOT_PASSWORD=123456 mysql
