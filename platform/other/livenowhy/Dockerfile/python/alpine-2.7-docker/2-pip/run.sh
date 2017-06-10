#!/bin/sh

set -e



while [[ 1 > 0 ]]; do

	nohup python /PythonTools/authServer/run.py >> /log.log
	sleep 1
	#statements
done
