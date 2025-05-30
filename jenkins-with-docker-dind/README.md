# jenkins-with-docker-dind


## To generate a update of plugins.txt

Open localhost:8081/script to run a script in your Jenkins and run this script:

```groovy
Jenkins.instance.pluginManager.plugins.each{ plugin ->   println ("${plugin.getShortName()}:${plugin.getVersion()}") }
```