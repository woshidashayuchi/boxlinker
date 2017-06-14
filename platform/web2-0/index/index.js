
var express = require('express')
var path = require('path')
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fetch = require('isomorphic-fetch');

var port = process.env.PORT || 3002;
var TOKEN_AUTH_URL = process.env.TOKEN_AUTH_URL || "https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens";

app.set('views', './views')
app.set('view engine', 'jade')

app.use('/statics',express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * 这里通过环境变量来确认是开发还是生产环境,用来确认页面中使用的 url
 * 默认是开发环境, 想要使用生产环境需要在启动的时候添加环境变量,例如:
 *
 * $ NODE_ENV=production node index.js
 *
 * */
var ENV_DEV = process.env.NODE_ENV != 'production';
console.log('NODE_ENV = %s', process.env.NODE_ENV);
var _url = {
    login: ENV_DEV?'http://localhost:3002/login':'https://boxlinker.com/login',
    signUp: ENV_DEV?'http://localhost:3002/signUp':'https://boxlinker.com/signUp',
    console: ENV_DEV?'http://localhost:3001':'https://console.boxlinker.com'
};
app.get('/', function (req, res, next) {
    var uData = null;
    var token = req.cookies["_at"];
    console.log(token,"token>>>");
    if (!token) {
        res.render('index',{
            user: uData,
            url: _url,
            title: "首页-boxlinker.com"
        })
    } else {
        fetchUserData(token).then(function(result){
            if (!result) res.clearCookie('_at', { path: '/' })
            res.render('index', {user: result, url: _url})
        });
    }
});
app.get('/login', function (req, res, next) {
    res.render("login",{
        url: _url,
        title: "登录-boxlinker.com"
    });
});
app.get('/signUp', function (req, res, next) {
    res.render("signUp",{
        url: _url,
        title: "注册-boxlinker.com"
    });
});
app.get('/forgetPw', function (req, res, next) {
    res.render("forgetPw",{
        url: _url,
        title: "忘记密码-boxlinker.com"
    });
});
app.get('/changepwd', function (req, res, next) {
    res.render("changePw",{
        url: _url,
        title: "重置密码-boxlinker.com"
    });
});
app.get('/user_activate/status', function (req, res, next) {
  res.render("activation",{
    url: _url,
    title: "账户激活-boxlinker.com"
  });
});

var fetchUserData = function (token) {
  console.log(TOKEN_AUTH_URL,token)
    return fetch(TOKEN_AUTH_URL,{
        method:'GET',
        headers:{
            token: token
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        if (json.status == 0){
            return json.result
        }else {
            console.error('fetch user info error',json)
            return null
        }
    })
    .catch(e => {
        console.error('fetch user info failed ',e)
        return null
    })
}

app.listen(port, function () {
    console.log(`The server is running at http://localhost:${port}/`);
});


