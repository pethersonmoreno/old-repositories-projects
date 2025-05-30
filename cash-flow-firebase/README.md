# cash-flow-firebase

Cash Flow project firebase configs

## Create firebase project

firebase projects:create -n "Cash Flow" {project-id}
firebase use --add {project-id}

## Create app in firebase project and get configs

### Create app in firebase project

firebase apps:create WEB cash-flow-api

### Get configs of app by its id

firebase apps:sdkconfig WEB {app-id}

## Need config firebase settings used in cash-flow-api

firebase functions:config:set cashflowapi.firebase.apikey=firebase-apikey
firebase functions:config:set cashflowapi.firebase.projectid="firebase-projectid"

## Command to view current config

firebase functions:config:get

## Open firebase console and create Database Cloud Firestore

https://console.firebase.google.com/project/{project-id}/overview

## Deploy firebase settings with all

npm run deploy

## Deploy only functions

npm run functions:deploy
