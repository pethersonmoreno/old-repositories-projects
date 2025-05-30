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

const signByRedirectResult = () => async dispatch => {
  try {
    const userLogged = await authApi
      .getRedirectResult()
      .then(userCredential => userCredential.user);
    if (userLogged) {
      dispatch(actions.signInFulfilled(userLogged));
    }
  } catch (error) {
    dispatch(actions.signInRejected(error));
  }
};
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
