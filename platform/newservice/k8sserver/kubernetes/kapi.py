#! /usr/bin/ python
# -*- coding:utf8 -*-
# Date: 2016/7/22
# author:王晓峰
import urllib
import requests
import json
import urllib2
import os


class KApiMethods(object):

    def __init__(self):
        '''
        with open(os.environ.get('TOKEN_PATH'), 'r') as f:
            token = f.read()
        auth_info = 'Bearer %s' % token
        '''
        self.HEADERS = {'Authorization': 'sss'}
        self.host_address = 'https://kubernetes.default.svc:443/api/v1'

    def test(self, context):
        return 'hello gold,this is a test, please let me go!!!'

    def get_account(self, json_list):
        account_name = json_list.get('name')
        namespace = json_list.get('namespace1')
        url = '%s/namespaces/%s/serviceaccounts/%s' % (self.host_address, namespace, account_name)
        msg = urllib2.Request(url, headers=self.HEADERS)
        res = urllib2.urlopen(msg)
        return res.read()

    def get_noup_resource(self, json_list):
        rtype = json_list.pop('rtype')
        params = urllib.urlencode(json_list)
        url = '%s/%s?%s' % (self.host_address, rtype, params)
        msg = urllib2.Request(url, headers=self.HEADERS)
        res = urllib2.urlopen(msg)

        response = res.read()

        return response

    def show_namespace(self, json_list):
        url = '%s/namespaces/%s' % (self.host_address, json_list.get('name'))
        response = requests.get(url, headers=self.HEADERS, verify=False)
        return response.text

    def post_namespace(self, json_list):
        url = '%s/namespaces' % self.host_address
        print url
        response = requests.post(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        return response

    def post_secret(self, json_list):
        names = json_list.pop('namespace')
        url = '%s/namespaces/%s/secrets' % (self.host_address, names)
        response = requests.post(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        return response

    def get_namespace_resource(self, json_list):

        rtype = json_list.pop('rtype')

        if json_list.get('namespace'):

            namespace = json_list.pop('namespace')
        else:
            namespace = 'default'
        params = urllib.urlencode(json_list)
        url = '%s/namespaces/%s/%s?%s' % (self.host_address, namespace, rtype, params)

        msg = urllib2.Request(url, headers=self.HEADERS)
        res = urllib2.urlopen(msg)
        response = res.read()

        return response

    def get_name_resource(self, json_list):

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
        url = '%s/namespaces/%s/%s/%s?%s' % (self.host_address, namespace, rtype, name, params)
        msg = urllib2.Request(url, headers=self.HEADERS)
        res = urllib2.urlopen(msg)
        response = res.read()

        return response

    def post_namespace_resource(self, json_list):
        rtype = json_list.pop('rtype')
        if json_list.get('namespace'):

            namespace = json_list.pop('namespace')
        else:
            namespace = 'default'

        url = '%s/namespaces/%s/%s' % (self.host_address, namespace, rtype)

        the_page = requests.post(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        response = the_page.text

        return response

    def delete_name_resource(self, json_list):

        rtype = json_list.pop('rtype')

        if json_list.get('namespace'):

            namespace = json_list.pop('namespace')
        else:
            namespace = 'default'
        url = '%s/namespaces/%s/%s/%s' % (self.host_address, namespace, rtype, json_list.get('name'))
        response = requests.delete(url, headers=self.HEADERS, verify=False)

        return response

    def patch_name_resource(self, json_list):

        rtype = json_list.pop('rtype')

        if json_list.get('namespace'):
            namespace = json_list.pop('namespace')
        else:
            namespace = 'default'
        if json_list.get('name'):
            name = json_list.pop('name')

        else:
            m_name = '输入资源名,才可以进行修改'
            return m_name

        url = '%s/namespaces/%s/%s/%s' % (self.host_address, namespace, rtype, name)
        the_page = requests.patch(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        response = the_page.text

        return response

    def put_name_resource(self, json_list):
        rtype = json_list.pop('rtype')
        if json_list.get('namespace'):
            namespace = json_list.pop('namespace')
        else:
            namespace = 'default'
        if json_list.get('name'):
            name = json_list.pop('name')
        else:
            m_name = '输入资源名,才可以进行修改'
            return m_name

        url = '%s/namespaces/%s/%s/%s' % (self.host_address, namespace, rtype, name)
        the_page = requests.put(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        return the_page

    def post_nohup_resource(self, json_list):
        global host_address
        rtype = json_list.pop('rtype')
        url = '%s/%s' % (host_address, rtype)
        the_page = requests.post(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        response = the_page.text
        return response

    def put_pods_status(self, json_list):
        global host_address
        namespace = json_list.pop('namespace')
        name = json_list.pop('name')
        url = '%s/namespaces/%s/pods/%s/status' % (host_address, namespace, name)
        response = requests.put(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        return response

    def post_pods_binding(self, json_list):
        global host_address
        namespace = json_list.pop('namespace')
        name = json_list.pop('name')
        url = '%s/namespaces/%s/pods/%s/binding' % (host_address, namespace, name)
        response = requests.post(url, data=json.dumps(json_list), headers=self.HEADERS, verify=False)
        return response

    def get_pods_exec(self, json_list):
        global host_address
        namespace = json_list.pop('namespace')
        name = json_list.pop('name')
        params = urllib.urlencode(json_list)
        url = '%s/namespaces/%s/pods/%s/exec?%s' % (host_address, namespace, name, params)
        response = requests.get(url, json_list)
        return response

    def post_pods_exec(self, json_list):
        global host_address
        namespace = json_list.pop('namespace')
        name = json_list.pop('name')
        url = '%s/namespaces/%s/pods/%s/exec' % (host_address, namespace, name)
        response = requests.post(url, json.dumps(json_list))
        return response

    def get_pods_log(self, json_list):
        global host_address
        namespace = json_list.pop('namespace')
        name = json_list.pop('name')
        params = urllib.urlencode(json_list)
        url = '%s/namespaces/%s/pods/%s/log?%s' % (host_address, namespace, name, params)
        response = requests.get(url, json_list)
        return response

    def get_pods_portforward(self, json_list):
        global host_address
        namespace = json_list.pop('namespace')
        name = json_list.pop('name')
        params = urllib.urlencode(json_list)
        url = '%s/namespaces/%s/pods/%s/portforward?%s' % (host_address, namespace, name, params)
        response = requests.get(url, json_list)
        return response

    def post_pods_portforward(self, json_list):
        global host_address
        namespace = json_list.pop('namespace')
        name = json_list.pop('name')
        url = '%s/namespaces/%s/pods/%s/portforward' % (host_address, namespace, name)
        response = requests.post(url, json.dumps(json_list))
        return response

