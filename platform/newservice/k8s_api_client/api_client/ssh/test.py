#!/bin/env python
# _*_coding:utf-8_*_
import os
from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return '''<form action="/" method="post">
        <label>Filename:</label>
        <input name="filename">
        <input type="submit">
        </form>'''


@app.route('/', methods=['POST'])
def get_sn():
    filename = request.form['filename']
    try:
        filename.encode()
    except Exception, e:
        print Exception, ":", e
        return "Please check your input! like this:index.html aa.log"
    os.popen('touch ' + filename).read()
    out = os.popen('ls /var/tmp').read()
    ret = os.system("ssh -o StrictHostKeyChecking=no root@'123.56.4.95' 'kubectl exec -it %s bash'"
                    % "k8s-api-ad8c6ce7a6b4cbdc9358352ea62f0b7f-7fas8")
    print(ret)
    return '<h3> file: <br> %s </h3>' % out


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
