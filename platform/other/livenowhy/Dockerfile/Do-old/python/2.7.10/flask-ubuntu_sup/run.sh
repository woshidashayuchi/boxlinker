#!/bin/sh

while :
do

	echo 111 >> run.log
        python /PythonTools/authServer/run.py  >> run.log
	sleep 1
	#statements
done
