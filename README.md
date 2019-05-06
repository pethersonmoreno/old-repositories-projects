# docker-registry

## Generate the self-signed SSL certificate

Reference: https://www.ctl.io/developers/blog/post/how-to-secure-your-private-docker-registry/

mkdir -p nginx/certs
docker run --rm -e COMMON_NAME=66.555.98.212 -e KEY_NAME=pserver -v "$PWD/nginx/certs:/certs" centurylink/openssl

## Start the container services

docker-compose up -d

## Connect to personal Docker Registry

docker login pserver:5443

## Tag existing image to be in personal Docker Registry

docker tag hello-world:latest pserver:5443/hello-world:latest

## Push to personal Docker Registry

docker push pserver:5443/hello-world:latest

## Pull from personal Docker Registry

docker pull pserver:5443/hello-world:latest