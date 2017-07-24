# Boxlinker 前端静态页

* index.jade 是首页
* 其他静态页,比如 找回密码, 修改密码, 登录, 注册 等 都可以写在这里, 然后在 index.js 的路由里面 直接 `res.render('${name}')` 就可以了