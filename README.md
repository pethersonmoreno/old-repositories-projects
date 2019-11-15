# cash-flow-firebase

Cash Flow project firebase configs

## Need config firebase settings used in cash-flow-api

firebase functions:config:set cashflowapi.firebase.apikey="firebase-apikey"
firebase functions:config:set cashflowapi.firebase.projectid="firebase-projectid"

## Command to view current config

firebase functions:config:get

## Deploy functions

firebase deploy --only functions
