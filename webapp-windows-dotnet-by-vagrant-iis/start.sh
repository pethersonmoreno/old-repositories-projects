#!/usr/bin/bash
vagrant up
mkdir -p ~/WIN_SHARE_VAGRANT
sudo mount -t cifs -o username=vagrant,password=vagrant,uid=$(id -u),gid=$(id -g) //192.168.60.10/webapp ~/WIN_SHARE_VAGRANT