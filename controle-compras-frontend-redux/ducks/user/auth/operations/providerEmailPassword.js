import { auth as authApi } from "../../../../api";
import actions from "../actions";
import userOperations from "../../operations";

const signUpUserWithEmailAndPassword = (email, password) => dispatch => {
  return authApi
    .signUpUserWithEmailAndPassword(email, password)
    .then(userCredential => userCredential.user)
    .then(user => {
      if (user && !user.emailVerified) {
        dispatch(userOperations.sendEmailVerification());
      }
      dispatch(actions.signIn(user));
      return user;
    });
};

const signInWithEmailAndPassword = (email, password) =>
  actions.signIn(
    authApi
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => userCredential.user)
  );

export { signUpUserWithEmailAndPassword, signInWithEmailAndPassword };
