FROM ubuntu:14.04

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y vim && \
    update-alternatives --set editor /usr/bin/vim.basic && \
    apt-get install -y build-essential zlib1g-dev libyaml-dev libssl-dev libgdbm-dev libreadline-dev libncurses5-dev libffi-dev curl openssh-server checkinstall libxml2-dev libxslt-dev libcurl4-openssl-dev libicu-dev logrotate python-docutils pkg-config cmake nodejs && \
    apt-get install libkrb5-dev && \
    apt-get install -y libcurl4-openssl-dev libexpat1-dev gettext libz-dev libssl-dev build-essential && \

RUN cd /tmp && \
    curl --remote-name --progress https://www.kernel.org/pub/software/scm/git/git-2.7.4.tar.gz && \
    echo '7104c4f5d948a75b499a954524cb281fe30c6649d8abe20982936f75ec1f275b  git-2.7.4.tar.gz' | shasum -a256 -c - && \
    tar -xzf git-2.7.4.tar.gz && \
    cd git-2.7.4/ && \
    ./configure && \
    make prefix=/usr/local all && \
    apt-get install --yes postfix && \
    mkdir /tmp/ruby && cd /tmp/ruby && \
    curl --remote-name --progress https://cache.ruby-lang.org/pub/ruby/2.3/ruby-2.3.1.tar.gz && \
    echo 'c39b4001f7acb4e334cb60a0f4df72d434bef711  ruby-2.3.1.tar.gz' | shasum -c - && tar xzf ruby-2.3.1.tar.gz && \
    cd ruby-2.3.1 && \
    ./configure --disable-install-rdoc && \
    make && make install && \
    gem install bundler --no-ri --no-rdoc && \
    mkdir /tmp/golang && cd /tmp/golang && \
    curl --remote-name --progress https://storage.googleapis.com/golang/go1.5.3.linux-amd64.tar.gz && \
    echo '43afe0c5017e502630b1aea4d44b8a7f059bf60d7f29dfd58db454d4e4e0ae53  go1.5.3.linux-amd64.tar.gz' | shasum -a256 -c - && \
    tar -C /usr/local -xzf go1.5.3.linux-amd64.tar.gz && \
    ln -sf /usr/local/go/bin/{go,godoc,gofmt} /usr/local/bin/ && \
    rm go1.5.3.linux-amd64.tar.gz

RUN adduser --disabled-login --gecos 'GitLab' git && \
    cd /home/git && \
    sudo -u git -H git clone https://gitlab.com/gitlab-org/gitlab-ce.git -b 8-13-stable gitlab && \
    cd /home/git/gitlab && \
    sudo -u git -H cp config/gitlab.yml.example config/gitlab.yml && \
    sudo -u git -H cp config/secrets.yml.example config/secrets.yml && \
    sudo -u git -H chmod 0600 config/secrets.yml && \
    sudo chown -R git log/ && \
    sudo chown -R git tmp/ && \
    sudo chmod -R u+rwX,go-w log/ && \
    sudo chmod -R u+rwX tmp/ && \
    sudo chmod -R u+rwX tmp/pids/ && \
    sudo chmod -R u+rwX tmp/sockets/ && \
    sudo -u git -H mkdir public/uploads/ && \
    sudo chmod 0700 public/uploads && \
    sudo chmod -R u+rwX builds/ && \
    sudo chmod -R u+rwX shared/artifacts/ && \
    sudo -u git -H cp config/unicorn.rb.example config/unicorn.rb && \
    sudo -u git -H cp config/initializers/rack_attack.rb.example config/initializers/rack_attack.rb && \
    sudo -u git -H git config --global core.autocrlf input && \
    sudo -u git -H git config --global gc.auto 0 && \
    sudo -u git -H git config --global repack.writeBitmaps true && \
    # edit redis config
    sudo -u git -H cp config/resque.yml.example config/resque.yml && \