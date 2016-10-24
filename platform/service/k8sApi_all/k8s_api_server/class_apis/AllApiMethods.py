#! /usr/bin/ python
# -*- coding:utf8 -*-
# Date: 2016/7/22
# author:王晓峰
import urllib
import requests
import json
import urllib2

class AllApiMethods:

        host_address = 'http://127.0.0.1:8080/api/v1'
        # 以下所有方法:json_list需要增加资源类型(rtype)说明:eg:pods?services?rcs?...要记得末尾的复数s

        @classmethod
        def get_noup_resource(cls, json_list):
                rtype = json_list.pop("rtype")
                params = urllib.urlencode(json_list)
                url = '%s/%s?%s' % (cls.host_address, rtype, params)
                msg = urllib.urlopen(url)
                response = msg.read()

                return response
        @classmethod
        def show_namespace(cls,json_list):
                url = '%s/namespaces/%s' % (cls.host_address,json_list.get('name'))
                response = requests.get(url)
                return response

        @classmethod
        def post_namespace(cls,json_list):
                url = '%s/namespaces' % (cls.host_address)
                print url
                response = requests.post(url,json.dumps(json_list))
                return response

        @classmethod
        def post_secret(cls,json_list):
                names = json_list.pop('namespace')
                url = '%s/namespaces/%s/secrets' % (cls.host_address,names)
                response = requests.post(url,json.dumps(json_list))
                return response

        @classmethod
        def get_namespace_resource(cls, json_list):

                rtype = json_list.pop('rtype')

                if json_list.get('namespace'):

                        namespace = json_list.pop('namespace')
                else:
                        namespace = "default"
                params = urllib.urlencode(json_list)
                url = '%s/namespaces/%s/%s?%s' % (cls.host_address, namespace, rtype, params)
                msg = urllib.urlopen(url)
                response = msg.read()

                return response

        @classmethod
        def get_name_resource(cls, json_list):

                rtype = json_list.pop('rtype')

                if json_list.get('namespace'):

                        namespace = json_list.pop('namespace')

                else:
                        namespace = 'default'
                if json_list.get('name'):
                        name = json_list.pop('name')
                else:
                        sss = '输入资源名,才可以查询具体资源'
                        return sss

                params = urllib.urlencode(json_list)
                url = '%s/namespaces/%s/%s/%s?%s' % (cls.host_address, namespace, rtype, name, params)
                msg = urllib.urlopen(url)
                response = msg.read()

                return response

        @classmethod
        def post_namespace_resource(cls, json_list):
                rtype = json_list.pop('rtype')
                if json_list.get('namespace'):

                        namespace = json_list.pop('namespace')
                else:
                        namespace = 'default'

                url = '%s/namespaces/%s/%s' % (cls.host_address, namespace, rtype)

                the_page = requests.post(url, json.dumps(json_list))
                response = the_page.text

                return response

        @classmethod
        def delete_name_resource(cls, json_list):

                rtype = json_list.pop('rtype')

                if json_list.get('namespace'):

                        namespace = json_list.pop('namespace')
                else:
                        namespace = 'default'
                url = '%s/namespaces/%s/%s/%s' % (cls.host_address, namespace, rtype, json_list.get('name'))
                response = requests.delete(url)

                return response

        @classmethod
        def patch_name_resource(cls, json_list):

                rtype = json_list.pop('rtype')

                if json_list.get('namespace'):
                        namespace = json_list.pop('namespace')
                else:
                        namespace = 'default'
                if json_list.get("name"):
                        name = json_list.pop('name')

                else:
                        m_name = '输入资源名,才可以进行修改'
                        return m_name

                url = '%s/namespaces/%s/%s/%s' % (cls.host_address, namespace, rtype, name)
                the_page = requests.patch(url,data=json.dumps(json_list))
                response = the_page.text

                return response

        @classmethod
        def put_name_resource(cls, json_list):
                # print(json_list)
		rtype = json_list.pop('rtype')
                if json_list.get('namespace'):

                        namespace = json_list.pop('namespace')
                else:
                        namespace = 'default'
                if json_list.get("name"):
                        name = json_list.pop('name')
                else:
                        m_name = '输入资源名,才可以进行修改'
                        return m_name

                url = '%s/namespaces/%s/%s/%s' % (cls.host_address, namespace, rtype, name)
                the_page = requests.put(url,data=json.dumps(json_list))
                return the_page		

        @classmethod
        def post_nohup_resource(cls, json_list):
                global host_address
                rtype = json_list.pop('rtype')
                url = '%s/%s' % (host_address,rtype)
                the_page = requests.post(url, json_list)
                response = the_page.text
                return response

        @classmethod
        def put_pods_status(cls, json_list):
                global host_address
                namespace = json_list.pop('namespace')
                name = json_list.pop('name')
                url = '%s/namespaces/%s/pods/%s/status' % (host_address, namespace, name)
                response = requests.put(url, json_list)
                return response

        @classmethod
        def post_pods_binding(cls, json_list):
                global host_address
                namespace = json_list.pop('namespace')
                name = json_list.pop('name')
                url = '%s/namespaces/%s/pods/%s/binding' % (host_address, namespace, name)
                response = requests.post(url, json_list)
                return response

        @classmethod
        def get_pods_exec(cls, json_list):
                global host_address
                namespace = json_list.pop('namespace')
                name = json_list.pop('name')
                params = urllib.urlencode(json_list)
                url = '%s/namespaces/%s/pods/%s/exec?%s' % (host_address, namespace, name, params)
                response = requests.get(url, json_list)
                return response

        @classmethod
        def post_pods_exec(cls, json_list):
                global host_address
                namespace = json_list.pop('namespace')
                name = json_list.pop('name')
                url = '%s/namespaces/%s/pods/%s/exec' % (host_address, namespace, name)
                response = requests.post(url, json.dumps(json_list))
                return response

        @classmethod
        def get_pods_log(cls, json_list):
                global host_address
                namespace = json_list.pop('namespace')
                name = json_list.pop('name')
                params = urllib.urlencode(json_list)
                url = '%s/namespaces/%s/pods/%s/log?%s' % (host_address, namespace, name, params)
                response = requests.get(url, json_list)
                return response

        @classmethod
        def get_pods_portforward(cls, json_list):
                global host_address
                namespace = json_list.pop('namespace')
                name = json_list.pop('name')
                params = urllib.urlencode(json_list)
                url = '%s/namespaces/%s/pods/%s/portforward?%s' % (host_address, namespace, name, params)
                response = requests.get(url, json_list)
                return response

        @classmethod
        def post_pods_portforward(cls, json_list):
                global host_address
                namespace = json_list.pop('namespace')
                name = json_list.pop('name')
                url = '%s/namespaces/%s/pods/%s/portforward' % (host_address, namespace, name)
                response = requests.post(url, json.dumps(json_list))
                return response

