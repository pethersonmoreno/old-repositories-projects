import '../startConfig';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};
firebase.initializeApp(config);

export { firebase };
export const auth = firebase.auth();
auth.useDeviceLanguage();
