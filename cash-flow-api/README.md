# cash-flow-api

Cash Flow API for personal use

## Used repository ideas

https://github.com/danielfsousa/express-rest-es2017-boilerplate

## Cash Flow project firebase configs

### Create firebase project

firebase projects:create -n "Cash Flow" {project-id}
firebase use --add {project-id}

### Create app in firebase project and get configs

#### Create app in firebase project

firebase apps:create WEB cash-flow-api

#### Get configs of app by its id

firebase apps:sdkconfig WEB {app-id}

### Need config firebase settings used in cash-flow-api

firebase functions:config:set cashflowapi.firebase.apikey=firebase-apikey
firebase functions:config:set cashflowapi.firebase.projectid=firebase-projectid
firebase functions:config:set cashflowapi.firebase.databaseurl=firebase-databaseurl

### Generate serviceAccountKey.json

https://console.firebase.google.com/u/0/project/{project-id}/settings/serviceaccounts/adminsdk

### Command to view current config

firebase functions:config:get

### Open firebase console and create Database Cloud Firestore

https://console.firebase.google.com/project/{project-id}/overview

### Deploy firebase settings with all

npm run deploy:all

### Deploy only functions

npm run deploy:functions
