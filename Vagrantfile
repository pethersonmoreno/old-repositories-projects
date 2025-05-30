# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "gusztavvargadr/iis"

  config.vm.define "webapp-windows-dotnet-by-vagrant-iis"
  config.vm.provider "virtualbox" do |vb|
    vb.name = "webapp-windows"
    vb.gui = false
  
    vb.memory = "4096" # Memory on VM

    vb.cpus = "2"
    
    vb.customize ["modifyvm", :id, "--vram", "128"]

    # config.vm.network "public_network", auto_config: true
  end
  
  config.vm.network "private_network", ip: "192.168.60.10"

  config.vm.network "forwarded_port", guest: 80, host: 8080, protocol: "tcp"

  config.vm.synced_folder "./shared/", "C:\\shared", id: "shared", automount: true

  config.vm.provision "file", source: "src", destination: "C:\\webapp"

  config.vm.provision "shell", privileged: "true", inline: <<-POWERSHELL
    echo "Configuring webapp on IIS"
    C:\\Windows\\system32\\inetsrv\\appcmd.exe delete site "Default Web Site"
    C:\\Windows\\system32\\inetsrv\\appcmd.exe add site /name:webapp /bindings:http://*:80 /physicalpath:"C:\\webapp"

    net share webapp=C:\\webapp /GRANT:Everyone,FULL
  POWERSHELL
end
