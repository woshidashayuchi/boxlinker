#### 使用方法

## 设置环境变量

#### 阿里云oss设置

  `ACCESSKEYID` : AccessKeyId oss key id
  
  `ACCESSKEYSECRET` : AccessKeySecret 
  
  `HOSTOUTER` : 外网访问地址(如: https://s.hvish.com )
  
  `CALLBACKURL`: oss 回调地址(如: http://101.201.31.58:8765/callback)
   CALLBACKURL 设置为当前服务的 host + callback,
   如果该镜像服务启动之后服务地址为 https://oss-auth.hvish.com , 
   那么该值设置为 https://oss-auth.hvish.com/callback
  
  `EXPIRETIME`:统一设置为 60 (已经默认设置, 不建议再次设置)
  
  `CHECKTOKEN` : token 验证接口(如果不设置,就表示不做token验证)
  
  `UPLOADDIR` : 文件上传oss的文件路径(如, user-dir/ 后面加上文件路径分隔符 / )
  
  
#### token 认证接口返回格式

    http get 请求token验证接口, token 放在 Header 中: 伪代码如下:
   
    url = CHECKTOKEN
    headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
    'token': "f1d057d2-171c-f996-832c-8d13a68188a5"
    }
    
    response = requests.request("GET", url, headers=headers)

  token 验证接口返回 json 数据，如下:
  
    {
        "status": code,
        "msg": "msg",
        "result": ret
    }
    
    其中, status 为 0 时表示验证成功, 其他值表示验证失败(code 需要为 int)
    
    



    hvish:
    ACCESSKEYID: ucuoqGoHqHbu4Kx1
    ACCESSKEYSECRET: Ql1QIPtZtNzMOxY768nQJkRuPEI6h0
    CALLBACKURL: http://allreach-oss-auth.lb1.boxlinker.com/callback
    CHECKTOKEN: http://allreach-hvish-api.lb1.boxlinker.com/v1/account/token
    EXPIRETIME: 60
    HOSTOUTER: https://s.hvish.com
    UPLOADDIR: user-dir/
		