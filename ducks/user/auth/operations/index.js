import { auth as authApi } from "../../../../api";
import actions from "../actions";
import {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "./providerEmailPassword";
import {
  signInGoogleWithPopup,
  signInGoogleWithRedirect
} from "./providerGoogle";
import { startListenAuthChanges, stopListenAuthChanges } from "./authState";
import { startListenUserReloads, stopListenUserReloads } from "./userReloads";

const signByRedirectResult = () =>
  actions.signIn(
    authApi.getRedirectResult().then(userCredential => userCredential.user)
  );
const signOut = () => actions.signOut(authApi.signOut());

export default {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInGoogleWithPopup,
  signInGoogleWithRedirect,
  signByRedirectResult,
  signOut,
  startListenAuthChanges,
  stopListenAuthChanges,
  startListenUserReloads,
  stopListenUserReloads
};
