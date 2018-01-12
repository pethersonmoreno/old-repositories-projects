Help to download from Mega.

https://github.com/ZonD80/mega-downloader


Achei esse outro, mas usa .Net:

http://megadownloaderapp.blogspot.com.br/2013/02/download-links-english.html?m=1

Nesse link tem a opção de baixar o fonte para vs2017 também


Tem esse outro link em que explica como usar uma outra ferramenta:


https://ubuntuforums.org/showthread.php?t=2311189


https://github.com/megous/megatools


megaToolsVersion="1.9.96" megaTools="/home/$USER/megatools-$megaToolsVersion" if [ ! -d $megaTools ]; then 	sudo apt-get -y install build-essential libglib2.0-dev libssl-dev libcurl4-openssl-dev libgirepository1.0-dev -y --force-yes --quiet 	cd /home/$USER 	wget "https://megatools.megous.com/builds/megatools-$megaToolsVersion.tar.gz" 	tar -xvf "./megatools-$megaToolsVersion.tar.gz" 	cd $megaTools 	./configure 	make 	cd .. 	rm -rf "./megatools-$megaToolsVersion.tar.gz" fi
