define({ "api": [  {    "type": "post",    "url": "/api/v1.0/application/services",    "title": "1.1 创建服务",    "name": "service_create",    "group": "1_create",    "version": "1.0.0",    "description": "<p>服务创建</p>",    "permission": [      {        "name": "all"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n     \"service_name\":\"aaa\"\n     \"image_id\":int,\n     \"policy\":1,\n     \"pods_num\":1,\n     \"containerNum\":1,\n     \"isUpdate\":1,\n     \"auto_startup\":1,\n     \"command\":\"\",\n     \"container_cpu\":1,\n     \"container_memory\":\"50M\",\n     \"container\":[{\"container_port\":3000,\n                   \"protocol\":\"TCP\",\n                   \"access_mode\":\"HTTP\",\n                   \"access_scope\":\"outsisde\"},\n                  {\"container_port\":2000,\n                   \"protocol\":\"TCP\",\n                   \"access_mode\":\"TCP\",\n                   \"access_scope\":\"outsisde\"}],\n     \"env\":[{\"env_key\":\"aaa\",\n             \"env_value\":\"bbb\"},\n            {\"env_key\":\"ccc\",\n             \"env_value\":\"ddd\"}],\n     \"volume\":[{\"volume_uuid\":\"d54470f6-e3d2-4fbb-8d17-34f321311522\",\n                \"readonly\":\"True\",\n                \"disk_path\":\"/data\"}]\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "1_create",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service is creating\"\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/application/services/<service_uuid>",    "title": "2.3 服务详情",    "name": "service_details",    "group": "2_query",    "version": "1.0.0",    "description": "<p>服务详情</p>",    "permission": [      {        "name": "project"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "2_query",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": {\"container\": [{\"protocol\": \"TCP\",\n                              \"uuid\": \"2a319d97-d1e0-47de-8a45-5cfb113481f5\",\n                              \"rc_uuid\": \"ff1bcfb5-ca13-44e0-9630-d70bef4739e6\",\n                              \"http_domain\": \"None\",\n                              \"tcp_port\": \"30000\",\n                              \"access_scope\": \"outsisde\",\n                              \"container_port\": 2000,\n                              \"identify\": null,\n                              \"tcp_domain\": \"lb1.boxlinker.com:30000\",\n                              \"private_domain\": null,\n                              \"access_mode\": \"TCP\"},\n                             {\"protocol\": \"TCP\",\n                              \"uuid\": \"708b0b7a-9961-46ea-88dd-e3a8148f0492\",\n                              \"rc_uuid\": \"ff1bcfb5-ca13-44e0-9630-d70bef4739e6\",\n                              \"http_domain\": \"wangxiaofeng-newaaa.lb1.boxlinker.com\",\n                              \"tcp_port\": \"None\",\n                              \"access_scope\": \"outsisde\",\n                              \"container_port\": 3000,\n                              \"identify\": null,\n                              \"tcp_domain\": \"None\",\n                              \"private_domain\": null,\n                              \"access_mode\": \"HTTP\"}],\n             \"env\": [{\"env_key\": \"aaa\",\n                      \"env_value\": \"bbb\",\n                      \"rc_uuid\": \"ff1bcfb5-ca13-44e0-9630-d70bef4739e6\",\n                      \"uuid\": \"07fc92f5-171a-48d1-8688-c2df3b8fa8e7\"},\n                     {\"env_key\": \"ccc\",\n                      \"env_value\": \"ddd\",\n                      \"rc_uuid\": \"ff1bcfb5-ca13-44e0-9630-d70bef4739e6\",\n                      \"uuid\": \"4ea8f78f-d234-4e99-b818-75e71f5d7db6\"}],\n             \"volume\": [{\"readonly\": \"True\",\n                         \"volume_uuid\": \"d54470f6-e3d2-4fbb-8d17-34f321311522\",\n                         \"uuid\": \"124970e5-2869-4fee-a3c6-6d6c078d7883\",\n                         \"disk_path\": \"/data\",\n                         \"rc_uuid\": \"ff1bcfb5-ca13-44e0-9630-d70bef4739e6\"}],\n             \"image_id\": \"1359447b-3327-3a69-bec0-cdf7d4f6c6df\",\n             \"ltime\": \"6\\u5206\\u949f\\u524d\",\n             \"command\": \"\",\n             \"pods_num\": 1,\n             \"policy\": 1,\n             \"container_memory\": \"50M\",\n             \"isUpdate\": 1,\n             \"auto_startup\": 1,\n             \"uuid\": \"ff1bcfb5-ca13-44e0-9630-d70bef4739e6\",\n             \"service_uuid\": \"3266a136-c956-4860-81c4-4e1d9720f9a2\",\n             \"container_cpu\": \"1\",\n             \"labels_name\": \"newaaa\"\n             }\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/application/services?service_name=<service_name>",    "title": "2.2 服务列表模糊查询",    "name": "service_list",    "group": "2_query",    "version": "1.0.0",    "description": "<p>服务列表模糊查询</p>",    "permission": [      {        "name": "all"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "2_query",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": [{\"service_name\": \"aaa\",\n                \"ltime\": \"56秒前\",\n                \"container\":\n                    [{\"http_domain\": \"None\",\n                      \"tcp_domain\": \"lb1.boxlinker.com:30000\",\n                      \"container_port\": 2000},\n                      {\"http_domain\": \"wangxiaofeng-newaaa.lb1.boxlinker.com\",\n                       \"tcp_domain\": \"None\", \"container_port\": 3000}],\n                \"image_dir\": \"None\",\n                \"service_status\": null},\n\n                {\"service_name\": \"bbb\",\n                \"ltime\": \"58秒前\",\n                \"container\":\n                    [{\"http_domain\": \"None\",\n                      \"tcp_domain\": \"lb1.boxlinker.com:30000\",\n                      \"container_port\": 2000},\n                      {\"http_domain\": \"wangxiaofeng-newaaa.lb1.boxlinker.com\",\n                       \"tcp_domain\": \"None\", \"container_port\": 3000}],\n                \"image_dir\": \"None\",\n                \"service_status\": null}]\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/application/services",    "title": "2.1 服务列表",    "name": "service_list",    "group": "2_query",    "version": "1.0.0",    "description": "<p>服务列表</p>",    "permission": [      {        "name": "all"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "2_query",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": [{\"service_name\": \"aaa\",\n                \"ltime\": \"56秒前\",\n                \"container\":\n                    [{\"http_domain\": \"None\",\n                      \"tcp_domain\": \"lb1.boxlinker.com:30000\",\n                      \"container_port\": 2000},\n                      {\"http_domain\": \"wangxiaofeng-newaaa.lb1.boxlinker.com\",\n                       \"tcp_domain\": \"None\", \"container_port\": 3000}],\n                \"image_dir\": \"None\",\n                \"service_status\": null},\n\n                {\"service_name\": \"bbb\",\n                \"ltime\": \"58秒前\",\n                \"container\":\n                    [{\"http_domain\": \"None\",\n                      \"tcp_domain\": \"lb1.boxlinker.com:30000\",\n                      \"container_port\": 2000},\n                      {\"http_domain\": \"wangxiaofeng-newaaa.lb1.boxlinker.com\",\n                       \"tcp_domain\": \"None\", \"container_port\": 3000}],\n                \"image_dir\": \"None\",\n                \"service_status\": null}]\n}",          "type": "json"        }      ]    }  },  {    "type": "delete",    "url": "/api/v1.0/application/services/<service_uuid>",    "title": "3.1 删除服务",    "name": "service_delete",    "group": "3_delete",    "version": "1.0.0",    "description": "<p>删除服务</p>",    "permission": [      {        "name": "project"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "3_delete",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service deleted successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=command",    "title": "4.6 服务启动命令",    "name": "command_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新服务的启动命令</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"command\":\"string\"\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=container",    "title": "4.1 pod容器更新",    "name": "container_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新pod内容器相关信息</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"container\":[\n        {\"container_port\":3000,\n         \"protocol\":\"TCP\",\n         \"access_mode\":\"HTTP\",\n         \"access_scope\":\"outsisde\"},\n        {\"container_port\":2000,\n         \"protocol\":\"TCP\",\n         \"access_mode\":\"TCP\",\n         \"access_scope\":\"outsisde\"}\n    ]\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=domain",    "title": "4.7 服务启动命令",    "name": "domain_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新服务的域名</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"domain\":\"string\"\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=env",    "title": "4.2 环境变量更新",    "name": "env_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新服务的环境变量</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"env\":[\n        {\"env_key\":\"string\",\n         \"env_value\":\"string\"},\n        {\"env_key\":\"string\",\n         \"env_value\":\"string\"}\n    ]\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=publish",    "title": "4.8 服务发布更新",    "name": "status_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新服务是否自动发布</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"policy\":1\n}\n与\n{\n    \"policy\":0,\n    \"image_id\":int\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=status",    "title": "4.4 服务状态更新",    "name": "status_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新服务的状态</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"data\":\"waiting\"\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=telescopic",    "title": "4.5 服务伸缩",    "name": "telescopic_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新服务的pod数量</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"pods_num\":int\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/services/<service_uuid>?rtype=volume",    "title": "4.3 存储卷更新",    "name": "volume_update",    "group": "4_update",    "version": "1.0.0",    "description": "<p>更新服务的存储卷</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "{\n    \"volume\":[\n        {\"volume_uuid\":\"string\",\n         \"disk_path\":\"string\",\n         \"readonly\":\"True/False\"},\n        {\"volume_uuid\":\"string\",\n         \"disk_path\":\"string\",\n         \"readonly\":\"True/False\"}\n    ]\n}",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "4_update",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": \"service update successfully\"\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "api/v1.0/application/services/<service_uuid>?pod=pod",    "title": "5.1 查询服务的pod信息",    "name": "pods_read",    "group": "5_read_pods",    "version": "1.0.0",    "description": "<p>pods信息查询</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "5_read_pods",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\":[{\"pod_phase\": \"Pending\",\n               \"pod_ip\": \"172.16.77.12\",\n               \"pod_name\": \"newxxx-h0jn6\",\n               \"containers\": [{\"access_mode\": \"TCP\",\n                               \"protocol\": \"TCP\",\n                               \"container_port\": 2000},\n                              {\"access_mode\": \"HTTP\",\n                               \"protocol\": \"TCP\",\n                               \"container_port\": 3000}]}]\n}",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/api/v1.0/application/certifies",    "title": "6.1 https服务上传证书",    "name": "certify_create",    "group": "6_certify",    "version": "1.0.0",    "description": "<p>上传证书创建secret</p>",    "permission": [      {        "name": "all"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "\"<..............>,tls_key:<..............>\"",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "6_certify",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": {'resource_uuid': certify_uuid}\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/application/certifies",    "title": "6.2 查询服务的pod信息",    "name": "certify_read",    "group": "6_read_certify",    "version": "1.0.0",    "description": "<p>证书查询</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "6_read_certify",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": {\"certify_uuid\": certify_uuid, \"certify\": content}\n}",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/api/v1.0/application/certifies/<certify_uuid>",    "title": "6.3 更新证书",    "name": "certify_update",    "group": "6_update_certify",    "version": "1.0.0",    "description": "<p>更新证书</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "body",            "description": ""          }        ]      },      "examples": [        {          "title": "body",          "content": "\"<..............>,tls_key:<..............>\"",          "type": "json"        }      ]    },    "filename": "build/apidoc.py",    "groupTitle": "6_update_certify",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": {'resource_name': 'certify-https'}\n}",          "type": "json"        }      ]    }  }] });
