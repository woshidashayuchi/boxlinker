# boxlinker-git

## 构建镜像， 名称为 `index.boxlinker.com/boxlinker/boxlinker-git:v2`
    make container

## 推送镜像
    make

## 本地运行, 默认绑定到 `3000` 端口, 如需修改请更改 Makefile 中的 `LOCAL_PORT` 环境变量
    make test
