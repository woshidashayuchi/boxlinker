define({ "api": [  {    "type": "put",    "url": "https://imageauth.boxlinker.com",    "title": "0.1",    "name": "host",    "group": "Global_Setup",    "version": "1.0.0",    "description": "<p>修改镜像详情</p>",    "filename": "imageAuth/api.py",    "groupTitle": "Global_Setup"  },  {    "type": "delete",    "url": "/api/v1.0/imagerepo/image/<string:repoid>",    "title": "1.7 删除镜像",    "name": "delete_image",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>删除镜像</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {},\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/image/<string:repoid>",    "title": "1.6 镜像详情",    "name": "get_image_info",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>镜像详情</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {\n        \"creation_time\": \"2017-02-20 17:32:25\",\n        \"detail\": \"Push the mirror between terminals\",\n        \"download_num\": 1,\n        \"enshrine_num\": 0,\n        \"is_code\": 0,\n        \"is_public\": 0,\n        \"logo\": \"https://boxlinker-images.oss-cn-beijing.aliyuncs.com/repository/default.png\",\n        \"pushed\": 0,\n        \"repository\": \"zhangsan/pause\",\n        \"review_num\": 0,\n        \"short_description\": \"Push the mirror between terminals\",\n        \"tags\": [\n            {\n                \"action\": \"push\",\n                \"actor\": \"liuzhangpei\",\n                \"creation_time\": \"2017-02-20 17:32:21\",\n                \"digest\": \"sha256:f08f3ef4886ad27a80682c1e55ede2dbe8a801c521db07859b829101488f7d83\",\n                \"length\": \"733\",\n                \"repo_id\": \"f78ed339-f5c6-4072-a55d-768960d35a44\",\n                \"tag\": \"2.0\",\n                \"update_time\": \"2017-02-20 17:32:21\",\n                \"url\": \"https://index.boxlinker.com/v2/zhangsan/pause/manifests/sha256:f08f3ef4886ad27a80682c1e55ede2dbe8a801c521db07859b829101488f7d83\"\n            }\n        ],\n        \"update_time\": \"2017-02-20 17:32:25\"\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/publicimage/?imagename=boxlinker/boxlinker-git",    "title": "1.1 镜像名得到id",    "name": "get_image_uuid",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>镜像名得到镜像id</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "imagename",            "description": "<p>镜像名</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\",\n    \"status\": 0\n}\n\n失败\n\n{\n    \"msg\": \"There is no resources\",\n    \"result\": {},\n    \"status\": 701\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/image/<string:repoid>/public_info",    "title": "1.9 镜像详情(公开的镜像详情)",    "name": "image_public_info",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>当个镜像 操作 (系统注册用户都可以调用该接口)</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\":\n    {\n        \"image_uuid': \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\",\n         \"tag\": \"2.0\",\n         \"image_name\": \"zhangsan/pause\"\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/image/tagid/<string:tagid>",    "title": "1.10 通过tagid得到镜像名和tag",    "name": "image_tagid_info",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>通过tagid得到镜像名和tag</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\":\n    {\n        \"image_uuid': \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\",\n         \"tag\": \"2.0\",\n         \"image_name\": \"zhangsan/pause\"\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/ranks",    "title": "1.2 镜像排名",    "name": "mages_ranks",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>镜像排名</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {\n        \"count\": 1,\n        \"current_size\": 1,\n        \"page\": 1,\n        \"page_size\": 2,\n        \"result\": [\n            {\n                \"creation_time\": \"2017-02-20 10:57:15\",\n                \"detail\": \"Push the mirror between terminals\",\n                \"download_num\": 7,\n                \"is_public\": 1,\n                \"logo\": \"https://boxlinker-images.oss-cn-beijing.aliyuncs.com/repository/1487560040234pause.png\",\n                \"repository\": \"zhangsan/pause\",\n                \"short_description\": \"Push the mirror between terminals\",\n                \"type\": 0,\n                \"update_time\": \"2017-02-20 10:57:15\",\n                \"uuid\": \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\"\n            },\n            ... ...\n        ]\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/imagerepo/image/<string:repoid>/detail/<string:detail_type>",    "title": "1.8 修改镜像详情",    "name": "modify_image_info",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>修改镜像详情</p>",    "examples": [      {        "title": "Example usage:",        "content": "data = {\n    \"detail\": \"ubuntu office images\",\n}",        "type": "put"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "repoid",            "description": "<p>镜像id</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "detail",            "description": "<p>详细描述 或 简单描述</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "detail_type",            "description": "<p>short_description:简单介绍, detail:详细描述,</p>"          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {},\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/ownimages/<int:page>/<int:page_size>",    "title": "1.5 我的镜像",    "name": "my_own_image",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>我的镜像</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {\n        \"count\": 1,\n        \"current_size\": 1,\n        \"page\": 1,\n        \"page_size\": 2,\n        \"result\": [\n            {\n                \"creation_time\": \"2017-02-20 10:57:15\",\n                \"detail\": \"Push the mirror between terminals\",\n                \"download_num\": 7,\n                \"is_public\": 1,\n                \"logo\": \"https://boxlinker-images.oss-cn-beijing.aliyuncs.com/repository/1487560040234pause.png\",\n                \"repository\": \"zhangsan/pause\",\n                \"short_description\": \"Push the mirror between terminals\",\n                \"type\": 0,\n                \"update_time\": \"2017-02-20 10:57:15\",\n                \"uuid\": \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\"\n            },\n            ... ...\n        ]\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/ownimages/<int:page>/<int:page_size>/?repo_fuzzy=library%2Fnginx",    "title": "1.6 我的镜像搜索",    "name": "my_own_image_search",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>我的镜像搜索</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "repo_fuzzy",            "description": "<p>搜索参数</p>"          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {\n        \"count\": 1,\n        \"current_size\": 1,\n        \"page\": 1,\n        \"page_size\": 2,\n        \"result\": [\n            {\n                \"creation_time\": \"2017-02-20 10:57:15\",\n                \"detail\": \"Push the mirror between terminals\",\n                \"download_num\": 7,\n                \"is_public\": 1,\n                \"logo\": \"https://boxlinker-images.oss-cn-beijing.aliyuncs.com/repository/1487560040234pause.png\",\n                \"repository\": \"zhangsan/pause\",\n                \"short_description\": \"Push the mirror between terminals\",\n                \"type\": 0,\n                \"update_time\": \"2017-02-20 10:57:15\",\n                \"uuid\": \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\"\n            },\n            ... ...\n        ]\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/publicimages/<int:page>/<int:page_size>",    "title": "1.3 平台镜像",    "name": "public_image",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>平台镜像</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "int",            "optional": false,            "field": "page",            "description": "<p>第几页</p>"          },          {            "group": "Parameter",            "type": "int",            "optional": false,            "field": "page_size",            "description": "<p>每页请求的数据个数</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {\n        \"count\": 1,\n        \"current_size\": 1,\n        \"page\": 1,\n        \"page_size\": 2,\n        \"result\": [\n            {\n                \"creation_time\": \"2017-02-20 10:57:15\",\n                \"detail\": \"Push the mirror between terminals\",\n                \"download_num\": 7,\n                \"is_public\": 1,\n                \"logo\": \"https://boxlinker-images.oss-cn-beijing.aliyuncs.com/repository/1487560040234pause.png\",\n                \"repository\": \"zhangsan/pause\",\n                \"short_description\": \"Push the mirror between terminals\",\n                \"type\": 0,\n                \"update_time\": \"2017-02-20 10:57:15\",\n                \"uuid\": \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\"\n            },\n            ... ...\n        ]\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/imagerepo/publicimages/<int:page>/<int:page_size>/?repo_fuzzy=library%2Fnginx",    "title": "1.4 平台镜像搜索",    "name": "public_image_search",    "group": "ImageRepo",    "version": "1.0.0",    "description": "<p>平台镜像搜索</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "repo_fuzzy",            "description": "<p>搜索参数</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "ImageRepo",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {\n        \"count\": 1,\n        \"current_size\": 1,\n        \"page\": 1,\n        \"page_size\": 2,\n        \"result\": [\n            {\n                \"creation_time\": \"2017-02-20 10:57:15\",\n                \"detail\": \"Push the mirror between terminals\",\n                \"download_num\": 7,\n                \"is_public\": 1,\n                \"logo\": \"https://boxlinker-images.oss-cn-beijing.aliyuncs.com/repository/1487560040234pause.png\",\n                \"repository\": \"zhangsan/pause\",\n                \"short_description\": \"Push the mirror between terminals\",\n                \"type\": 0,\n                \"update_time\": \"2017-02-20 10:57:15\",\n                \"uuid\": \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\"\n            },\n            ... ...\n        ]\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "group": "OauthClient",    "description": "<p>解除用户绑定</p>",    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "delete",    "url": "/api/v1.0/oauthclient/oauth/<string:src_type>",    "title": "2.6 解除用户绑定",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "src_type",            "description": "<p>第三方平台类型; github, coding</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_oauth_api_define.py",    "groupTitle": "OauthClient",    "name": "DeleteApiV10OauthclientOauthStringSrc_type",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\": {},\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "group": "OauthClient",    "description": "<p>认证授权回调(前端页面不需要处理该接口)</p>",    "version": "1.0.0",    "type": "get",    "url": "/api/v1.0/oauthclient/callback/",    "title": "2.2 认证授权回调",    "filename": "imageAuth/restserver/rest_oauth_api_define.py",    "groupTitle": "OauthClient",    "name": "GetApiV10OauthclientCallback"  },  {    "group": "OauthClient",    "description": "<p>用户绑定状态</p>",    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "get",    "url": "/api/v1.0/oauthclient/oauth",    "title": "2.0 获取用户绑定状态",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\":\n    {\n        \"coding\": \"1\",\n        \"github\": \"1\"\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    },    "filename": "imageAuth/restserver/rest_oauth_api_define.py",    "groupTitle": "OauthClient",    "name": "GetApiV10OauthclientOauth"  },  {    "group": "OauthClient",    "description": "<p>获取用户代码对应平台下的代码项目</p>",    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "get",    "url": "/api/v1.0/oauthclient/repos/<string:src_type>",    "title": "2.4 获取用户代码对应平台下的代码项目",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "src_type",            "description": "<p>第三方平台类型; github, coding</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_oauth_api_define.py",    "groupTitle": "OauthClient",    "name": "GetApiV10OauthclientReposStringSrc_type",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\":\n    {\n        \"image_uuid': \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\",\n         \"tag\": \"2.0\",\n         \"image_name\": \"zhangsan/pause\"\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "group": "OauthClient",    "description": "<p>获取用户授权跳转链接</p>",    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "post",    "url": "/api/v1.0/oauthclient/url",    "title": "2.1 获取用户授权跳转链接",    "examples": [      {        "title": "Example usage:",        "content": "{\n    \"src_type\": \"github\",\n    \"redirect_url\": \"http://test.boxlinker.com/building/create\"\n}",        "type": "POST"      }    ],    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "status 为 0 成功,其中result-->msg中即用户需要点击进行授权的地址\n{\n    \"msg\": \"OK\",\n    \"result\":\n    {\n        \"msg\": \"https://github.com/login/oauth/authorize?client_id=44df81c41ee415b7debd&scope=user%20repo&state=eyJleHBpcmVzIjogMTQ3NTgzNzAxNi4wNzg2ODksICJzYWx0IjogIjAuMjQwNjIyOTU2NjgyIiwgInVpZCI6ICIzIn2ag7sMa7sSf6-vmhEMykRL\"\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "src_type",            "description": "<p>第三方平台类型; github, coding</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "redirect_url",            "description": "<p>跳转地址</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_oauth_api_define.py",    "groupTitle": "OauthClient",    "name": "PostApiV10OauthclientUrl"  },  {    "group": "OauthClient",    "description": "<p>授权平台可以对某个项目具有 hooks 权限</p>",    "version": "1.0.0",    "type": "post",    "url": "/api/v2.0/oauths/webhooks/<string:src_type>/<string:repo_name>",    "title": "2.5 设置webhook",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "src_type",            "description": "<p>代码源类型;github or coding</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "repo_name",            "description": "<p>代码项目名</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_oauth_api_define.py",    "groupTitle": "OauthClient",    "name": "PostApiV20OauthsWebhooksStringSrc_typeStringRepo_name"  },  {    "group": "OauthClient",    "version": "1.0.0",    "description": "<p>刷新获取代码项目</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "put",    "url": "/api/v1.0/oauthclient/repos/<string:src_type>",    "title": "2.3 刷新获取代码项目",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "src_type",            "description": "<p>第三方平台类型; github, coding</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_oauth_api_define.py",    "groupTitle": "OauthClient",    "name": "PutApiV10OauthclientReposStringSrc_type",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\":\n    {\n        \"image_uuid': \"4bd1ca3f-1752-33e6-b8d0-b9348a58ced7\",\n         \"tag\": \"2.0\",\n         \"image_name\": \"zhangsan/pause\"\n    },\n    \"status\": 0\n}",          "type": "json"        }      ]    }  },  {    "group": "ResourcesStorage",    "version": "1.0.0",    "description": "<p>获取资源列表</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "get",    "url": "/api/v1.0/files/{resource_type}/{resource_uuid}/{resource_domain}",    "title": "3.4 资源参数中不含team_uuid",    "filename": "imageAuth/ResourcesStorage.py",    "groupTitle": "ResourcesStorage",    "name": "GetApiV10FilesResource_typeResource_uuidResource_domain",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\":\n    [\n        {\n            \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"update_time\": None,\n            \"storage_uuid\": 2,\n            \"resource_uuid\":\n            \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n            \"create_time\": None,\n            \"team_uuid\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"storage_url\": \"sssss\",\n            \"resource_type\": \"UserAvatars'\n        },\n        ...\n    ]\n}",          "type": "json"        }      ]    }  },  {    "group": "ResourcesStorage",    "version": "1.0.0",    "description": "<p>获取资源列表</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "get",    "url": "/api/v1.0/files/{team_uuid}/{resource_type}/{resource_uuid}/{resource_domain}",    "title": "3.3 资源参数中含team_uuid",    "filename": "imageAuth/ResourcesStorage.py",    "groupTitle": "ResourcesStorage",    "name": "GetApiV10FilesTeam_uuidResource_typeResource_uuidResource_domain",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\":\n    [\n        {\n            \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"update_time\": None,\n            \"storage_uuid\": 2,\n            \"resource_uuid\":\n            \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n            \"create_time\": None,\n            \"team_uuid\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"storage_url\": \"sssss\",\n            \"resource_type\": \"UserAvatars'\n        },\n        ...\n    ]\n}",          "type": "json"        }      ]    }  },  {    "group": "ResourcesStorage",    "version": "1.0.0",    "description": "<p>获取资源列表</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "post",    "url": "/api/v1.0/files",    "title": "3.2 查询参数中不含team_uuid",    "examples": [      {        "title": "Example usage:",        "content": "{\n    \"queryparameter\" :\n        [\n            {\n                \"resource_type\": \"UserAvatars\",\n                \"resource_uuid\": \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n                \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\"\n            },\n            {\n                \"resource_type\": \"UserAvatars\",\n                \"resource_uuid\": \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n                \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\"\n            }\n        ]\n}",        "type": "post"      }    ],    "filename": "imageAuth/ResourcesStorage.py",    "groupTitle": "ResourcesStorage",    "name": "PostApiV10Files",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\":\n    [\n        {\n            \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"update_time\": None,\n            \"storage_uuid\": 2,\n            \"resource_uuid\":\n            \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n            \"create_time\": None,\n            \"team_uuid\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"storage_url\": \"sssss\",\n            \"resource_type\": \"UserAvatars'\n        },\n        ...\n    ]\n}",          "type": "json"        }      ]    }  },  {    "group": "ResourcesStorage",    "version": "1.0.0",    "description": "<p>获取一类资源的信息</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "post",    "url": "/api/v1.0/files/team_uuid",    "title": "3.1 查询参数中含有team_uuid",    "examples": [      {        "title": "Example usage:",        "content": "{\n    \"queryparameter\" :\n        [\n            {\n                \"team_uuid\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n                \"resource_type\": \"UserAvatars\",\n                \"resource_uuid\": \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n                \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\"\n            },\n            {\n                \"team_uuid\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n                \"resource_type\": \"UserAvatars\",\n                \"resource_uuid\": \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n                \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\"\n            }\n        ]\n}",        "type": "post"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "team_uuid",            "description": "<p>资源组织uuid</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "resource_type",            "description": "<p>资源类型(Favicon: 头像, ServiceIco: 服务图标)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "resource_uuid",            "description": "<p>资源uuid(对应进行的uuid，服务的uuid，或者用户的组织uuid)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "resource_domain",            "description": "<p>资源域(boxlinker)</p>"          }        ]      }    },    "filename": "imageAuth/ResourcesStorage.py",    "groupTitle": "ResourcesStorage",    "name": "PostApiV10FilesTeam_uuid",    "success": {      "examples": [        {          "title": "返回:",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\":\n    [\n        {\n            \"resource_domain\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"update_time\": None,\n            \"storage_uuid\": 2,\n            \"resource_uuid\":\n            \"cabb719f-4a9a-475f-89f1-717231ae7eb5\",\n            \"create_time\": None,\n            \"team_uuid\": \"39828489-1bf6-334b-acdb-6a15bbd7c5a3s\",\n            \"storage_url\": \"sssss\",\n            \"resource_type\": \"UserAvatars'\n        },\n        ...\n    ]\n}",          "type": "json"        }      ]    }  },  {    "group": "imageServer",    "description": "<p>生成一个图片并获取在oss中的地址</p>",    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>请求接口的token,放在请求头中</p>"          }        ]      }    },    "type": "post",    "url": "/api/v1.0/pictures",    "title": "3.0 生成图片",    "examples": [      {        "title": "Example usage:",        "content": "\n{\n    \"name\": \"rere\"\n}",        "type": "post"      }    ],    "parameter": {      "examples": [        {          "title": "Request-Param-Example:",          "content": "{\n    \"msg\": \"OK\",\n    \"result\":\n    {\n        \"image_dir\": \"repository/1480992116391rere.png\",\n        \"image_url\": \"http://boxlinker-develop.oss-cn-shanghai.aliyuncs.com/repository/1480992116391rere.png\",\n        \"oss_host\": \"http://boxlinker-develop.oss-cn-shanghai.aliyuncs.com\"\n    },\n    \"status\": 0\n}\n成功时,result返回用户推荐镜像列表",          "type": "json"        }      ],      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>需要生成图片的字符</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "image_dir",            "description": "<p>图片在oss的相对路径</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "image_url",            "description": "<p>绝对路径</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "oss_host",            "description": "<p>oss 图片外网访问地址</p>"          }        ]      }    },    "filename": "imageAuth/restserver/rest_image_api_define.py",    "groupTitle": "imageServer",    "name": "PostApiV10Pictures"  }] });
