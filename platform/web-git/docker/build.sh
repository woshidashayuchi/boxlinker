#!/bin/sh
set -x
set -e

# Build boxlinker-git
mkdir -p ${GOPATH}/src/github.com/cabernety/
ln -s /app/boxlinker-git/ ${GOPATH}/src/github.com/cabernety/boxlinker-git
cd ${GOPATH}/src/github.com/cabernety/boxlinker-git
#glide install
make build TAGS="sqlite cert pam"

# Cleanup GOPATH & vendoring dir
rm -r $GOPATH /app/boxlinker-git/vendor

# Remove build deps
apk --no-progress del build-deps

# Create git user for Boxlinker git
adduser -H -D -g 'Boxlinker Git User' git -h /data/git -s /bin/bash && passwd -u git
echo "export BLG_CUSTOM=${BLG_CUSTOM}" >> /etc/profile
