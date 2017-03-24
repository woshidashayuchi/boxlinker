define({ "api": [  {    "type": "get",    "url": "/api/v1.0/logs/labels/<label_value>?service_uuid=<service_uuid>?date_time=<epoch_seconds>&start_time=<epoch_milliseconds>&end_time=<epoch_milliseconds>",    "title": "1.1 根据label查日志",    "name": "Get_log_from_label_value",    "group": "1_log",    "version": "1.0.0",    "description": "<p>通过容器label_value查询日志</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "1_log",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": {\n        \"end_time\": float,\n        \"logs_list\": [\n            {\n                \"file\": \"string\",\n                \"level\": \"string\",\n                \"log_info\": \"string\",\n                \"pod_name\": \"string\",\n                \"log_time\": \"string\",\n                \"time\": \"datetime\"\n            }, \n            {\n                \"file\": \"string\",\n                \"level\": \"string\",\n                \"log_info\": \"string\",\n                \"pod_name\": \"string\",\n                \"log_time\": \"string\",\n                \"time\": \"datetime\"\n            }, \n            {\n                \"file\": \"string\",\n                \"level\": \"string\",\n                \"log_info\": \"string\",\n                \"pod_name\": \"string\",\n                \"log_time\": \"string\",\n                \"time\": \"datetime\"\n            }\n        ]\n    }\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/logs/polling/labels/<label_value>?service_uuid=<service_uuid>?start_time=<epoch_milliseconds>",    "title": "1.2 根据label轮询日志",    "name": "Get_log_polling_from_label_value",    "group": "1_log",    "version": "1.0.0",    "description": "<p>通过容器label_value轮询日志</p>",    "permission": [      {        "name": "user and organization"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "1_log",    "success": {      "examples": [        {          "title": "返回",          "content": "{\n    \"status\": 0,\n    \"msg\": \"OK\",\n    \"result\": {\n        \"end_time\": float,\n        \"logs_list\": [\n            {\n                \"file\": \"string\",\n                \"level\": \"string\",\n                \"log_info\": \"string\",\n                \"pod_name\": \"string\",\n                \"log_time\": \"string\",\n                \"time\": \"datetime\"\n            }, \n            {\n                \"file\": \"string\",\n                \"level\": \"string\",\n                \"log_info\": \"string\",\n                \"pod_name\": \"string\",\n                \"log_time\": \"string\",\n                \"time\": \"datetime\"\n            }, \n            {\n                \"file\": \"string\",\n                \"level\": \"string\",\n                \"log_info\": \"string\",\n                \"pod_name\": \"string\",\n                \"log_time\": \"string\",\n                \"time\": \"datetime\"\n            }\n        ]\n    }\n}",          "type": "json"        }      ]    }  }] });
