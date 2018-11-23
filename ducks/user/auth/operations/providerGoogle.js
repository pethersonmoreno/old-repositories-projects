import { auth as authApi } from "../../../../api";
import actions from "../actions";

const signInGoogleWithPopup = () => {
  return actions.signIn(
    authApi.signInGoogleWithPopup().then(userCredential => userCredential.user)
  );
};
const signInGoogleWithRedirect = () =>
  actions.signIn(authApi.signInGoogleWithRedirect());

export { signInGoogleWithPopup, signInGoogleWithRedirect };
