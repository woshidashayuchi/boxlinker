#!/bin/bash

docker_install()
{
    docker_rpm_check=$(rpm -qa | grep docker | wc -l)
    if [ $docker_rpm_check -eq 0 ]; then
        yum install -y docker
    fi
}

docker_install
