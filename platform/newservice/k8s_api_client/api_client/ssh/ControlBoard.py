#! /usr/bin python
# -*- coding:utf8 -*-
# Date:2017/2/4
# Author:wang-xf

import os
import commands

try:
    os.system("ssh -o StrictHostKeyChecking=no root@'123.56.4.95' 'kubectl exec -it %s bash'"
              % "k8s-api-ad8c6ce7a6b4cbdc9358352ea62f0b7f-7fas8")
except Exception, e:
    os.system("ssh -o StrictHostKeyChecking=no root@'123.56.4.95' 'kubectl exec -it %s sh'"
              % "k8s-api-ad8c6ce7a6b4cbdc9358352ea62f0b7f-7fas8")

'''
output = os.popen("ssh -o StrictHostKeyChecking=no root@'123.56.4.95' 'kubectl exec -it %s bash'"
                 % "k8s-api-ad8c6ce7a6b4cbdc9358352ea62f0b7f-7fas8")
print output.read()

status, output = commands.getstatusoutput("ssh -o StrictHostKeyChecking=no root@'123.56.4.95' 'kubectl exec -it %s bash'"
                                          % "k8s-api-ad8c6ce7a6b4cbdc9358352ea62f0b7f-7fas8")
print status, output
'''