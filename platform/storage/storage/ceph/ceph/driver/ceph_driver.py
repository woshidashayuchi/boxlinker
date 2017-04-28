#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: YanHua <it-yanh@all-reach.com>

import os

from common.logs import logging as log
from common.shellexec import execute
from common.code import request_result
from common.ssh_key_conf import ssh_key_conf


class CephDriver(object):

    def __init__(self):

        self.ceph_conf_path = '/tmp/ceph/conf'
        self.ceph_conf_file = '/etc/ceph/ceph.conf'

    def host_ping_check(self, host_ip):

        cmd = "ping -c 3 -w 3 '%s' | grep -w 'ttl' | wc -l" \
              % (host_ip)

        return execute(cmd, shell=True, run_as_root=True)[0][0].strip('\n')

    def host_ssh_conf(self, host_ip, password, user_name='root'):

        return ssh_key_conf(host_ip, user_name, password)

    def host_ssh_del(self, host_ip, control_host_name):

        cmd = ("ssh -o StrictHostKeyChecking=no root@'%s' "
               "'sed -i '/%s/d' /root/.ssh/authorized_keys'" \
              % (host_ip, control_host_name))

        return execute(cmd, shell=True, run_as_root=True)[1]

    def remote_host_name(self, host_ip):

        cmd = "ssh -o StrictHostKeyChecking=no root@'%s' 'hostname'" \
              % (host_ip)

        return execute(cmd, shell=True, run_as_root=True)[0][0].strip('\n')

    def local_host_name(self):

        cmd = "hostname"

        return execute(cmd, shell=True, run_as_root=True)[0][0].strip('\n')

    def storage_ip(self, host_ip, storage_nic):

        cmd = ("ssh -o StrictHostKeyChecking=no root@'%s'"
               " 'ip addr | grep %s' | grep -w 'inet' "
               "| awk '{print $2}' | awk -F/ '{print $1}'"
               % (host_ip, storage_nic))

        return execute(cmd, shell=True, run_as_root=True)[0][0].strip('\n')

    def nic_mac(self, host_ip, nic_name):

        result = execute("ssh -o StrictHostKeyChecking=no root@"+host_ip+" 'ethx='"+nic_name+"';ip addr show $ethx' | grep 'ether' | awk '{print $2}'", shell=True, run_as_root=True)[0][0].strip('\n')

        return result

    def ceph_conf_init(self, cluster_uuid, cluster_auth,
                       service_auth, client_auth, ceph_pgnum,
                       ceph_pgpnum, public_network, cluster_network,
                       osd_full_ratio, osd_nearfull_ratio, journal_size):

        data = ["[global]\n",
                "\n",
                "auth cluster required = %s\n" % (cluster_auth),
                "auth service required = %s\n" % (service_auth),
                "auth client required = %s\n" % (client_auth),
                "\n",
                "fsid = %s\n" % (cluster_uuid),
                "\n",
                "log file = /var/log/ceph/$name.log\n",
                "pid file = /var/run/ceph/$name.pid\n",
                "\n",
                "osd pool default size = 3\n",
                "osd pool default min size = 2\n",
                "osd pool default pg num = %s\n" % (ceph_pgnum),
                "osd pool default pgp num = %s\n" % (ceph_pgpnum),
                "\n",
                "#    public network = %s\n" % (public_network),
                "#    cluster network = %s\n" % (cluster_network),
                "\n",
                "mon osd full ratio = %s\n" % (osd_full_ratio),
                "mon osd nearfull ratio = %s\n" % (osd_nearfull_ratio),
                "\n",
                "[mon]\n",
                "mon data = /ceph/mondata/mon$host\n",
                "\n",
                "#[mon.1]\n",
                "\n",
                "#[mon.2]\n",
                "\n",
                "#[mon.3]\n",
                "\n",
                "#[mon.4]\n",
                "\n",
                "#[mon.5]\n",
                "\n",
                "#[mds.1]\n",
                "\n",
                "#[mds.2]\n",
                "\n",
                "#[mds.3]\n"
                "\n",
                "#[mds.4]\n",
                "\n",
                "#[mds.5]\n",
                "\n",
                "[osd]\n",
                "osd data = /data/osd$id\n",
                "osd journal = /ceph/journal/osd$id/journal\n",
                "osd journal size = %s\n" % (journal_size),
                "osd mkfs type = xfs\n",
                "osd mkfs options xfs = -f\n",
                "osd mount options xfs = rw,noatime\n",
                "\n"]

        cmd = "mkdir -p %s" % (self.ceph_conf_path)
        execute(cmd, shell=True, run_as_root=True)

        self.ceph_conf = "%s/%s.conf" % (self.ceph_conf_path, cluster_uuid)
        with open(self.ceph_conf, 'w') as f:
            f.writelines(data)

    def ceph_conf_check(self, cluster_uuid):

        self.ceph_conf = "%s/%s.conf" % (self.ceph_conf_path, cluster_uuid)
        if os.path.isfile(self.ceph_conf):
            return True
        else:
            return False

    def mon_conf_update(self, cluster_uuid, cephmon_id,
                        mon_host_name, mon_storage_ip):

        self.ceph_conf = "%s/%s.conf" % (self.ceph_conf_path, cluster_uuid)

        mon_id = 'mon.%s' % (cephmon_id)
        mds_id = 'mds.%s' % (cephmon_id)

        cmd_01 = "sed -i '/%s/d' %s" % (mon_host_name, self.ceph_conf)
        cmd_02 = "sed -i '/%s/d' %s" % (mon_storage_ip, self.ceph_conf)
        execute(cmd_01, shell=True, run_as_root=True)
        execute(cmd_02, shell=True, run_as_root=True)

        cmd = "cat %s | grep -n '%s' | awk -F: '{print $1}'" \
              % (self.ceph_conf, mon_id)
        mon_line = execute(cmd, shell=True, run_as_root=True)[0][0].strip('\n')
        edit_line = int(mon_line) + 1

        cmd_01 = "sed -i '%si\    mon addr = %s:5000' %s" \
                 % (edit_line, mon_storage_ip, self.ceph_conf)
        cmd_02 = "sed -i '%si\    host = %s' %s" \
                 % (edit_line, mon_host_name, self.ceph_conf)
        cmd_03 = "sed -i '%si\[mon.%s]' %s" \
                 % (edit_line, mon_host_name, self.ceph_conf)

        execute(cmd_01, shell=True, run_as_root=True)
        execute(cmd_02, shell=True, run_as_root=True)
        execute(cmd_03, shell=True, run_as_root=True)

        cmd = "cat %s | grep -n '%s' | awk -F: '{print $1}'" \
              % (self.ceph_conf, mds_id)
        mds_line = execute(cmd, shell=True, run_as_root=True)[0][0].strip('\n')
        edit_line = int(mds_line) + 1

        cmd_01 = "sed -i '%si\    host = %s' %s" \
                 % (edit_line, mon_host_name, self.ceph_conf)
        cmd_02 = "sed -i '%si\[mds.%s]' %s" \
                 % (edit_line, mon_host_name, self.ceph_conf)

        execute(cmd_01, shell=True, run_as_root=True)
        execute(cmd_02, shell=True, run_as_root=True)

    def mon_conf_init(self, mon_id, mon_host_name, mon_storage_ip, ceph_fsid):

        result = execute("bash "+self.drivers_path+"/mon_conf_init.sh "+mon_id+" "+mon_storage_ip+" "+mon_host_name+" "+ceph_fsid+"", shell=True, run_as_root=True)[1]

        return str(result)

    def mon_count(self):

        result = execute("cat /etc/ceph/ceph.conf | grep 'mon\.' | grep -v '^#' | wc -l", shell=True, run_as_root=True)[0][0].strip('\n')

        return str(result)

    def ceph_fsid(self):

        result = execute("cat /etc/ceph/ceph.conf | grep fsid | awk '{print $3}'", shell=True, run_as_root=True)[0][0].strip('\n')

        return str(result)

    def conf_dist(self, cluster_uuid, host_ip):

        self.ceph_conf = "%s/%s.conf" % (self.ceph_conf_path, cluster_uuid)

        cmd = "scp %s root@'%s':%s &> /dev/null" \
              % (self.ceph_conf, host_ip, self.ceph_conf_file)

        return execute(cmd, shell=True, run_as_root=True)[1]

    def monmap_init(self, mon01_hostname, mon01_storage_ip,
                    mon02_hostname, mon02_storage_ip,
                    mon01_hostip, mon02_hostip, cluster_uuid):

        execute("rm -rf /tmp/monmap", shell=True, run_as_root=True)

        cmd = ("monmaptool --create --add %s %s:5000"
               " --add %s %s:5000 --fsid %s /tmp/monmap &> /dev/null"
               % (mon01_hostname, mon01_storage_ip,
                  mon02_hostname, mon02_storage_ip,
                  cluster_uuid))
        mon_map_create = execute(cmd, shell=True, run_as_root=True)[1]
        if int(mon_map_create) != 0:
            log.error('Ceph monmap init failure, mon01_hostname=%s,'
                      ' mon01_storage_ip=%s, mon02_hostname=%s,'
                      ' mon02_storage_ip=%s'
                      % (mon01_hostname, mon01_storage_ip,
                         mon02_hostname, mon02_storage_ip))
            return 1

        cmd_01 = "scp /tmp/monmap root@'%s':/tmp/ &> /dev/null" \
                 % (mon01_hostip)
        cmd_02 = "scp /tmp/monmap root@'%s':/tmp/ &> /dev/null" \
                 % (mon02_hostip)

        sync_monmap01 = execute(cmd_01, shell=True, run_as_root=True)[1]
        sync_monmap02 = execute(cmd_02, shell=True, run_as_root=True)[1]
        if int(sync_monmap01) == 0 and int(sync_monmap02) == 0:
            return 0
        else:
            log.error('Ceph monmap sync failure,'
                      ' mon01_hostip=%s, mon02_hostip=%s'
                      % (mon01_hostip, mon02_hostip))
            return 1

    def mon_host_init(self, mon_host_name, mon_host_ip):

        cmd = ("ssh -o StrictHostKeyChecking=no root@'%s' "
               "'mkdir -p /ceph/mondata; "
               "ceph-mon --mkfs -i %s --monmap /tmp/monmap; "
               "systemctl stop firewalld.service; "
               "systemctl disable firewalld.service; "
               "chkconfig ceph on; service ceph start'"
               % (mon_host_ip, mon_host_name))

        return execute(cmd, shell=True, run_as_root=True)[1]

    def crush_ssd_add(self):

        cmd = "ceph osd crush add-bucket ssd root"

        return execute(cmd, shell=True, run_as_root=True)[1]

    def mon_host_add(self, mon_host_name, mon_host_ip, storage_ip):

        cmd = ("ssh -o StrictHostKeyChecking=no root@'%s' "
               "'mkdir -p /ceph/mondata; "
               "mkdir -p /tmp/ceph; "
               "ceph mon getmap -o /tmp/ceph/monmap; "
               "ceph-mon --mkfs -i %s --monmap /tmp/ceph/monmap; "
               "ceph mon add %s %s:5000; "
               "systemctl stop firewalld.service; "
               "systemctl disable firewalld.service; "
               "chkconfig ceph on; service ceph start'"
               % (mon_host_ip, mon_host_name,
                  mon_host_name, storage_ip))

        return execute(cmd, shell=True, run_as_root=True)[1]

    def pool_check(self, pool_type):

        result = execute("ceph df | grep 'vmdisk_"+pool_type+"' | wc -l", shell=True, run_as_root=True)[0][0].strip('\n')

        return str(result)

    def pool_status_check(self):

        result = execute("ceph -s | grep 'HEALTH_OK' | wc -l", shell=True, run_as_root=True)[0][0].strip('\n')

        return str(result)

    def pool_disk_check(self):

        result = execute("ceph df | grep 'vmdisk' | wc -l", shell=True, run_as_root=True)[0][0].strip('\n')

        return str(result)

    def pool_ssd_create(self):

        result01 = execute("ceph osd crush rule create-simple ssd ssd host", shell=True, run_as_root=True)[1]
        ruleset = execute("ceph osd crush rule dump ssd | grep 'ruleset' | awk '{print $2}' | awk -F, '{print $1}'", shell=True, run_as_root=True)[0][0].strip('\n')
        result02 = execute("rados mkpool vmdisk_ssd 6 "+ruleset+"", shell=True, run_as_root=True)[1]
        if (result01 == '0') and (result02 == '0'):
            return True
        else:
            return False

    def pool_hdd_create(self):

        result = execute("rados mkpool vmdisk_hdd", shell=True, run_as_root=True)[1]

        return str(result)

    def pool_info_get(self):

        result = execute("ceph df |awk 'NR==3 {print $1\" \"$2\" \"$3\" \"$4}'", shell=True, run_as_root=True)[0][0].strip('\n')

        return result

    def pool_used(self):

        result = execute("ceph df | awk 'NR==3 {print $4}'", shell=True, run_as_root=True)[0][0].strip('\n')

        return float(result)

    def osd_add(self, host_ip, jour_disk, data_disk, disk_type, osd_id, weight, ntp_server01, ntp_server02 = None):

        if ntp_server02 is None:
            result = execute("bash "+self.drivers_path+"/osd_add.sh "+host_ip+" "+jour_disk+" "+data_disk+" "+disk_type+" "+osd_id+" "+weight+" "+ntp_server01+"", shell=True, run_as_root=True)[1]
        else:
            result = execute("bash "+self.drivers_path+"/osd_add.sh "+host_ip+" "+jour_disk+" "+data_disk+" "+disk_type+" "+osd_id+" "+weight+" "+ntp_server01+" "+ntp_server02+"", shell=True, run_as_root=True)[1]

        return str(result)

    def osd_reweight(self, osd_id, weight):

        osd_id = 'osd.' + str(osd_id)
        result = execute("ceph osd crush reweight "+osd_id+" "+weight+"", shell=True, run_as_root=True)[1]

        return str(result)

    def osd_in(self, osd_id):

        result = execute("ceph osd in "+osd_id+"", shell=True, run_as_root=True)[1]

        return str(result)

    def osd_out(self, osd_id):

        result = execute("ceph osd out "+osd_id+"", shell=True, run_as_root=True)[1]

        return str(result)

    def osd_stop(self, host_ip, osd_id):

        result = execute("ssh -o StrictHostKeyChecking=no root@"+host_ip+" 'v_osd_id='"+osd_id+"';/etc/init.d/ceph stop osd.$v_osd_id' &> /dev/null", shell=True, run_as_root=True)[1]

        return str(result)

    def osd_crush_out(self, osd_id):

        result01 = execute("ceph osd crush remove osd."+osd_id+"", shell=True, run_as_root=True)[1]
        result02 = execute("ceph auth del osd."+osd_id+"", shell=True, run_as_root=True)[1]
        result03 = execute("ceph osd rm "+osd_id+"", shell=True, run_as_root=True)[1]
        log.debug('result01_type = %s' %(type(result01)))

        if (result01 == 0) and (result02 == 0) and (result03 == 0):
            return True
        else:
            return False

    def osd_conf_add(self, host_name, data_disk, osd_id):

        execute("echo '[osd."+osd_id+"]' >> /etc/ceph/ceph.conf", shell=True, run_as_root=True)[1]
        execute("echo '    host = "+host_name+"' >> /etc/ceph/ceph.conf", shell=True, run_as_root=True)[1]
        execute("echo '    devs = /dev/"+data_disk+"' >> /etc/ceph/ceph.conf", shell=True, run_as_root=True)[1]

