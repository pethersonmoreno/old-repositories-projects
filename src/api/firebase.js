import '../startConfig';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
};
firebase.initializeApp(config);

export { firebase };
export const auth = firebase.auth();
auth.useDeviceLanguage();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const firestore = firebase.firestore();
