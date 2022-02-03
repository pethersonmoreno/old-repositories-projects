#!/bin/bash
scriptDir=$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")
pathGetEnvSecret=""
if [ -f "$scriptDir/get_env_secret" ]; then
    pathGetEnvSecret="$scriptDir/get_env_secret"
else
    pathGetEnvSecretFromWhich=$(which get_env_secret 2>&1)
    if [[ ! "$pathGetEnvSecretFromWhich" =~ ^which: ]]; then
        pathGetEnvSecret="$pathGetEnvSecretFromWhich"
    fi
fi
if [ "$pathGetEnvSecret" != "" ]; then
    read -sp 'Enter the password to decrypt: ' password
    echo ""
    CREDENTIALS=$($pathGetEnvSecret -- --password=${password} ${@:1})
    if [ $? -eq 0 ]
    then
        eval "$CREDENTIALS"
        echo "Credentials added to environment variables"
    else
        echo "$CREDENTIALS"
    fi
else
    echo "Not found path to get_env_secret"
fi