#        execute("cp -a /etc/ceph/ceph.conf /kvmcenter/conf/", shell=True, run_as_root=True)[1]

        return

    def osd_conf_del(self, osd_id):

        osd_line = execute("cat /etc/ceph/ceph.conf | grep -n 'osd."+osd_id+"' | awk -F: '{print $1}'", shell=True, run_as_root=True)[0][0].strip('\n')
        if not osd_line:
            return

        host_line = int(osd_line) + 1
        devs_line = int(osd_line) + 2

        host_line = str(host_line)
        devs_line = str(devs_line)

        execute("sed -i '"+devs_line+"d' /etc/ceph/ceph.conf", shell=True, run_as_root=True)[1]
        execute("sed -i '"+host_line+"d' /etc/ceph/ceph.conf", shell=True, run_as_root=True)[1]
        execute("sed -i '"+osd_line+"d' /etc/ceph/ceph.conf", shell=True, run_as_root=True)[1]

#        execute("cp -a /etc/ceph/ceph.conf /kvmcenter/conf/", shell=True, run_as_root=True)[1]

        return

    def osd_host_del(self, host_ip, osd_id):

        result = execute("ssh -o StrictHostKeyChecking=no root@"+host_ip+" 'v_osd_id='"+osd_id+"'; sed -i \"/osd$v_osd_id/d\" /etc/fstab; umount /ceph/journal/osd$v_osd_id; umount /data/osd$v_osd_id; rm -rf /ceph/journal/osd$v_osd_id; rm -rf /data/osd$v_osd_id'", shell=True, run_as_root=True)[1]

        return str(result)

    def disk_use_check(self, host_ip, disk_name):

        result = execute("ssh -o StrictHostKeyChecking=no root@"+host_ip+" 'd_disk='"+disk_name+"'; df -h | grep \"$d_disk\" | wc -l'", shell=True, run_as_root=True)[0][0].strip('\n')

        return str(result)

    def osd_id_create(self):

        result = execute("ceph osd create", shell=True, run_as_root=True)[0][0].strip('\n')

        return str(result)

    def disk_create(self, pool_name, disk_name, disk_size):

        cmd = "rbd create %s/%s --image-format 2 --size %s" \
              % (pool_name, disk_name, disk_size)

        result = execute(cmd, shell=True, run_as_root=True)[1]
        if str(result) != '0':
            log.error('Ceph disk(%s) create failure' % (disk_name))
            return request_result(511)
        else:
            return request_result(0)

    def disk_delete(self, pool_name, disk_name):

        cmd = "rbd rm %s/%s" % (pool_name, disk_name)

        result = execute(cmd, shell=True, run_as_root=True)[1]
        if str(result) != '0':
            log.error('Ceph disk(%s) delete failure' % (disk_name))
            return request_result(512)
        else:
            return request_result(0)

    def disk_resize(self, pool_name, disk_name, disk_size):

        cmd = "rbd resize --size %s %s/%s" \
              % (disk_size, pool_name, disk_name)

        result = execute(cmd, shell=True, run_as_root=True)[1]
        if str(result) != '0':
            log.error('Ceph disk(%s) resize failure' % (disk_name))
            return request_result(513)
        else:
            return request_result(0)

    def disk_growfs(self, image_name):

        cmd = "df -h | grep -w '%s' | awk '{print $1}'" % (image_name)
        dev_name = execute(cmd, shell=True, run_as_root=True)[0][0].strip('\n')
        if dev_name:
            cmd = "xfs_growfs %s" % (dev_name)
            result = execute(cmd, shell=True, run_as_root=True)[1]
            if str(result) != '0':
                log.error('Ceph disk(%s) growfs failure' % (disk_name))
                return request_result(513)
            else:
                return request_result(0)

        return
