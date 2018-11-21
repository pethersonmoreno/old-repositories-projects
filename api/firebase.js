import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
var config = {
  apiKey: process.env.APP_FIREBASE_API_KEY,
  authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET
};
const defaultFirebase = firebase.initializeApp(config);
export const database = defaultFirebase.database();
export const auth = firebase.auth();
