# -*- mode: ruby -*-
# vi: set ft=ruby :

ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'
Vagrant.configure("2") do |config|
  config.vm.guest = "windows"
  config.vm.box = "gusztavvargadr/iis"
  config.vm.provider "virtualbox" do |vb|
     vb.gui = false
  end
  config.vm.provision "shell", privileged: true,  inline: <<-SHELL
    # Install nodejs 6.9.3
    (new-object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v6.9.3/node-v6.9.3-win-x64.zip','C:\\tmp\\node-v6.9.3-win-x64.zip')
    Expand-Archive -Force C:\\tmp\\node-v6.9.3-win-x64.zip C:\\nodejs
    [Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine) + ";C:\\nodejs\\node-v6.9.3-win-x64", [EnvironmentVariableTarget]::Machine)
    $env:Path += ";C:\\nodejs\\node-v6.9.3-win-x64"

    # Install git 2.25
    (new-object System.Net.WebClient).DownloadFile('https://github.com/git-for-windows/git/releases/download/v2.25.0.windows.1/MinGit-2.25.0-64-bit.zip','C:\\tmp\\MinGit-2.25.0-64-bit.zip')
    Expand-Archive -Force C:\\tmp\\MinGit-2.25.0-64-bit.zip C:\\git
    [Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine) + ";C:\\git\\cmd", [EnvironmentVariableTarget]::Machine)
    $env:Path += ";C:\\git\\cmd"

    # Install windows-build-tools
    npm install -g windows-build-tools@3.1.0
  SHELL
end
