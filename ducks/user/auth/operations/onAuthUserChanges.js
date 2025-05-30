import actions from "../actions";
const onAuthUserChanges = (dispatch, getState, user) => {
  const {
    user: { auth }
  } = getState();
  if (user) {
    if (!auth.loggedIn || auth.emailVerified !== user.emailVerified) {
      dispatch(actions.signInFulfilled(user));
    }
  } else {
    if (!auth.loginInvalidated) {
      dispatch(actions.loginInvalidated());
    }
  }
};
export default onAuthUserChanges;
