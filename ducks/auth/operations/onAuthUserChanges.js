import actions from "../actions";
const onAuthUserChanges = (dispatch, user) => {
  if (user) {
    dispatch(actions.signInFulfilled(user));
  } else {
    dispatch(actions.signInRejected(null));
  }
};
export default onAuthUserChanges;
