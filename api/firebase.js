import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
var config = {
  apiKey: "AIzaSyCWHXnAGCLct8vexeg6guAPMoE5scFfc_0",
  authDomain: "nao-esqueca.firebaseapp.com",
  databaseURL: "https://nao-esqueca.firebaseio.com",
  storageBucket: "nao-esqueca.appspot.com"
};
const defaultFirebase = firebase.initializeApp(config);
export const database = defaultFirebase.database();
export const auth = firebase.auth();
