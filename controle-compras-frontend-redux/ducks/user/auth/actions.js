import { FULFILLED, REJECTED } from "redux-promise-middleware";
import types from "./types";

const signUpUserWithEmailAndPassword = payload => ({
  type: types.SIGN_UP_USER_WITH_EMAIL_PASSWORD,
  payload
});
const signInWithEmailAndPassword = payload => ({
  type: types.SIGN_IN_USER_WITH_EMAIL_PASSWORD,
  payload
});
const signIn = payload => ({
  type: types.SIGN_IN,
  payload
});
const signInFulfilled = payload => ({
  type: types.SIGN_IN + "_" + FULFILLED,
  payload
});
const signInRejected = payload => ({
  type: types.SIGN_IN + "_" + REJECTED,
  payload
});
const signInWithRedirect = payload => ({
  type: types.SIGN_IN_WITH_REDIRECT,
  payload
});
const signOut = payload => ({
  type: types.SIGN_OUT,
  payload
});
const loginInvalidated = () => ({
  type: types.LOGIN_INVALIDATED
});
export default {
  signUpUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signIn,
  signInFulfilled,
  signInRejected,
  signInWithRedirect,
  signOut,
  loginInvalidated
};
