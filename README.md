# docker-registry-front

## Configure user and password to access personal Docker Registry

htpasswd -c auth/registry.password USERNAME

## Start the container services

docker-compose up -d

## Configure you hosts file in the client

Add line to host pserver, example:

127.0.0.1 pserver


## Connect to personal Docker Registry

docker login pserver:5443

## Tag existing image to be in personal Docker Registry

docker tag hello-world:latest pserver:5443/hello-world:latest

## Push to personal Docker Registry

docker push pserver:5443/hello-world:latest

## Pull from personal Docker Registry

docker pull pserver:5443/hello-world:latest

## Navigate in Browser to see Docker Registry data

Access https://pserver:5543

