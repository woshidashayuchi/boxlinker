#!/bin/sh

set -e



while [[ 1 > 0 ]]; do

	echo 111 >> a.txt
        python /PythonTools/authServer/code_build/server.py >> /ser.log
	sleep 1
	#statements
done
