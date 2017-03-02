define({ "api": [  {    "type": "get",    "url": "/api/v1.0/model/pods/<pod_name>/metrics/<rtype>",    "title": "1.1 监控信息",    "name": "monitor_message",    "group": "1_details",    "version": "1.0.0",    "description": "<p>监控信息</p>",    "permission": [      {        "name": "all"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "1_details",    "success": {      "examples": [        {          "title": "返回",          "content": "{\"status\": 0,\n \"msg\": \"OK\",\n \"result\":[{\"name\": \"cpu/limit\",\n          \"value\": [[1488452400000, null], [1488452460000, 0], [1488452520000, 0],\n                    [1488452580000, 0], [1488452640000, 0], [1488452700000, 0],\n                    [1488452760000, 0], [1488452820000, 0], [1488452880000, 0],\n                    [1488452940000, 0], [1488453000000, 0], [1488453060000, 0],\n                    [1488453120000, 0], [1488453180000, 0], [1488453240000, 0],\n                    [1488453300000, 0]]},\n         {\"name\": \"cpu/limit\",\n          \"value\": [[1488452400000, null], [1488452460000, 0],\n                   [1488452520000, 0], [1488452580000, 0],\n                   [1488452640000, 0], [1488452700000, 0],\n                   [1488452760000, 0], [1488452820000, 0],\n                   [1488452880000, 0], [1488452940000, 0],\n                   [1488453000000, 0], [1488453060000, 0],\n                   [1488453120000, 0], [1488453180000, 0],\n                   [1488453240000, 0], [1488453300000, 0]]},\n        {\"name\": \"cpu/request\",\n         \"value\": [[1488452400000, null], [1488452460000, 0],\n                  [1488452520000, 0], [1488452580000, 0],\n                  [1488452640000, 0], [1488452700000, 0],\n                  [1488452760000, 0], [1488452820000, 0],\n                  [1488452880000, 0], [1488452940000, 0],\n                  [1488453000000, 0], [1488453060000, 0],\n                  [1488453120000, 0], [1488453180000, 0],\n                  [1488453240000, 0], [1488453300000, 0]]}\n        ]\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/v1.0/broad",    "title": "1.2 控制台监控信息",    "name": "monitor_message",    "group": "2_broad",    "version": "1.0.0",    "description": "<p>控制台监控信息</p>",    "permission": [      {        "name": "all"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "json",            "optional": false,            "field": "header",            "description": "<p>{&quot;token&quot;: &quot;string&quot;}</p>"          }        ]      }    },    "filename": "build/apidoc.py",    "groupTitle": "2_broad",    "success": {      "examples": [        {          "title": "返回",          "content": "{\"status\": 0,\n \"msg\": \"OK\",\n \"result\": {\"cpu_usage\": [[1488452640000, null], [1488452700000, 0.0], [1488452760000, 0.0],\n                         [1488452820000, 0.0], [1488452880000, 0.0], [1488452940000, 0.0],\n                         [1488453000000, 0.0], [1488453060000, 0.0], [1488453120000, 0.0],\n                         [1488453180000, 0.0], [1488453240000, 0.0], [1488453300000, 0.0],\n                         [1488453360000, 0.0], [1488453420000, 0.0], [1488453480000, 0.0],\n                         [1488453540000, 0.0]],\n            \"memory_usage\": [[1488452640000, null], [1488452700000, 38293504.0], [1488452760000, 38293504.0],\n                            [1488452820000, 38293504.0], [1488452880000, 38293504.0], [1488452940000, 38293504.0],\n                            [1488453000000, 38293504.0], [1488453060000, 38293504.0], [1488453120000, 38293504.0],\n                            [1488453180000, 38293504.0], [1488453240000, 38293504.0], [1488453300000, 38293504.0],\n                            [1488453360000, 38293504.0], [1488453420000, 38293504.0], [1488453480000, 38293504.0],\n                            [1488453540000, 38293504.0]]\n            }\n}",          "type": "json"        }      ]    }  }] });
